// Script_de_Build: gera output/ebook.html e output/ebook.pdf.
// Códigos de saída: 0 sucesso; 1 capítulo ausente/erro de montagem;
// 2 dependência ausente; 3 falha na geração do PDF.

import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { capitulosAusentes, ordenarCapitulos } from './lib/ordenacao.mjs';
import { montarDocumento } from './lib/montagem-html.mjs';

const RAIZ_PADRAO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const SAIDA_OK = 0;
export const SAIDA_CAPITULO_AUSENTE = 1;
export const SAIDA_DEPENDENCIA = 2;
export const SAIDA_PDF = 3;

const TIPOS_MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

/** Ocorre quando uma dependência obrigatória não está disponível. */
export class ErroDependencia extends Error {
  constructor(nome, comandoInstalacao) {
    super(`Dependência ausente: ${nome}. Instale com: ${comandoInstalacao}`);
    this.name = 'ErroDependencia';
    this.dependencia = nome;
    this.comandoInstalacao = comandoInstalacao;
  }
}

/** Resolvedor padrão: tenta importar o módulo. */
async function resolvedorPadrao(nome) {
  await import(nome);
  return true;
}

/**
 * Verifica Node >= 18, markdown-it e puppeteer.
 * `resolvedor(nome)` deve retornar verdadeiro (ou resolver) se o módulo existe;
 * falso ou exceção indica ausência. `versaoNode` pode ser injetada em testes.
 * @throws {ErroDependencia}
 */
export async function verificarDependencias(
  resolvedor = resolvedorPadrao,
  versaoNode = process.versions.node,
) {
  const maior = Number.parseInt(String(versaoNode).split('.')[0], 10);
  if (!(maior >= 18)) {
    throw new ErroDependencia(
      `Node.js >= 18 (versão atual: ${versaoNode})`,
      'instale o Node.js 18 ou superior em https://nodejs.org',
    );
  }
  for (const nome of ['markdown-it', 'puppeteer']) {
    let ok = false;
    try {
      ok = Boolean(await resolvedor(nome));
    } catch {
      ok = false;
    }
    if (!ok) throw new ErroDependencia(nome, 'npm install');
  }
}

/** Lê e valida ebook/manifesto.json; retorna a lista de arquivos esperados. */
export async function lerManifesto(raiz) {
  const caminho = path.join(raiz, 'ebook', 'manifesto.json');
  let dados;
  try {
    dados = JSON.parse(await readFile(caminho, 'utf8'));
  } catch (e) {
    throw new Error(`Não foi possível ler ebook/manifesto.json: ${e.message}`);
  }
  const lista = Array.isArray(dados) ? dados : dados?.arquivos;
  if (!Array.isArray(lista) || !lista.every((n) => typeof n === 'string')) {
    throw new Error('ebook/manifesto.json deve conter a lista "arquivos" com nomes de arquivo.');
  }
  return lista;
}

/**
 * Troca caminhos de imagem relativos a assets/ por data URI (base64),
 * para que o PDF exiba as imagens. Se o arquivo não existir, usa file://.
 */
export function ajustarImagens(html, raiz) {
  return html.replace(
    /(<img\b[^>]*?\bsrc=")((?:\.\.\/|\.\/)?assets\/[^"]+)(")/gi,
    (_m, antes, src, depois) => {
      const relativo = decodeURI(src.replace(/^(\.\.\/|\.\/)/, ''));
      const abs = path.resolve(raiz, relativo);
      if (!existsSync(abs)) return `${antes}${pathToFileURL(abs).href}${depois}`;
      const mime = TIPOS_MIME[path.extname(abs).toLowerCase()] ?? 'application/octet-stream';
      return `${antes}__DATA__${abs}__${mime}__FIM__${depois}`;
    },
  );
}

