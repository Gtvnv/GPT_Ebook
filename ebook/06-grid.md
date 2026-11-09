# Capítulo 6: Layout com Grid

![Mapa holográfico de uma estação espacial dividido em setores retangulares](../assets/cap06-grid.png)

## Cena de abertura: o mapa estelar da base

A base precisa de um novo mapa estelar. O comandante quer setores bem definidos: três colunas, várias linhas, e um grande painel central que ocupe mais de uma célula. O Flexbox resolveu a formação da frota em uma só direção, mas aqui é preciso controlar **linhas e colunas ao mesmo tempo**.

Para isso existe o **CSS Grid Layout**, o sistema de layout bidimensional do CSS.

## Introdução ao grid

HTML de apoio:

```html
<div class="mapa-estelar">
  <div class="setor">A</div>
  <div class="setor">B</div>
  <div class="setor">C</div>
  <div class="setor">D</div>
  <div class="setor">E</div>
  <div class="setor">F</div>
</div>
```

```css
.setor {
  padding: 16px;
  background-color: #263238;
  color: #eceff1;
  border: 1px solid #29b6f6;
  text-align: center;
}

.mapa-estelar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
```

Explicação: `display: grid` transforma `.mapa-estelar` em um contêiner grid. `grid-template-columns` cria três colunas de largura igual e `gap` coloca 12px entre as células. Os seis setores preenchem a grade linha a linha: A, B, C na primeira; D, E, F na segunda.

```text
Coluna 1   Coluna 2   Coluna 3
+--------+ +--------+ +--------+
|   A    | |   B    | |   C    |  Linha 1
+--------+ +--------+ +--------+
|   D    | |   E    | |   F    |  Linha 2
+--------+ +--------+ +--------+
```

As **linhas de grade** são as divisões entre as células, numeradas a partir de 1. Uma grade de 3 colunas tem 4 linhas verticais (1, 2, 3, 4). Uma **célula** é o cruzamento de uma linha com uma coluna, e uma **área** é um conjunto retangular de células.

## A unidade `fr` e a função `repeat()`

`fr` significa "fração do espaço livre". Em `grid-template-columns: 1fr 2fr 1fr`, o espaço é dividido em 1 + 2 + 1 = 4 partes. Em um contêiner com 800px e sem `gap`, as colunas medem 200px, 400px e 200px.

`repeat()` evita repetição:

```css
.mapa-estelar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* igual a 1fr 1fr 1fr */
  grid-template-rows: 100px 200px;
  grid-auto-rows: minmax(80px, auto);
  gap: 12px;
}
```

Explicação:

- `grid-template-rows` define explicitamente as duas primeiras linhas: 100px e 200px. Elas formam a **grade explícita**.
- Se houver mais itens do que células, o navegador cria linhas extras (**grade implícita**), dimensionadas por `grid-auto-rows`.
- `minmax(80px, auto)` define um mínimo de 80px e deixa a linha crescer conforme o conteúdo.
- `gap` aceita um valor para linhas e colunas, ou dois: `gap: 8px 16px` (linhas, colunas).

## Posicionamento por linhas

Cada item pode dizer em quais linhas de grade começa e termina:

```css
.holocron {
  grid-column: 1 / 3;   /* da linha 1 até a linha 3: ocupa 2 colunas */
  grid-row: 1;
}
```

Também é possível usar `span`, que conta quantas faixas ocupar:

```css
.holocron {
  grid-column: span 2;
}

.painel-de-controle {
  grid-row: span 2;
}
```

Explicação: com `grid-column: 1 / 3`, o `.holocron` começa na linha 1 e termina antes da linha 3, cobrindo as colunas 1 e 2. Já `span 2` diz "ocupe duas colunas a partir de onde estiver"; as demais células continuam fluindo nas posições seguintes. O `.painel-de-controle` ocupa duas linhas de altura.

```text
+-------------------+ +--------+
|     .holocron     | |   C    |
|   (2 colunas)     | |        |
+-------------------+ +--------+
|   D    | |   E    | |   F    |
+--------+ +--------+ +--------+
```

## Áreas nomeadas

`grid-template-areas` desenha o layout em texto. Cada palavra nomeia uma célula; repetir o nome une as células em uma área.

```html
<div class="base">
  <header class="cabecalho">Cabeçalho</header>
  <nav class="menu">Menu</nav>
  <main class="conteudo">Conteúdo</main>
  <footer class="rodape">Rodapé</footer>
</div>
```

```css
.base {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "cabecalho cabecalho"
    "menu      conteudo"
    "rodape    rodape";
  min-height: 100vh;
  gap: 8px;
}

.cabecalho { grid-area: cabecalho; }
.menu      { grid-area: menu; }
.conteudo  { grid-area: conteudo; }
.rodape    { grid-area: rodape; }
```

