// Validador_de_Conteudo: verifica a consistência do repositório.
// Uso: node scripts/validar.mjs [raiz]
// Saída: cada problema como "arquivo:linha: mensagem". Código 0 sem problemas, 1 com problemas.
// Avisos (ex.: arquivo ilegível) são impressos, mas não alteram o código de saída.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { varrerTermos } from './lib/varredura.mjs';
import { nomeValido } from './lib/ordenacao.mjs';
import { parsearPrompt, secoesFaltantes } from './lib/parser-prompt.mjs';
import {
  parsearPromptsImagem,
  camposFaltantes,
  contemNomeProtegido,
  CAMPOS,
} from './lib/parser-prompt-imagem.mjs';
import {
  extrairReferenciasImagem,
  extrairLinksRelativos,
  verificarCorrespondencia,
  verificarImagens,
  verificarAltTexto,
  verificarBlocosCss,
  verificarLinksRelativos,
} from './lib/referencias.mjs';
import { detectarSegredos } from './lib/segredos.mjs';

const ARQUIVO_TERMOS = 'scripts/config/termos-proibidos.json';
const ARQUIVO_NOMES = 'scripts/config/nomes-protegidos.json';
const EXCLUIR_EM_QUALQUER_NIVEL = new Set(['.git', 'node_modules']);
const EXCLUIR_NA_RAIZ = new Set(['.kiro', 'output', 'tests']);
const EXCLUIR_ARQUIVOS = new Set([ARQUIVO_TERMOS, 'package-lock.json']);

// Capítulos regulares: NN entre 01 e 97. Partes fixas (00, 98, 99) não exigem prompt.
const PADRAO_CAPITULO = /^(0[1-9]|[1-8]\d|9[0-7])-.+\.md$/;

const rotuloCampo = Object.fromEntries(CAMPOS.map((c) => [c.chave, c.rotulo]));

function problema(arquivo, linha, mensagem, severidade = 'erro') {
  return { arquivo, linha, mensagem, severidade };
}

function caminhoRel(raiz, caminho) {
  return relative(raiz, caminho).split('\\').join('/');
}

/** Lista nomes de um diretório; null se não existir ou não for diretório. */
function listarDiretorio(dir) {
  try {
    if (!statSync(dir).isDirectory()) return null;
    return readdirSync(dir, { withFileTypes: true });
  } catch {
    return null;
  }
}

/** Percorre a árvore devolvendo caminhos relativos (com "/") dos arquivos candidatos. */
function listarArquivos(raiz) {
  const resultado = [];
  const visitar = (dir) => {
    for (const entrada of listarDiretorio(dir) ?? []) {
      const completo = join(dir, entrada.name);
      const rel = caminhoRel(raiz, completo);
      if (EXCLUIR_EM_QUALQUER_NIVEL.has(entrada.name)) continue;
      if (!rel.includes('/') && EXCLUIR_NA_RAIZ.has(entrada.name)) continue;
      if (entrada.isDirectory()) visitar(completo);
      else if (entrada.isFile() && !EXCLUIR_ARQUIVOS.has(rel)) resultado.push(rel);
    }
  };
  visitar(raiz);
  return resultado.sort();
}

/** Lê um JSON; devolve { valor } ou { erro } sem lançar. */
function lerJson(raiz, rel) {
  const caminho = join(raiz, rel);
  if (!existsSync(caminho)) return { erro: 'arquivo de configuração ausente' };
  try {
    return { valor: JSON.parse(readFileSync(caminho, 'utf8')) };
  } catch {
    return { erro: 'configuração ilegível ou com JSON inválido' };
  }
}

function lerTexto(raiz, rel) {
  return readFileSync(join(raiz, rel), 'utf8');
}

/**
 * Valida o repositório em `raiz`.
 * @param {string} raiz
 * @returns {{arquivo: string, linha: number, mensagem: string, severidade: 'erro'|'aviso'}[]}
 */
