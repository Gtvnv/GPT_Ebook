# Capítulo 5: Layout com Flexbox

![Frota de naves espaciais genéricas alinhadas em formação sobre um planeta desértico](../assets/cap05-flexbox.png)

## Cena de abertura: a frota desorganizada

A ordem de decolagem chegou, mas a frota está espalhada pelo hangar. Cada nave ocupa uma linha inteira, uma embaixo da outra, e ninguém consegue voar em formação. Isso acontece porque, por padrão, elementos de bloco empilham-se verticalmente.

O **Flexbox** é a ferramenta que organiza a formação: alinha, distribui e reordena itens em **uma dimensão** (linha ou coluna), de forma flexível ao espaço disponível.

## Introdução ao flex

HTML de apoio, usado em todo o capítulo:

```html
<div class="frota">
  <div class="nave">1</div>
  <div class="nave">2</div>
  <div class="nave">3</div>
  <div class="nave">4</div>
  <div class="nave">5</div>
</div>
```

Estilo básico das naves, para vermos as caixas:

```css
.nave {
  padding: 16px;
  background-color: #263238;
  color: #eceff1;
  border: 2px solid #29b6f6;
}
```

Sem `display: flex`, as cinco naves se empilham uma abaixo da outra. Agora transforme o pai em um **contêiner flex**:

```css
.frota {
  display: flex;
}
```

Explicação: `.frota` vira o contêiner flex e as `.nave` filhas diretas viram **itens flex**. De repente, elas ficam lado a lado, na mesma linha, cada uma com a largura do seu conteúdo. Só os filhos diretos participam do flex.

## Eixos

Todo contêiner flex tem dois eixos:

- **eixo principal**: a direção em que os itens fluem (por padrão, horizontal, da esquerda para a direita);
- **eixo transversal**: perpendicular ao principal (por padrão, vertical).

A propriedade `flex-direction` define o eixo principal:

```css
.frota {
  display: flex;
  flex-direction: row;            /* padrão: principal horizontal */
}

.frota-vertical {
  display: flex;
  flex-direction: column;         /* principal vertical */
}
```

```text
row (padrão)                     column
principal  ------------->        principal
+---+---+---+                    |  +---+
| 1 | 2 | 3 |  transversal       v  | 1 |
+---+---+---+  (para baixo)         | 2 |
                                    | 3 |
                                    +---+
                                    transversal ---> (para o lado)
```

Os valores `row-reverse` e `column-reverse` invertem o sentido. Ao mudar para `column`, os papéis dos eixos trocam: `justify-content` passa a agir na vertical e `align-items` na horizontal.

## Alinhamento

`justify-content` distribui os itens ao longo do **eixo principal**:

```css
.frota {
  display: flex;
  justify-content: space-between;
}
```

Valores comuns: `flex-start` (início, padrão), `center`, `flex-end`, `space-between` (espaço apenas entre os itens, com as pontas coladas nas bordas), `space-around` (espaço igual ao redor de cada item) e `space-evenly` (espaços totalmente iguais). Com `space-between`, a primeira nave encosta na esquerda, a última na direita, e as outras se espalham no meio.

`align-items` alinha os itens no **eixo transversal**:

```css
.frota {
  display: flex;
  align-items: center;
  height: 200px;
}
```

Valores comuns: `stretch` (padrão: os itens esticam até a altura do contêiner), `flex-start`, `center` e `flex-end`. Com `height: 200px` e `center`, as naves ficam centralizadas verticalmente na faixa de 200px.

## Quebra de linha e espaçamento

Por padrão, os itens tentam caber em uma linha e podem encolher. `flex-wrap: wrap` permite quebrar para a linha de baixo. `gap` cria espaço entre os itens sem precisar de margens.

```css
.frota {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.nave {
  width: 180px;
}
```

Em uma tela estreita, as naves que não cabem passam para a linha seguinte, sempre com 16px entre si.

Quando há mais de uma linha, `align-content` distribui as **linhas** no eixo transversal (precisa de altura extra no contêiner). Já `align-self` age em **um item** e substitui o `align-items` do pai:

```css
.frota {
  display: flex;
  align-items: flex-start;
}

.nave-lider {
  align-self: flex-end;
}
```

Todas as naves se alinham ao topo, exceto a `.nave-lider`, que vai para a base.

## Crescimento e encolhimento

Três propriedades controlam como cada item usa o espaço:

- `flex-grow`: quanto ele cresce para ocupar espaço livre (padrão 0);
- `flex-shrink`: quanto encolhe quando falta espaço (padrão 1);
- `flex-basis`: tamanho inicial no eixo principal, antes de crescer ou encolher (padrão `auto`).