```text
+----------------------------------+
|            cabecalho             |
+---------+------------------------+
|  menu   |        conteudo        |
+---------+------------------------+
|             rodape               |
+----------------------------------+
```

Explicação: o menu ocupa uma coluna fixa de 200px e o conteúdo usa o espaço restante (`1fr`). A linha do meio tem `1fr` e empurra o rodapé para a base da janela. Cada elemento recebe sua área com `grid-area`. Cada linha do `grid-template-areas` precisa ter o mesmo número de colunas, e as áreas devem ser retangulares.

## Alinhamento

O grid tem propriedades de alinhamento semelhantes às do flex:

```css
.mapa-estelar {
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-auto-rows: 100px;
  justify-content: center;   /* alinha a grade inteira na horizontal */
  align-content: start;      /* alinha a grade inteira na vertical */
  justify-items: center;     /* alinha cada item na sua célula (horizontal) */
  align-items: center;       /* alinha cada item na sua célula (vertical) */
}
```

Explicação:

- `justify-items` e `align-items` posicionam o conteúdo **dentro de cada célula**, nos eixos horizontal e vertical. O atalho é `place-items: center`.
- `justify-content` e `align-content` posicionam **a grade inteira** dentro do contêiner, quando as faixas somam menos que o espaço disponível.
- Para um único item, use `justify-self` e `align-self`.

## Grade responsiva

Uma galeria que ajusta o número de colunas sozinha, sem media queries:

```css
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}
```

Explicação: `minmax(180px, 1fr)` diz que cada coluna mede no mínimo 180px e no máximo uma fração do espaço. `auto-fit` cria quantas colunas couberem. Em uma janela de 800px cabem quatro colunas; em uma de 400px, duas. As colunas que sobrarem se expandem para preencher a linha. Já `auto-fill` também cria quantas colunas couberem, mas mantém as vazias, sem esticar os itens.

## Grid versus Flexbox

Os dois se complementam:

- Use **Flexbox** quando o layout é **unidimensional**: uma barra de navegação, uma fila de botões, o alinhamento interno de um cartão. O conteúdo manda no tamanho.
- Use **Grid** quando o layout é **bidimensional**: página com cabeçalho, menu e rodapé, galerias, painéis. O layout manda no conteúdo.
- **Combine os dois**: um grid para a estrutura da página e flex dentro de cada área para alinhar o conteúdo.

Não existe um "melhor": existe o mais adequado ao problema.

## Missão prática

Monte o **layout de página da base estelar** com `grid-template-areas`, com quatro áreas: `topo` (largura total), `radar` (coluna lateral esquerda), `painel` (conteúdo principal) e `rodape` (largura total). Em telas largas, o `radar` deve ter 220px; o `painel` ocupa o restante.

HTML:

```html
<div class="base-estelar">
  <header class="topo">Comando Central</header>
  <aside class="radar">Radar</aside>
  <main class="painel">Painel de operações</main>
  <footer class="rodape">Status da base</footer>
</div>
```

Uma possível solução:

```css
.base-estelar {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "topo   topo"
    "radar  painel"
    "rodape rodape";
  min-height: 100vh;
  gap: 8px;
}

.topo    { grid-area: topo;    background-color: #0b1d3a; color: #e3f2fd; padding: 16px; }
.radar   { grid-area: radar;   background-color: #263238; color: #eceff1; padding: 16px; }
.painel  { grid-area: painel;  background-color: #102a43; color: #e3f2fd; padding: 16px; }
.rodape  { grid-area: rodape;  background-color: #050816; color: #ffd54f; padding: 16px; }
```

Bônus: dentro de `.painel`, crie uma galeria de cartões com `repeat(auto-fit, minmax(180px, 1fr))` e use `display: flex` no `.topo` para alinhar o título e um menu.

## Resumo

- `display: grid` cria um contêiner bidimensional; `grid-template-columns` e `grid-template-rows` definem as faixas.
- `fr` divide o espaço livre; `repeat()` e `minmax()` tornam a grade concisa e flexível.
- Itens são posicionados por linhas (`grid-column`, `grid-row`, `span`) ou por áreas nomeadas (`grid-template-areas`, `grid-area`).
- `justify-items`, `align-items` e `place-items` alinham dentro das células; `justify-content` e `align-content` alinham a grade inteira.
- `repeat(auto-fit, minmax(...))` cria galerias responsivas sem media queries.
- Grid e Flexbox se complementam.

No Capítulo 7 você aprenderá o **posicionamento**: como fixar, sobrepor e deslocar elementos como painéis flutuantes de uma nave.
