// Parser e formatador do Prompt_Capitulo (prompts/NN-slug.md).
// Funções puras: não acessam disco nem variáveis de ambiente.
//
// Modelo PromptCapitulo:
//   { numero: inteiro|null, titulo: texto, secoes: { [nomeDaSecao]: texto } }
// O slug vem do nome do arquivo, por isso não faz parte do texto nem do round trip.

/** Seis seções obrigatórias, na ordem em que aparecem no arquivo. */
export const SECOES_OBRIGATORIAS = Object.freeze([
  'Objetivo',
  'Contexto',
  'Papel da IA',
  'Instruções',
  'Formato de saída esperado',
  'Critérios de qualidade',
]);

const REGEX_TITULO = /^#\s+Prompt\s+(\d+)\s*:\s*(.*?)\s*$/u;
const REGEX_SECAO = /^##\s+(.*?)\s*$/u;
const REGEX_CERCA = /^\s*(```|~~~)/u;

/** Chave de comparação do nome da seção (sem diferenciar maiúsculas/espaços). */
function chave(nome) {
  return nome.trim().replace(/\s+/gu, ' ').toLocaleLowerCase('pt-BR');
}

const SECAO_POR_CHAVE = new Map(SECOES_OBRIGATORIAS.map((n) => [chave(n), n]));

/**
 * Converte o texto de um Prompt_Capitulo em modelo.
 * Só os títulos de nível 2 com nome de seção obrigatória iniciam uma seção;
 * outros "##" e linhas dentro de blocos de código fazem parte do conteúdo.
 * @param {string} texto
 * @returns {{numero: number|null, titulo: string, secoes: Record<string,string>}}
 */
export function parsearPrompt(texto) {
  const linhas = String(texto ?? '').split(/\r?\n/u);
  let numero = null;
  let titulo = '';
  let tituloLido = false;
  let atual = null;
  let dentroDeCerca = false;
  const acumulado = new Map();

  for (const linha of linhas) {
    if (REGEX_CERCA.test(linha)) dentroDeCerca = !dentroDeCerca;

    if (!dentroDeCerca && !tituloLido && atual === null) {
      const t = REGEX_TITULO.exec(linha);
      if (t) {
        numero = Number.parseInt(t[1], 10);
        titulo = t[2];
        tituloLido = true;
        continue;
      }
    }

    if (!dentroDeCerca) {
      const s = REGEX_SECAO.exec(linha);
      const nome = s ? SECAO_POR_CHAVE.get(chave(s[1])) : undefined;
      if (nome && !acumulado.has(nome)) {
        atual = nome;
        acumulado.set(nome, []);
        continue;
      }
    }

    if (atual !== null) acumulado.get(atual).push(linha);
  }

  const secoes = {};
  for (const nome of SECOES_OBRIGATORIAS) {
    if (acumulado.has(nome)) secoes[nome] = acumulado.get(nome).join('\n').trim();
  }
  return { numero, titulo, secoes };
}

/**
 * Converte o modelo em texto Markdown. Seções ausentes ou vazias são omitidas.
 * @param {{numero: number|null, titulo: string, secoes?: Record<string,string>}} modelo
 * @returns {string}
 */
export function formatarPrompt(modelo) {
  const secoes = modelo?.secoes ?? {};
  const numero = Number.isInteger(modelo?.numero)
    ? String(modelo.numero).padStart(2, '0')
    : '00';
  const partes = [`# Prompt ${numero}: ${modelo?.titulo ?? ''}`.trimEnd()];

  for (const nome of SECOES_OBRIGATORIAS) {
    const conteudo = typeof secoes[nome] === 'string' ? secoes[nome].trim() : '';
    if (conteudo !== '') partes.push(`## ${nome}\n\n${conteudo}`);
  }
  return `${partes.join('\n\n')}\n`;
}

/**
 * Lista as seções obrigatórias ausentes ou vazias, na ordem canônica.
 * @param {{secoes?: Record<string,string>}} modelo
 * @returns {string[]}
 */
export function secoesFaltantes(modelo) {
  const secoes = modelo?.secoes ?? {};
  return SECOES_OBRIGATORIAS.filter(
    (nome) => typeof secoes[nome] !== 'string' || secoes[nome].trim() === '',
  );
}
