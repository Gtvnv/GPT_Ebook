# Capítulo 3: Modelo de caixa

![Diagrama luminoso das camadas de uma caixa em torno de uma nave em um hangar](../assets/cap03-caixa.png)

## Cena de abertura: a nave que não cabe

O(a) aprendiz recebe uma nave nova e a leva ao hangar, mas ela fica entalada na porta. O engenheiro-chefe suspira: "Você somou a blindagem ao tamanho do casco? E a distância de segurança entre as naves?".

No CSS acontece o mesmo. Todo elemento é uma **caixa**, e o tamanho que ocupa na página depende de várias camadas. Entender essas camadas evita layouts que "estouram" e espaçamentos misteriosos.

## As camadas da caixa

Cada elemento tem quatro camadas, de dentro para fora:

- **content** (conteúdo): o texto, a imagem ou os filhos do elemento;
- **padding** (preenchimento): espaço entre o conteúdo e a borda, como o espaço de carga;
- **border** (borda): a moldura, como a blindagem do casco;
- **margin** (margem): espaço **fora** da borda, que separa o elemento dos vizinhos, como a distância de segurança.

```text
+-----------------------------------+
|              margin               |
|   +---------------------------+   |
|   |          border           |   |
|   |   +-------------------+   |   |
|   |   |      padding      |   |   |
|   |   |   +-----------+   |   |   |
|   |   |   |  content  |   |   |   |
|   |   |   +-----------+   |   |   |
|   |   +-------------------+   |   |
|   +---------------------------+   |
+-----------------------------------+
```

```css
.nave {
  width: 200px;
  padding: 20px;
  border: 5px solid #455a64;
  margin: 16px;
}
```

Explicação: o conteúdo mede 200px de largura. Ao redor dele há 20px de padding, 5px de borda e 16px de margem, em cada lado.

## O `box-sizing`

Por padrão (`content-box`), `width` e `height` medem **só o conteúdo**. Padding e borda são somados por fora.

Cálculo da largura ocupada pela `.nave` acima, sem contar a margem:

- conteúdo: 200px
- padding: 20px + 20px = 40px
- borda: 5px + 5px = 10px
- **total: 200 + 40 + 10 = 250px**

Com `box-sizing: border-box`, `width` passa a incluir padding e borda:

```css
.nave {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid #455a64;
  margin: 16px auto;
}
```

Agora a largura total continua **200px**, e o conteúdo útil encolhe para 200 − 40 − 10 = **150px**. É muito mais previsível, e por isso se recomenda este reset no início de quase todo projeto:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

## Atalhos de `margin` e `padding`

Ambas aceitam de um a quatro valores:

```css
.holocron {
  padding: 10px;                /* 1 valor: os 4 lados */
  margin: 10px 20px;            /* 2 valores: vertical | horizontal */
}

.painel-de-controle {
  padding: 5px 10px 15px;       /* 3 valores: topo | laterais | base */
  margin: 1px 2px 3px 4px;      /* 4 valores: topo | direita | base | esquerda */
}
```

Para lembrar a ordem de quatro valores, pense no sentido horário: topo, direita, base, esquerda.

Para centralizar horizontalmente um bloco com largura definida, use `margin: 0 auto`:

```css
.hangar {
  width: 600px;
  margin: 0 auto;
}
```

As margens laterais `auto` dividem igualmente o espaço que sobra, deixando o `.hangar` no centro.

## Colapso de margens

Quando as margens **verticais** de dois blocos irmãos se encontram, elas não se somam: prevalece a **maior**.

```css
.nave-a {
  margin-bottom: 30px;
}

.nave-b {
  margin-top: 20px;
}
```

A distância entre `.nave-a` e `.nave-b` será de **30px**, não 50px. Margens horizontais nunca colapsam.

Para evitar o colapso quando ele atrapalha, você pode usar `padding` ou `border` no pai, criar um contexto de layout com `display: flow-root` no pai ou, de forma mais simples, definir o espaçamento só de um lado (por exemplo, sempre `margin-bottom`).

## Tipos de `display`

O valor de `display` define como a caixa se comporta:

```css
.bloco {
  display: block;
  width: 300px;
  height: 80px;
}

.em-linha {
  display: inline;
  width: 300px;   /* ignorado */
  height: 80px;   /* ignorado */
}

.em-linha-bloco {
  display: inline-block;
  width: 300px;
  height: 80px;
}
```

Explicação:

- `block` ocupa a linha inteira, começa em linha nova e respeita `width`, `height`, `margin` e `padding`. É o padrão de `<div>`, `<p>` e `<h1>`.
- `inline` flui junto com o texto, não aceita `width` nem `height`, e margens/padding verticais não afastam as linhas vizinhas. É o padrão de `<span>` e `<a>`.
- `inline-block` flui na linha como `inline`, mas aceita dimensões como `block`.

## Overflow

Quando o conteúdo é maior que a caixa, o `overflow` decide o que fazer:

```css
.painel-de-controle {
  width: 240px;
  height: 100px;
  padding: 8px;
  border: 2px solid #29b6f6;
  overflow: auto;
}
```

Valores principais:

- `visible` (padrão): o conteúdo extra transborda e aparece fora da caixa;
- `hidden`: o excesso é cortado;
- `scroll`: sempre mostra barras de rolagem;
- `auto`: mostra barras somente quando necessário.

Com `overflow: auto`, um `.painel-de-controle` com muito texto ganha rolagem vertical e mantém o tamanho do layout.

## Missão prática

Construa um cartão `.holocron` com as seguintes medidas:

- largura total de **300px** (incluindo padding e borda);
- padding de **24px**;
- borda de **4px**;
- margem de **20px** automática nas laterais e 20px em cima e embaixo.

Uma possível solução:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.holocron {
  width: 300px;
  padding: 24px;
  border: 4px solid #29b6f6;
  margin: 20px auto;
  background-color: #0b1d3a;
  color: #e3f2fd;
}
```

Confira os números antes de abrir o navegador: com `border-box`, o conteúdo mede 300 − (24 × 2) − (4 × 2) = **244px**. Depois abra as ferramentas do navegador (tecla F12), inspecione o elemento e veja o diagrama do modelo de caixa na aba de estilos. Os valores devem bater com a sua conta. Teste também trocar para `content-box` e observe a largura total subir para 356px.

## Resumo

- Todo elemento é uma caixa com **content**, **padding**, **border** e **margin**.
- Com `content-box`, a largura soma padding e borda; com `border-box`, elas ficam dentro da largura. Prefira `border-box`.
- Os atalhos de `margin` e `padding` aceitam 1 a 4 valores; `margin: 0 auto` centraliza blocos com largura.
- Margens verticais adjacentes **colapsam** para a maior.
- `block`, `inline` e `inline-block` mudam como a caixa ocupa espaço e se `width`/`height` valem.
- `overflow` controla o conteúdo que não cabe.

No Capítulo 4 vamos pintar essas caixas e dar voz aos letreiros: **cores e tipografia**.
