// Módulo puro para ler, gerar e validar o arquivo assets/PROMPTS-IMAGENS.md.
// Não faz I/O: recebe e devolve apenas texto e estruturas de dados.
//
// Formato de cada bloco (um por imagem):
//
//   ## cap05-flexbox.png
//
//   - **Arquivo de destino:** assets/cap05-flexbox.png
//   - **Descrição da cena:** ...
//   - **Estilo visual:** ...
//   - **Proporção:** 16:9
//   - **Observações de uso:** ...
//
// Os valores ocupam uma única linha e são comparados sem espaços nas pontas.

/** Campos obrigatórios (chave do modelo) com o rótulo usado no Markdown, na ordem de saída. */
export const CAMPOS = [
  { chave: 'arquivoDestino', rotulo: 'Arquivo de destino' },
  { chave: 'descricaoCena', rotulo: 'Descrição da cena' },
  { chave: 'estiloVisual', rotulo: 'Estilo visual' },
  { chave: 'proporcao', rotulo: 'Proporção' },
  { chave: 'observacoesUso', rotulo: 'Observações de uso' },
];

/** Formato válido da proporção, por exemplo "16:9". */
export const REGEX_PROPORCAO = /^\d+:\d+$/;

/** Converte qualquer valor em texto sem espaços nas pontas. */
function aparar(valor) {
  return typeof valor === 'string' ? valor.trim() : '';
}

/** Extrai o nome do arquivo (último segmento do caminho) para o título do bloco. */
function nomeDoArquivo(caminho) {
  const partes = aparar(caminho).split(/[\\/]/);
  return partes[partes.length - 1];
}

/**
 * Lê o texto de PROMPTS-IMAGENS.md e devolve a lista de PromptImagem.
 * Campos ausentes no bloco ficam como texto vazio (use camposFaltantes para detectá-los).
 * Conteúdo anterior ao primeiro título de nível 2 é ignorado.
 */
export function parsearPromptsImagem(texto) {
  const lista = [];
  let atual = null;
  const porRotulo = new Map(CAMPOS.map((c) => [c.rotulo.toLowerCase(), c.chave]));

  for (const linha of String(texto ?? '').split(/\r?\n/)) {
    if (/^##(?!#)\s/.test(linha) || /^##$/.test(linha)) {
      atual = {};
      for (const c of CAMPOS) atual[c.chave] = '';
      lista.push(atual);
      continue;
    }
    if (!atual) continue;
    const m = /^\s*[-*]\s+\*\*(.+?):\*\*\s*(.*)$/.exec(linha);
    if (!m) continue;
    const chave = porRotulo.get(m[1].trim().toLowerCase());
    if (chave) atual[chave] = m[2].trim();
  }
  return lista;
}

/** Gera o Markdown de PROMPTS-IMAGENS.md a partir da lista de PromptImagem. */
export function formatarPromptsImagem(lista) {
  const blocos = (lista ?? []).map((item) => {
    const linhas = [`## ${nomeDoArquivo(item?.arquivoDestino)}`, ''];
    for (const c of CAMPOS) {
      linhas.push(`- **${c.rotulo}:** ${aparar(item?.[c.chave])}`);
    }
    return linhas.join('\n');
  });
  return blocos.length ? blocos.join('\n\n') + '\n' : '';
}

/**
 * Devolve as chaves dos campos obrigatórios ausentes ou vazios (só espaços conta como vazio),
 * na ordem canônica. A proporção fora do formato NN:NN também é considerada faltante.
 */
export function camposFaltantes(entrada) {
  return CAMPOS.filter(({ chave }) => {
    const valor = aparar(entrada?.[chave]);
    if (valor === '') return true;
    return chave === 'proporcao' && !REGEX_PROPORCAO.test(valor);
  }).map((c) => c.chave);
}

/**
 * Verdadeiro se o texto contém ao menos um dos nomes protegidos, sem diferenciar maiúsculas.
 * Nomes vazios (ou só espaços) são ignorados, pois casariam com qualquer texto.
 */
export function contemNomeProtegido(texto, lista) {
  const alvo = String(texto ?? '').toLowerCase();
  return (lista ?? []).some((nome) => {
    const n = aparar(nome).toLowerCase();
    return n !== '' && alvo.includes(n);
  });
}
