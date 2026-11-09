// Detecção simples de padrões de segredo (chave/token). Função pura, sem I/O.
// Os padrões são montados por concatenação para que este arquivo não case
// com a própria varredura. Nunca devolve o valor encontrado, só a linha e o tipo.

const PADROES = [
  { tipo: 'chave de acesso AWS', regex: new RegExp('\\bAK' + 'IA[0-9A-Z]{16}\\b') },
  { tipo: 'token do GitHub', regex: new RegExp('\\bgh' + '[pousr]_[A-Za-z0-9]{30,}') },
  { tipo: 'chave de API (sk-)', regex: new RegExp('\\bs' + 'k-[A-Za-z0-9_-]{20,}') },
  { tipo: 'token do Slack', regex: new RegExp('\\bxo' + 'x[abp]-[A-Za-z0-9-]{10,}') },
  { tipo: 'chave privada', regex: new RegExp('-----BEGIN [A-Z ]*PRIV' + 'ATE KEY-----') },
  {
    tipo: 'atribuição de segredo',
    regex: new RegExp(
      '(?:api[_-]?ke' + 'y|sec' + 'ret|tok' + 'en|pass' + 'word)["\']?\\s*[:=]\\s*["\'][A-Za-z0-9_\\-+/=.]{16,}["\']',
      'i',
    ),
  },
];

/**
 * @param {string} texto
 * @returns {{linha: number, tipo: string}[]} uma entrada por linha e tipo; sem o valor
 */
export function detectarSegredos(texto) {
  const achados = [];
  String(texto ?? '')
    .split(/\r\n|\r|\n/)
    .forEach((conteudo, indice) => {
      for (const { tipo, regex } of PADROES) {
        if (regex.test(conteudo)) achados.push({ linha: indice + 1, tipo });
      }
    });
  return achados;
}
