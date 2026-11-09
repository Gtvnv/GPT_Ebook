// Funções puras para validar e ordenar nomes de arquivos de capítulos.
// Sem acesso a disco: recebem listas de nomes e devolvem novos valores.

// Dois dígitos, hífen, slug não vazio e extensão .md (ex.: "05-flexbox.md").
const PADRAO_NOME = /^(\d{2})-.+\.md$/;

/**
 * Indica se o nome segue o padrão `NN-slug.md`.
 * @param {unknown} nome
 * @returns {boolean}
 */
export function nomeValido(nome) {
  return typeof nome === 'string' && PADRAO_NOME.test(nome);
}

// Compara duas strings por ponto de código, de forma determinística
// (independente de locale).
function compararTexto(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Filtra os nomes válidos e os ordena pelo prefixo numérico.
 * Em caso de prefixos iguais, desempata pelo nome completo.
 * Não altera a lista recebida.
 * @param {string[]} nomes
 * @returns {string[]}
 */
export function ordenarCapitulos(nomes) {
  return nomes
    .filter(nomeValido)
    .map((nome) => ({ nome, numero: Number.parseInt(nome.slice(0, 2), 10) }))
    .sort((a, b) => a.numero - b.numero || compararTexto(a.nome, b.nome))
    .map((item) => item.nome);
}

/**
 * Retorna os capítulos esperados que não aparecem entre os existentes,
 * preservando a ordem de `esperados`.
 * @param {Iterable<string>} esperados
 * @param {Iterable<string>} existentes
 * @returns {string[]}
 */
export function capitulosAusentes(esperados, existentes) {
  const presentes = new Set(existentes);
  return [...esperados].filter((nome) => !presentes.has(nome));
}
