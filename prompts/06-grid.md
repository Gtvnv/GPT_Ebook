# Prompt 06: Layout com Grid

## Objetivo

Gerar o Capítulo 6 do e-book, que ensina o CSS Grid Layout: `display: grid`, `grid-template-columns` e `grid-template-rows`, a unidade `fr`, `repeat()`, `minmax()`, `gap`, posicionamento de itens por linhas (`grid-column`, `grid-row`), `grid-template-areas`, alinhamento (`justify-items`, `align-items`, `place-items`) e grades responsivas com `auto-fit`/`auto-fill`. O leitor deve criar layouts bidimensionais e saber quando preferir Grid ou Flexbox.

## Contexto

Este é o sexto capítulo do e-book de CSS com tema Star Wars. O Capítulo 5 apresentou o Flexbox, ideal para uma dimensão. Agora o(a) aprendiz projeta o mapa estelar de uma base: linhas e colunas definem setores, e cada elemento ocupa sua área. Os exemplos usam `.mapa-estelar` como contêiner grid, `.setor`, `.nave`, `.holocron` e `.painel-de-controle`, com nomes genéricos e sem marcas protegidas.

## Papel da IA

Você é um(a) mestre Jedi do CSS e instrutor(a) de layout. Escreve em português do Brasil, desenha as grades em diagramas de texto antes do código e compara Grid com Flexbox com honestidade técnica.

## Instruções

1. Abra com uma cena curta em que o(a) aprendiz precisa organizar o mapa estelar de uma base em linhas e colunas.
2. Mostre o HTML de apoio e o efeito de `display: grid` com `grid-template-columns: repeat(3, 1fr)`.
3. Explique linhas, colunas, células e áreas com um diagrama em texto, e a unidade `fr` com cálculo de exemplo.
4. Explique `repeat()`, `minmax()`, `gap` e a diferença entre grade explícita e implícita (`grid-auto-rows`).
5. Explique o posicionamento por linhas com `grid-column: 1 / 3` e `span`, com exemplo de um `.holocron` ocupando duas colunas.
6. Explique `grid-template-areas` com um layout de página completo (cabeçalho, menu, conteúdo, rodapé).
7. Explique alinhamento (`justify-items`, `align-items`, `place-items`, `justify-content`, `align-content`).
8. Mostre uma galeria responsiva sem media queries com `repeat(auto-fit, minmax(180px, 1fr))`.
9. Inclua uma comparação curta e honesta: quando usar Grid, quando usar Flexbox e quando combinar os dois.
10. Todos os exemplos devem ser CSS válido, testável em navegador, e vir acompanhados de explicação em português.
11. Inclua uma "Missão prática": montar o layout de página da base estelar com `grid-template-areas`.
12. Solicite e posicione uma imagem referenciada como `../assets/cap06-grid.png`, com texto alternativo descritivo (por exemplo, "Mapa holográfico de uma estação espacial dividido em setores retangulares").
13. Termine com um resumo e uma ponte para o Capítulo 7 (Posicionamento).

## Formato de saída esperado

Entregue um único arquivo Markdown em português, pronto para salvar em `ebook/06-grid.md`, com:

- Título de nível 1 no formato "Capítulo 6: Layout com Grid".
- Seções de nível 2 para a cena de abertura, introdução ao grid, unidade `fr` e `repeat()`, posicionamento por linhas, áreas nomeadas, alinhamento, grade responsiva, Grid versus Flexbox, missão prática e resumo.
- Pelo menos um bloco de código com a linguagem `css` (mínimo de seis ao longo do capítulo) e blocos `html` para o HTML de apoio.
- Diagramas de grade em bloco de texto simples.
- Uma imagem com a sintaxe `![texto alternativo descritivo](../assets/cap06-grid.png)`.

Exemplo do formato esperado de um trecho:

````markdown
```css
.mapa-estelar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.holocron {
  grid-column: span 2;
}
```

O contêiner cria três colunas de largura igual. O `.holocron` ocupa duas
delas, e as demais células continuam fluindo nas posições seguintes.
````

Não inclua texto fora do conteúdo do capítulo.

## Critérios de qualidade

- [ ] O texto está em português do Brasil e sem erros de gramática.
- [ ] O tema Star Wars aparece na narrativa e nos exemplos (`.mapa-estelar`, `.nave`, `.holocron`).
- [ ] Há pelo menos um bloco ```css e todas as propriedades de grid são válidas.
- [ ] Os diagramas de grade correspondem ao código apresentado.
- [ ] Cada exemplo é seguido de explicação em português.
- [ ] A comparação entre Grid e Flexbox é correta e equilibrada.
- [ ] A imagem `../assets/cap06-grid.png` está referenciada com texto alternativo descritivo.
- [ ] Há uma missão prática (exercício) e um resumo.
- [ ] Não há termos proibidos pelo projeto.
