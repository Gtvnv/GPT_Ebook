# Capítulo 2: Seletores

![Painel de mira holográfico destacando uma nave entre várias em formação](../assets/cap02-seletores.png)

## Cena de abertura: escolher o alvo

O hangar está lotado. Dezenas de naves repousam lado a lado e o(a) aprendiz recebe uma ordem: "Pinte de dourado apenas a segunda nave da frota. As demais ficam como estão".

Se ele(a) pintar tudo o que vê, a frota inteira fica dourada. É preciso **mirar**. No CSS, a mira são os **seletores**: expressões que dizem exatamente quais elementos receberão um estilo.

## HTML de apoio

Usaremos este HTML em todos os exemplos do capítulo. Salve-o e acompanhe testando no navegador.

```html
<section class="frota" id="esquadrao-alfa">
  <article class="nave" data-tipo="caça">
    <h2>Nave 1</h2>
    <p class="sabre-de-luz">Sabre azul</p>
  </article>
  <article class="nave" data-tipo="cargueiro">
    <h2>Nave 2</h2>
    <p class="sabre-de-luz">Sabre verde</p>
    <p class="holocron">Mapa estelar</p>
  </article>
  <article class="nave" data-tipo="caça">
    <h2>Nave 3</h2>
    <p class="holocron">Registro de voo</p>
  </article>
</section>
```

## Seletores básicos

### Seletor de tipo

Seleciona todos os elementos de uma tag:

```css
h2 {
  color: #ffd54f;
}
```

Todos os `<h2>` da página ficam amarelos. É um seletor amplo e de baixa especificidade.

### Seletor de classe

Começa com ponto e seleciona qualquer elemento com aquela classe. Um elemento pode ter várias classes.

```css
.nave {
  border: 1px solid #78909c;
  padding: 8px;
}
```

Todas as três naves ganham borda e espaçamento interno.

### Seletor de id

Começa com `#`. O id deve ser **único** na página.

```css
#esquadrao-alfa {
  background-color: #0b1d3a;
}
```

Apenas a seção com `id="esquadrao-alfa"` recebe o fundo escuro. Prefira classes para estilizar; ids servem melhor como âncoras e identificadores únicos.

### Seletor universal

O asterisco seleciona todos os elementos:

```css
* {
  margin: 0;
}
```

Zera a margem de tudo. É comum em resets, mas use com moderação.

### Seletor de grupo

A vírgula aplica a mesma regra a vários seletores:

```css
h2,
.holocron {
  font-family: Arial, sans-serif;
}
```

Os títulos `h2` e os elementos `.holocron` recebem a mesma fonte, sem repetir código.

### Seletor de atributo

Seleciona elementos pelo valor de um atributo:

```css
[data-tipo="caça"] {
  border-color: #ef5350;
}

[data-tipo] {
  border-style: dashed;
}
```

A primeira regra atinge as naves cujo `data-tipo` é exatamente "caça". A segunda atinge qualquer elemento que **tenha** o atributo `data-tipo`, seja qual for o valor.

## Combinadores

Combinadores relacionam elementos pela posição na árvore do HTML. Observe a árvore da nossa frota:

```text
section.frota
├── article.nave (caça)
│   ├── h2
│   └── p.sabre-de-luz
├── article.nave (cargueiro)
│   ├── h2
│   ├── p.sabre-de-luz
│   └── p.holocron
└── article.nave (caça)
    ├── h2
    └── p.holocron
```

### Descendente (espaço)

```css
.frota .sabre-de-luz {
  color: #4fc3f7;
}
```

Seleciona todo `.sabre-de-luz` que esteja **dentro** de `.frota`, em qualquer nível.

### Filho direto (`>`)

```css
.frota > .nave {
  margin-bottom: 12px;
}
```

Seleciona apenas as `.nave` que são filhas **diretas** de `.frota`. Os `<p>` dentro das naves não seriam afetados por um `.frota > p`, pois são netos.

### Irmão adjacente (`+`)

```css
.sabre-de-luz + .holocron {
  color: #ffd54f;
}
```

Seleciona o `.holocron` que vem **imediatamente depois** de um `.sabre-de-luz`, com o mesmo pai. Na nave 2, o "Mapa estelar" fica dourado.

### Irmão geral (`~`)

```css
h2 ~ p {
  font-size: 0.9rem;
}
```

