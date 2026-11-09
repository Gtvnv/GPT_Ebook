// Funções puras para extrair e verificar referências em arquivos Markdown
// (imagens, links relativos e blocos de código CSS). Sem acesso a disco.

/**
 * Percorre o Markdown linha a linha, separando o que está dentro de blocos
 * de código cercados (``` ou ~~~) do texto comum.
 * Chama `aoLerLinha(texto, numeroDaLinha, dentroDeBloco, infoDoBloco)`.
 */
function percorrerLinhas(md, aoLerLinha) {
  const linhas = String(md ?? '').split(/\r?\n/);
  let cerca = null; // { marca, tamanho, info } enquanto estiver dentro de um bloco

  linhas.forEach((linha, indice) => {
    const numero = indice + 1;
    const abertura = /^ {0,3}(`{3,}|~{3,})\s*(.*)$/.exec(linha);

    if (cerca) {
      // Fechamento: mesma marca, ao menos o mesmo tamanho, sem texto depois.
      const fecha = /^ {0,3}(`{3,}|~{3,})\s*$/.exec(linha);
      if (fecha && fecha[1][0] === cerca.marca && fecha[1].length >= cerca.tamanho) {
        cerca = null;
        return;
      }
      aoLerLinha(linha, numero, true, cerca.info);
      return;
    }

    if (abertura) {
      cerca = {
        marca: abertura[1][0],
        tamanho: abertura[1].length,
        info: abertura[2].trim(),
      };
      aoLerLinha(linha, numero, false, cerca.info, true);
      return;
    }

    aoLerLinha(linha, numero, false, '');
  });
}

/**
 * Extrai as referências de imagem `![alt](caminho)` fora de blocos de código.
 * Retorna uma lista de `{ caminho, alt, linha }`.
 */
export function extrairReferenciasImagem(md) {
  const referencias = [];
  const regex = /!\[([^\]]*)\]\(\s*<?([^)\s>]*)>?(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g;

  percorrerLinhas(md, (linha, numero, dentroDeBloco, _info, abertura) => {
    if (dentroDeBloco || abertura) return;
    for (const m of linha.matchAll(regex)) {
      referencias.push({ caminho: m[2], alt: m[1], linha: numero });
    }
  });

  return referencias;
}

/** Indica se o destino é absoluto (http, mailto, etc.), de protocolo ou só âncora. */
function ehDestinoNaoRelativo(destino) {
  return (
    destino === '' ||
    destino.startsWith('#') ||
    destino.startsWith('//') ||
    /^[a-z][a-z0-9+.-]*:/i.test(destino)
  );
}

/**
 * Extrai os links relativos `[texto](destino)` fora de blocos de código.
 * Ignora imagens, links absolutos (http, mailto etc.) e âncoras puras; remove
 * âncora (#...) e query (?...) dos links relativos.
 * Retorna uma lista de `{ destino, linha }`.
 */
export function extrairLinksRelativos(md) {
  const links = [];
  const regex = /(!?)\[[^\]]*\]\(\s*<?([^)\s>]*)>?(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g;

  percorrerLinhas(md, (linha, numero, dentroDeBloco, _info, abertura) => {
    if (dentroDeBloco || abertura) return;
    for (const m of linha.matchAll(regex)) {
      if (m[1] === '!') continue; // imagem, não é link
      const bruto = m[2];
      if (ehDestinoNaoRelativo(bruto)) continue;
      const destino = bruto.split('#')[0].split('?')[0];
      if (destino === '') continue;
      links.push({ destino, linha: numero });
    }
  });

  return links;
}

/** Conta os blocos de código cercados cuja linguagem é `css`. */
export function contarBlocosCss(md) {
  let total = 0;
  percorrerLinhas(md, (_linha, _numero, _dentro, info, abertura) => {
    if (abertura && info.split(/\s+/)[0].toLowerCase() === 'css') total += 1;
  });
  return total;
}

// ---------------------------------------------------------------------------
// Verificações puras
// ---------------------------------------------------------------------------

/** Último segmento de um caminho, aceitando "/" e "\". */
function nomeDoArquivo(caminho) {
  const partes = String(caminho).split(/[\\/]/);
  return partes[partes.length - 1];
}

/** Normaliza um caminho relativo: separadores "/", sem "./" inicial, sem "." e "..". */
function normalizarCaminho(caminho) {
  let texto = String(caminho).replace(/\\/g, '/');
  try {
    texto = decodeURI(texto);
  } catch {
    // mantém o texto original se a decodificação falhar
  }
  const saida = [];
  for (const parte of texto.split('/')) {
    if (parte === '' || parte === '.') continue;
    if (parte === '..') {
      if (saida.length > 0 && saida[saida.length - 1] !== '..') saida.pop();
      else saida.push('..');
      continue;
    }
    saida.push(parte);
  }
  return saida.join('/');
}

/**
 * Retorna os capítulos que não possuem Prompt_Capitulo de mesmo nome.
 * O resultado é vazio se e somente se todo capítulo tem prompt.
 */
export function verificarCorrespondencia(capitulos, prompts) {
  const conjunto = new Set(prompts);
  return capitulos.filter((capitulo) => !conjunto.has(capitulo));
}

/**
 * Retorna as referências de imagem cujo nome de arquivo não está entre os
 * arquivos presentes em `assets/`. A comparação usa só o nome do arquivo, então
 * trocar um placeholder por um arquivo final de mesmo nome não muda o resultado.
 */
export function verificarImagens(refs, presentes) {
  const conjunto = new Set([...presentes].map(nomeDoArquivo));
  return refs.filter((ref) => !conjunto.has(nomeDoArquivo(ref.caminho)));
}

/** Retorna as referências com texto alternativo vazio ou só de espaços. */
export function verificarAltTexto(refs) {
  return refs.filter((ref) => String(ref.alt ?? '').trim() === '');
}

/**
 * Retorna os capítulos sem nenhum bloco ```css.
 * Cada capítulo é `{ nome, texto }`; o retorno é a lista dos objetos reprovados.
 */
export function verificarBlocosCss(capitulos) {
  return capitulos.filter((capitulo) => contarBlocosCss(capitulo.texto) === 0);
}

/**
 * Retorna os links relativos cujo destino não existe no conjunto de existentes.
 * Cada link pode ser um texto ou um objeto `{ destino, linha }`.
 */
export function verificarLinksRelativos(links, existentes) {
  const conjunto = new Set([...existentes].map(normalizarCaminho));
  return links.filter((link) => {
    const destino = typeof link === 'string' ? link : link.destino;
    return !conjunto.has(normalizarCaminho(destino));
  });
}