export function validar(raiz) {
  raiz = resolve(raiz);
  const problemas = [];

  // 1. Termos proibidos e segredos em todos os arquivos de texto.
  const config = lerJson(raiz, ARQUIVO_TERMOS);
  if (config.erro) problemas.push(problema(ARQUIVO_TERMOS, 1, `Não foi possível carregar os termos proibidos: ${config.erro}.`));

  for (const rel of listarArquivos(raiz)) {
    let buffer;
    try {
      buffer = readFileSync(join(raiz, rel));
    } catch {
      problemas.push(problema(rel, 1, 'Arquivo ilegível; não foi possível varrer.', 'aviso'));
      continue;
    }
    if (buffer.includes(0)) continue; // binário
    const texto = buffer.toString('utf8');

    if (config.valor) {
      for (const o of varrerTermos(texto, rel, config.valor)) {
        problemas.push(problema(rel, o.linha, `Termo proibido encontrado: "${o.termo}".`));
      }
    }
    for (const s of detectarSegredos(texto)) {
      problemas.push(problema(rel, s.linha, `Possível segredo detectado (${s.tipo}); valor omitido.`));
    }
  }

  // 2. Capítulos e prompts.
  const entradasEbook = listarDiretorio(join(raiz, 'ebook'));
  const entradasPrompts = listarDiretorio(join(raiz, 'prompts'));
  if (!entradasEbook) problemas.push(problema('ebook', 1, 'Diretório ebook/ ausente.'));
  if (!entradasPrompts) problemas.push(problema('prompts', 1, 'Diretório prompts/ ausente.'));

  const arquivosEbook = (entradasEbook ?? []).filter((e) => e.isFile() && e.name.endsWith('.md')).map((e) => e.name).sort();
  const arquivosPrompts = (entradasPrompts ?? []).filter((e) => e.isFile()).map((e) => e.name).sort();

  for (const nome of arquivosEbook) {
    if (!nomeValido(nome)) {
      problemas.push(problema(`ebook/${nome}`, 1, 'Nome fora do padrão NN-nome.md; o arquivo será ignorado no build.'));
    }
  }

  const capitulos = arquivosEbook.filter((n) => PADRAO_CAPITULO.test(n));
  const prompts = arquivosPrompts.filter((n) => /^\d{2}-.+\.md$/.test(n));

  if (entradasEbook && entradasPrompts) {
    for (const nome of verificarCorrespondencia(capitulos, prompts)) {
      problemas.push(problema(`ebook/${nome}`, 1, `Capítulo sem Prompt_Capitulo correspondente em prompts/${nome}.`));
    }
  }

  // 3. Seis seções dos prompts.
  for (const nome of prompts) {
    const rel = `prompts/${nome}`;
    try {
      const modelo = parsearPrompt(lerTexto(raiz, rel));
      for (const secao of secoesFaltantes(modelo)) {
        problemas.push(problema(rel, 1, `Seção obrigatória ausente ou vazia: "${secao}".`));
      }
    } catch {
      problemas.push(problema(rel, 1, 'Arquivo ilegível; não foi possível validar o prompt.', 'aviso'));
    }
  }

  // 4. Imagens, texto alternativo e blocos CSS nos capítulos.
  const entradasAssets = listarDiretorio(join(raiz, 'assets'));
  if (!entradasAssets) problemas.push(problema('assets', 1, 'Diretório assets/ ausente.'));
  const presentes = (entradasAssets ?? []).filter((e) => e.isFile()).map((e) => e.name);

  const textosCapitulos = [];
  for (const nome of arquivosEbook) {
    const rel = `ebook/${nome}`;
    let texto;
    try {
      texto = lerTexto(raiz, rel);
    } catch {
      problemas.push(problema(rel, 1, 'Arquivo ilegível; não foi possível validar o capítulo.', 'aviso'));
      continue;
    }
    if (PADRAO_CAPITULO.test(nome)) textosCapitulos.push({ nome, rel, texto });

    const refs = extrairReferenciasImagem(texto);
    for (const r of verificarImagens(refs, presentes)) {
      problemas.push(problema(rel, r.linha, `Imagem referenciada não encontrada em assets/: ${r.caminho}`));
    }
    for (const r of verificarAltTexto(refs)) {
      problemas.push(problema(rel, r.linha, `Imagem sem texto alternativo: ${r.caminho}`));
    }
  }
  for (const cap of verificarBlocosCss(textosCapitulos)) {
    problemas.push(problema(cap.rel, 1, 'Capítulo sem nenhum bloco de código css.'));
  }

  // 5. Prompt_Imagem.
  const relImagens = 'assets/PROMPTS-IMAGENS.md';
  if (!existsSync(join(raiz, relImagens))) {
    problemas.push(problema(relImagens, 1, 'Arquivo ausente.'));
  } else {
    try {
      const texto = lerTexto(raiz, relImagens);
      const linhas = texto.split(/\r\n|\r|\n/);
      const titulos = [];
      linhas.forEach((l, i) => {
        if (/^##(?!#)(\s|$)/.test(l)) titulos.push(i + 1);
      });
      parsearPromptsImagem(texto).forEach((entrada, i) => {
        const linha = titulos[i] ?? 1;
        for (const chave of camposFaltantes(entrada)) {
          problemas.push(problema(relImagens, linha, `Campo obrigatório ausente ou inválido no Prompt_Imagem: "${rotuloCampo[chave]}".`));
        }
      });

      const nomes = lerJson(raiz, ARQUIVO_NOMES);
      if (nomes.erro) {
        problemas.push(problema(ARQUIVO_NOMES, 1, `Não foi possível carregar os nomes protegidos: ${nomes.erro}.`));
      } else {
        const lista = Array.isArray(nomes.valor?.nomes) ? nomes.valor.nomes : [];
        linhas.forEach((l, i) => {
          if (contemNomeProtegido(l, lista)) {
            problemas.push(problema(relImagens, i + 1, 'Prompt_Imagem contém nome protegido (personagem, logotipo ou marca).'));
          }
        });
      }
    } catch {
      problemas.push(problema(relImagens, 1, 'Arquivo ilegível; não foi possível validar os Prompt_Imagem.', 'aviso'));
    }
  }

  // 6. Links relativos do README.md.
  if (!existsSync(join(raiz, 'README.md'))) {
    problemas.push(problema('README.md', 1, 'Arquivo ausente.'));
  } else {
    try {
      const links = extrairLinksRelativos(lerTexto(raiz, 'README.md'));
      const existentes = links.map((l) => l.destino).filter((d) => existsSync(resolve(raiz, decodeURIComponentSeguro(d))));
      for (const l of verificarLinksRelativos(links, existentes)) {
        problemas.push(problema('README.md', l.linha, `Link relativo quebrado: ${l.destino}`));
      }
    } catch {
      problemas.push(problema('README.md', 1, 'Arquivo ilegível; não foi possível validar os links.', 'aviso'));
    }
  }

  return problemas;
}

function decodeURIComponentSeguro(texto) {
  try {
    return decodeURI(texto);
  } catch {
    return texto;
  }
}

/** Formata um problema como "arquivo:linha: mensagem". */
export function formatarProblema(p) {
  const prefixo = p.severidade === 'aviso' ? 'Aviso: ' : '';
  return `${p.arquivo}:${p.linha}: ${prefixo}${p.mensagem}`;
}

function principal() {
  const raiz = process.argv[2] ?? resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const problemas = validar(raiz);
  for (const p of problemas) {
    (p.severidade === 'aviso' ? console.warn : console.error)(formatarProblema(p));
  }
  const erros = problemas.filter((p) => p.severidade !== 'aviso').length;
  if (erros === 0) console.log('Validação concluída sem problemas.');
  else console.error(`Validação encontrou ${erros} problema(s).`);
  process.exit(erros === 0 ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  principal();
}
