// Módulo puro de montagem do documento HTML consolidado do e-book.
// Sem I/O: recebe partes já renderizadas em HTML e devolve texto.

/**
 * Escapa caracteres especiais de HTML em um texto.
 * @param {string} texto
 * @returns {string}
 */
export function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Remove tags HTML e decodifica as entidades mais comuns.
 * @param {string} html
 * @returns {string}
 */
function textoSimples(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();
}

/**
 * Extrai o título principal (primeiro h1, ou Markdown "# ") de um capítulo.
 * Retorna string vazia quando não houver título.
 * @param {string} htmlOuMd
 * @returns {string}
 */
export function extrairTitulo(htmlOuMd) {
  const texto = String(htmlOuMd ?? '');
  const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(texto);
  if (h1) return textoSimples(h1[1]);
  const md = /^#[ \t]+(.+?)[ \t]*#*[ \t]*$/m.exec(texto);
  return md ? md[1].trim() : '';
}

/**
 * Extrai os títulos de uma lista de capítulos (HTML ou Markdown).
 * @param {string[]} capitulos
 * @returns {string[]}
 */
export function extrairTitulos(capitulos) {
  return capitulos.map((c, i) => extrairTitulo(c) || `Capítulo ${i + 1}`);
}

/**
 * Gera o HTML do sumário, com uma entrada por título (escapado).
 * @param {string[]} titulos
 * @returns {string}
 */
export function gerarSumario(titulos) {
  const itens = titulos
    .map((t, i) => `<li><a href="#capitulo-${i + 1}">${escaparHtml(t)}</a></li>`)
    .join('\n');
  return `<nav class="sumario" id="sumario">\n<h2>Sumário</h2>\n<ol>\n${itens}\n</ol>\n</nav>`;
}

/**
 * Monta o documento HTML completo.
 * partes = [capa, ...capitulos, glossario, creditos]
 * Ordem: capa, sumário, capítulos, glossário, créditos e avisos.
 * @param {string[]} partes
 * @param {string} css
 * @returns {string}
 */
export function montarDocumento(partes, css) {
  if (!Array.isArray(partes) || partes.length < 3) {
    throw new Error('São necessárias ao menos capa, glossário e créditos.');
  }
  const capa = partes[0];
  const capitulos = partes.slice(1, -2);
  const glossario = partes[partes.length - 2];
  const creditos = partes[partes.length - 1];

  const sumario = gerarSumario(extrairTitulos(capitulos));
  const corpoCapitulos = capitulos
    .map((c, i) => `<section class="capitulo" id="capitulo-${i + 1}">\n${c}\n</section>`)
    .join('\n');

  return [
    '<!doctype html>',
    '<html lang="pt-BR">',
    '<head>',
    '<meta charset="utf-8">',
    `<style>${css ?? ''}</style>`,
    '</head>',
    '<body>',
    `<section class="capa">\n${capa}\n</section>`,
    sumario,
    corpoCapitulos,
    `<section class="glossario">\n${glossario}\n</section>`,
    `<section class="creditos">\n${creditos}\n</section>`,
    '</body>',
    '</html>',
    '',
  ].join('\n');
}
