# Prompt 02: Seletores

## Objetivo

Gerar o Capítulo 2 do e-book, que ensina os seletores CSS: de tipo, classe, id, universal, de atributo, combinadores (descendente, filho, irmão adjacente e geral), pseudoclasses (`:hover`, `:first-child`, `:nth-child()`, `:not()`), pseudoelementos (`::before`, `::after`) e o conceito de especificidade. O leitor deve saber escolher o seletor certo e prever qual regra vence um conflito.

## Contexto

Este é o segundo capítulo do e-book de CSS com tema Star Wars. No Capítulo 1 o(a) aprendiz descobriu o holocron e escreveu suas primeiras regras. Agora ele(a) precisa "mirar" os elementos certos da página, como um piloto que escolhe o alvo no painel da nave. Os exemplos devem usar uma página com uma frota (`.frota`), naves (`.nave`), sabres (`.sabre-de-luz`) e holocrons (`.holocron`), com nomes genéricos e sem marcas protegidas. O público são iniciantes em web.

## Papel da IA

Você é um(a) mestre Jedi do CSS, instrutor(a) de front-end paciente e rigoroso(a) com a precisão técnica. Escreve em português do Brasil e explica a lógica por trás de cada seletor com analogias de navegação espacial.

## Instruções

1. Abra com uma cena curta em que o(a) aprendiz precisa selecionar apenas uma nave específica dentro de uma frota inteira.
2. Apresente o HTML de apoio (uma frota com várias naves, sabres e holocrons) e reutilize esse mesmo HTML nos exemplos para o leitor acompanhar.
3. Explique cada tipo de seletor em uma subseção própria, com exemplo CSS válido: tipo, classe, id, universal, atributo (`[data-tipo="caça"]`), grupo (vírgula).
4. Explique os combinadores (espaço, `>`, `+`, `~`) com um diagrama textual simples da árvore do HTML.
5. Explique pseudoclasses e pseudoelementos com ao menos um exemplo de `:hover` em `.sabre-de-luz` e um de `::before` em `.holocron`.
6. Explique a especificidade com uma tabela (inline, id, classe/atributo/pseudoclasse, tipo/pseudoelemento) e dê um exemplo de conflito resolvido passo a passo. Avise sobre os riscos de `!important`.
7. Cada exemplo de código deve ser CSS válido, testável em navegador, e vir acompanhado de explicação em português.
8. Inclua uma "Missão prática": dado um HTML, o leitor escreve seletores para estilizar apenas a segunda nave da frota.
9. Solicite e posicione uma imagem referenciada como `../assets/cap02-seletores.png`, com texto alternativo descritivo (por exemplo, "Painel de mira holográfico destacando uma nave entre várias em formação").
10. Termine com um resumo e uma ponte para o Capítulo 3 (Modelo de caixa).

## Formato de saída esperado

Entregue um único arquivo Markdown em português, pronto para salvar em `ebook/02-seletores.md`, com:

- Título de nível 1 no formato "Capítulo 2: Seletores".
- Seções de nível 2 para a cena de abertura, HTML de apoio, cada família de seletores, especificidade, missão prática e resumo.
- Pelo menos um bloco de código com a linguagem `css` (mínimo de cinco ao longo do capítulo) e um bloco `html` para o HTML de apoio.
- Uma tabela Markdown de especificidade.
- Uma imagem com a sintaxe `![texto alternativo descritivo](../assets/cap02-seletores.png)`.

Exemplo do formato esperado de um trecho:

````markdown
```css
.frota > .nave:first-child {
  border: 2px solid gold;
}
```

O combinador `>` seleciona apenas filhos diretos de `.frota`,
e `:first-child` restringe a escolha à primeira nave.
````

Não inclua texto fora do conteúdo do capítulo.

## Critérios de qualidade

- [ ] O texto está em português do Brasil e sem erros de gramática.
- [ ] O tema Star Wars aparece na narrativa e nos nomes de classes (`.nave`, `.sabre-de-luz`, `.holocron`).
- [ ] Há pelo menos um bloco ```css e todos os seletores usados são válidos.
- [ ] Todos os tipos de seletor listados no objetivo foram cobertos com exemplo.
- [ ] A explicação de especificidade está correta e inclui um conflito resolvido.
- [ ] Cada exemplo é seguido de explicação em português.
- [ ] A imagem `../assets/cap02-seletores.png` está referenciada com texto alternativo descritivo.
- [ ] Há uma missão prática (exercício) e um resumo.
- [ ] Não há termos proibidos pelo projeto.