async function embutirImagens(html, raiz) {
  const ajustado = ajustarImagens(html, raiz);
  const padrao = /__DATA__(.+?)__([\w.+-]+\/[\w.+-]+)__FIM__/g;
  let resultado = '';
  let ultimo = 0;
  for (const m of ajustado.matchAll(padrao)) {
    const base64 = (await readFile(m[1])).toString('base64');
    resultado += ajustado.slice(ultimo, m.index) + `data:${m[2]};base64,${base64}`;
    ultimo = m.index + m[0].length;
  }
  return resultado + ajustado.slice(ultimo);
}

/** Gera o PDF a partir do HTML consolidado usando Chromium headless. */
export async function gerarPdf(caminhoHtml, caminhoPdf) {
  const puppeteer = (await import('puppeteer')).default;
  const navegador = await puppeteer.launch({ headless: true });
  try {
    const pagina = await navegador.newPage();
    await pagina.goto(pathToFileURL(caminhoHtml).href, { waitUntil: 'load' });
    await pagina.pdf({ path: caminhoPdf, format: 'A4', printBackground: true });
  } finally {
    await navegador.close();
  }
}

/**
 * Executa o build. Retorna o código de saída (não encerra o processo).
 * `opcoes` permite injetar dependências em testes.
 */
export async function main(raiz = RAIZ_PADRAO, opcoes = {}) {
  const {
    resolvedor = resolvedorPadrao,
    pdf = gerarPdf,
    log = (m) => console.log(m),
    erro = (m) => console.error(m),
  } = opcoes;

  try {
    await verificarDependencias(resolvedor);
  } catch (e) {
    if (e instanceof ErroDependencia) {
      erro(e.message);
      return SAIDA_DEPENDENCIA;
    }
    throw e;
  }

  let esperados;
  try {
    esperados = await lerManifesto(raiz);
  } catch (e) {
    erro(e.message);
    return SAIDA_CAPITULO_AUSENTE;
  }

  const existentes = esperados.filter((n) => existsSync(path.join(raiz, 'ebook', n)));
  const ausentes = capitulosAusentes(esperados, existentes);
  if (ausentes.length > 0) {
    erro('Capítulo(s) ausente(s) em ebook/:');
    for (const n of ausentes) erro(`  - ${n}`);
    return SAIDA_CAPITULO_AUSENTE;
  }

  let html;
  try {
    const { default: MarkdownIt } = await import('markdown-it');
    // html: true é necessário para a capa (<div class="capa">, <p class="subtitulo">).
    // O conteúdo de ebook/ é do próprio repositório e, portanto, confiável.
    const md = new MarkdownIt({ html: true, linkify: false });
    const partes = [];
    for (const nome of ordenarCapitulos(esperados)) {
      const texto = await readFile(path.join(raiz, 'ebook', nome), 'utf8');
      partes.push(await embutirImagens(md.render(texto), raiz));
    }
    const css = await readFile(path.join(raiz, 'ebook', 'estilos', 'ebook.css'), 'utf8');
    html = montarDocumento(partes, css);
  } catch (e) {
    erro(`Erro ao montar o e-book: ${e.message}`);
    return SAIDA_CAPITULO_AUSENTE;
  }

  const saida = path.join(raiz, 'output');
  const caminhoHtml = path.join(saida, 'ebook.html');
  const caminhoPdf = path.join(saida, 'ebook.pdf');
  await mkdir(saida, { recursive: true });
  await writeFile(caminhoHtml, html, 'utf8');
  log(`HTML gerado: ${caminhoHtml}`);

  try {
    await pdf(caminhoHtml, caminhoPdf);
  } catch (e) {
    erro(`Falha ao gerar o PDF: ${e.message}`);
    erro('O HTML consolidado foi mantido em output/ebook.html.');
    erro('Se o Chromium não estiver instalado, execute: npx puppeteer browsers install chrome');
    return SAIDA_PDF;
  }
  log(`PDF gerado: ${caminhoPdf}`);
  return SAIDA_OK;
}

const executadoDiretamente =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (executadoDiretamente) {
  main().then(
    (codigo) => {
      process.exitCode = codigo;
    },
    (e) => {
      console.error(`Erro inesperado: ${e.message}`);
      process.exitCode = 1;
    },
  );
}