A abreviação `flex` reúne as três. `flex: 1` equivale a `flex: 1 1 0%`.

```css
.frota {
  display: flex;
  gap: 8px;
}

.nave-pequena {
  flex: 1;
}

.nave-media {
  flex: 2;
}

.nave-grande {
  flex: 3;
}
```

Explicação: o espaço disponível é dividido na proporção 1:2:3. Se a faixa tem 600px livres (descontando os `gap`), a nave pequena ganha 100px, a média 200px e a grande 300px. Isso porque 1 + 2 + 3 = 6 partes, e cada parte vale 100px. Use também `order` para mudar a ordem visual sem mexer no HTML (por exemplo, `order: -1` leva um item ao início).

Resumo das propriedades:

| Aplica-se a | Propriedade | Função |
|---|---|---|
| Contêiner | `display: flex` | Cria o contêiner flex |
| Contêiner | `flex-direction` | Define o eixo principal |
| Contêiner | `flex-wrap` | Permite quebra de linha |
| Contêiner | `justify-content` | Distribui no eixo principal |
| Contêiner | `align-items` | Alinha no eixo transversal |
| Contêiner | `align-content` | Distribui várias linhas |
| Contêiner | `gap` | Espaço entre itens |
| Item | `flex-grow` / `flex-shrink` / `flex-basis` | Crescer, encolher, tamanho base |
| Item | `flex` | Abreviação das três anteriores |
| Item | `align-self` | Alinhamento individual |
| Item | `order` | Ordem visual |

## Receitas práticas

### Barra de navegação

```html
<nav class="barra">
  <a class="marca" href="#">Base Estelar</a>
  <a href="#">Missões</a>
  <a href="#">Frota</a>
</nav>
```

```css
.barra {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  background-color: #0b1d3a;
}

.barra a {
  color: #e3f2fd;
  text-decoration: none;
}

.marca {
  margin-right: auto;
  font-weight: 700;
}
```

Eixo principal: horizontal. `align-items: center` alinha os links na vertical. A mágica está em `margin-right: auto` na marca: no flex, a margem automática absorve todo o espaço livre, empurrando os demais links para a direita.

### Centralização total de um holocron

```css
.tela {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.holocron {
  padding: 24px;
  background-color: #0b1d3a;
  color: #e3f2fd;
}
```

O `.holocron` fica no centro exato da tela: `justify-content` centraliza no eixo principal (horizontal) e `align-items` no transversal (vertical). `min-height: 100vh` faz a `.tela` ocupar a altura total da janela.

### Cartões que quebram de linha

```css
.cartoes {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.cartao {
  flex: 1 1 220px;
  padding: 16px;
  background-color: #263238;
  color: #eceff1;
}
```

Cada cartão tenta ter 220px (`flex-basis`), cresce para dividir o espaço sobrando (`flex-grow: 1`) e pode encolher. Quando a linha enche, os cartões excedentes quebram para a próxima.

## Missão prática

Monte a **barra de navegação do painel de comando**: um logo à esquerda e três links à direita, tudo alinhado verticalmente ao centro, com 20px de espaço entre os links.

HTML:

```html
<header class="painel-de-comando">
  <span class="logo">Comando Estelar</span>
  <nav class="links">
    <a href="#">Mapa</a>
    <a href="#">Frota</a>
    <a href="#">Registros</a>
  </nav>
</header>
```

Uma possível solução:

```css
.painel-de-comando {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #050816;
  color: #ffd54f;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  color: #e3f2fd;
  text-decoration: none;
}
```

Explicação: o `header` é um contêiner flex com `space-between`, que afasta o logo (esquerda) do `nav` (direita). O `nav` é, ele mesmo, outro contêiner flex para organizar os links com `gap`. É perfeitamente normal aninhar contêineres flex. Teste redimensionando a janela.

## Resumo

- `display: flex` cria o contêiner; os filhos diretos viram itens.
- O **eixo principal** é definido por `flex-direction`; o **transversal** é perpendicular a ele.
- `justify-content` age no eixo principal; `align-items`, `align-content` e `align-self` agem no transversal.
- `flex-wrap` e `gap` controlam quebra e espaçamento.
- `flex-grow`, `flex-shrink` e `flex-basis` (ou apenas `flex`) distribuem o espaço entre os itens.

O Flexbox é ótimo para uma dimensão. No Capítulo 6 vamos conhecer o **Grid**, que organiza linhas e colunas ao mesmo tempo.
