// Varredura de termos proibidos (função pura, sem I/O).

/** Escapa caracteres especiais de expressão regular. */
function escaparRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Procura termos como palavra inteira, sem diferenciar maiúsculas.
 * Letras (inclusive acentuadas), dígitos e "_" fazem parte da palavra,
 * então uma palavra maior que contém o termo não casa.
 *
 * @param {string} texto conteúdo do arquivo
 * @param {string} arquivo caminho usado no relatório
 * @param {string[]|{termos: string[], ignorarMaiusculas?: boolean}} termos
 *   lista de termos ou o objeto lido de termos-proibidos.json
 * @returns {{arquivo: string, linha: number, termo: string}[]}
 *   uma ocorrência por termo e por linha; linha começa em 1
 */
export function varrerTermos(texto, arquivo, termos) {
  const lista = Array.isArray(termos) ? termos : (termos?.termos ?? []);
  const ignorarMaiusculas = Array.isArray(termos) ? true : termos?.ignorarMaiusculas !== false;
  const flags = ignorarMaiusculas ? 'iu' : 'u';

  const regexes = lista
    .filter((t) => typeof t === 'string' && t.length > 0)
    .map((termo) => ({
      termo,
      regex: new RegExp(`(?<![\\p{L}\\p{N}_])${escaparRegex(termo)}(?![\\p{L}\\p{N}_])`, flags),
    }));

  const ocorrencias = [];
  const linhas = String(texto).split(/\r\n|\r|\n/);
  linhas.forEach((conteudo, indice) => {
    for (const { termo, regex } of regexes) {
      if (regex.test(conteudo)) {
        ocorrencias.push({ arquivo, linha: indice + 1, termo });
      }
    }
  });
  return ocorrencias;
}