Seleciona todos os `<p>` que vêm depois de um `<h2>` e compartilham o mesmo pai, não importa quantos elementos existam entre eles.

## Pseudoclasses e pseudoelementos

**Pseudoclasses** (um dois-pontos) selecionam elementos por estado ou posição.

```css
.sabre-de-luz:hover {
  color: #ffffff;
  text-shadow: 0 0 8px #29b6f6;
}

.frota > .nave:first-child {
  border: 2px solid gold;
}

.frota > .nave:nth-child(2) {
  background-color: #fff8e1;
}

.nave:not([data-tipo="caça"]) {
  opacity: 0.85;
}
```

Explicação:

- `:hover` age quando o mouse passa sobre o sabre, criando um brilho.
- `:first-child` seleciona a nave que é a primeira filha de `.frota`.
- `:nth-child(2)` seleciona a segunda filha, e é a solução do exercício da abertura.
- `:not(...)` exclui os elementos que casam com o seletor interno: aqui, as naves que não são caças.

**Pseudoelementos** (dois dois-pontos) estilizam partes virtuais de um elemento.

```css
.holocron::before {
  content: "◆ ";
  color: #29b6f6;
}

.holocron::after {
  content: " (confidencial)";
  font-size: 0.8em;
}
```

`::before` insere conteúdo gerado antes do texto do holocron e `::after` insere depois. A propriedade `content` é obrigatória para que apareçam.

## Especificidade

Quando duas regras conflitam, vence a de maior **especificidade**. Pense nela como uma pontuação em quatro faixas, da mais forte para a mais fraca:

| Faixa | O que conta | Exemplo |
|---|---|---|
| 1 | Estilo inline | `style="..."` |
| 2 | Ids | `#esquadrao-alfa` |
| 3 | Classes, atributos e pseudoclasses | `.nave`, `[data-tipo]`, `:hover` |
| 4 | Tipos e pseudoelementos | `h2`, `::before` |

Compara-se faixa a faixa, da esquerda para a direita. Em caso de empate total, vence a regra declarada por último.

Exemplo de conflito resolvido passo a passo:

```css
p {
  color: gray;
}

.nave p {
  color: orange;
}

.nave .sabre-de-luz {
  color: blue;
}
```

Para o `<p class="sabre-de-luz">` dentro de uma `.nave`:

1. `p` vale (0, 0, 1): um tipo.
2. `.nave p` vale (0, 1, 1): uma classe e um tipo.
3. `.nave .sabre-de-luz` vale (0, 2, 0): duas classes.

Comparando: nenhuma regra tem id; a terceira tem duas classes contra uma das demais, então vence. O texto fica **azul**.

**Cuidado com `!important`.** Ele ignora a especificidade e vence quase tudo, o que torna o código difícil de manter e depurar. Reserve-o para casos raros e, se possível, resolva o conflito ajustando os seletores.

## Missão prática

Com o HTML de apoio, escreva seletores para estilizar **apenas a segunda nave** da frota (a do tipo cargueiro): fundo claro, borda dourada de 2px e título em cor escura. Não altere o HTML nem use ids novos.

Uma possível solução:

```css
.frota > .nave:nth-child(2) {
  background-color: #fff8e1;
  border: 2px solid gold;
}

.frota > .nave:nth-child(2) h2 {
  color: #3e2723;
}
```

Explicação: `:nth-child(2)` limita a regra à segunda filha de `.frota`; o segundo seletor usa o combinador descendente para alcançar o título dessa mesma nave. Como ambos têm especificidade maior que um simples `.nave`, o estilo prevalece sobre a regra geral das naves. Bônus: reescreva usando `[data-tipo="cargueiro"]` e compare.

## Resumo

- Seletores de **tipo**, **classe**, **id**, **universal**, **atributo** e **grupo** definem quem recebe o estilo.
- **Combinadores** (espaço, `>`, `+`, `~`) usam a relação entre elementos na árvore do HTML.
- **Pseudoclasses** (`:hover`, `:first-child`, `:nth-child()`, `:not()`) tratam estados e posições; **pseudoelementos** (`::before`, `::after`) criam partes virtuais.
- A **especificidade** decide conflitos; evite `!important`.

No Capítulo 3 você vai olhar para dentro de cada elemento e descobrir o **modelo de caixa**: as camadas de blindagem de toda nave da web.
