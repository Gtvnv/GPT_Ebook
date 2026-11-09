# Capítulo 1: Introdução ao CSS

![Holocron azul brilhando sobre uma mesa em uma sala escura de uma base espacial](../assets/cap01-introducao.png)

## A descoberta do holocron

Em uma base esquecida, entre painéis apagados e cabos soltos, um(a) jovem aprendiz tropeça em uma caixa metálica. Ao tocá-la, o objeto se abre e projeta no ar um cubo de luz azul: é um holocron antigo, guardado por gerações de mestres.

Uma voz sintética ecoa na sala: "Quem dominar a Força da Estilização transformará estruturas frias em interfaces vivas". O(a) aprendiz não sabe o que isso significa, mas percebe que a página web diante dele(a) é só um casco cinzento, sem cor, sem forma e sem personalidade.

Essa Força tem um nome real: **CSS**. Neste capítulo você vai abrir o holocron, entender o que é o CSS e escrever sua primeira regra.

## O que é CSS

**CSS** significa *Cascading Style Sheets*, ou "folhas de estilo em cascata". É a linguagem que descreve a **apresentação** de um documento: cores, fontes, espaçamentos, posições e animações.

O **HTML** cuida da **estrutura** e do significado do conteúdo (títulos, parágrafos, listas, imagens). O CSS cuida da aparência. Pense em uma nave:

- o casco, os módulos e os compartimentos são o HTML;
- a pintura, os painéis luminosos e os acabamentos são o CSS.

Separar as duas coisas traz vantagens práticas: você muda o visual do site inteiro sem tocar no conteúdo, reaproveita o mesmo estilo em várias páginas e mantém o código organizado.

## Anatomia de uma regra

Toda regra CSS tem duas partes: o **seletor**, que diz *quem* será estilizado, e o **bloco de declarações**, que diz *como*. Cada declaração é um par **propriedade: valor** terminado por ponto e vírgula.

```css
.sabre-de-luz {
  color: #4fc3f7;
  font-weight: bold;
}
```

Explicação:

- `.sabre-de-luz` é o seletor. O ponto indica uma **classe**: a regra vale para todo elemento com `class="sabre-de-luz"`.
- `color: #4fc3f7;` define a cor do texto como um azul claro (valor hexadecimal).
- `font-weight: bold;` deixa o texto em negrito.
- As chaves `{ }` delimitam o bloco de declarações.

Para usar a regra, o HTML precisa ter um elemento com essa classe:

```html
<p class="sabre-de-luz">Ative o sabre!</p>
```

Os nomes de classes podem ser escolhidos por você. Use sempre minúsculas e hífens para separar palavras, como em `sabre-de-luz`.

## Formas de aplicar CSS

Existem três maneiras de ligar estilos a uma página.

### 1. Estilo inline

O CSS vai direto no atributo `style` do elemento:

```html
<p style="color: #4fc3f7;">Texto azul</p>
```

Funciona, mas mistura estrutura e apresentação e não pode ser reaproveitado. Use apenas em testes rápidos.

### 2. Tag `<style>`

O CSS fica dentro do `<head>` da própria página:

```html
<head>
  <style>
    .nave {
      color: #90a4ae;
    }
  </style>
</head>
```

É útil em páginas únicas ou protótipos, mas o estilo não é compartilhado com outras páginas.

### 3. Arquivo externo

O CSS vive em um arquivo `.css` separado, ligado pela tag `<link>`:

```html
<head>
  <link rel="stylesheet" href="estilos.css">
</head>
```

```css
/* conteúdo de estilos.css */
.holocron {
  background-color: #0d47a1;
  color: white;
}
```

Esta é a forma **recomendada**: o mesmo arquivo serve a todas as páginas, o navegador pode guardá-lo em cache e o projeto fica organizado.

## Cascata e herança

A palavra "cascata" no nome do CSS indica que várias regras podem atingir o mesmo elemento e o navegador precisa decidir qual vence. Em linhas gerais, ele considera a **especificidade** do seletor (você a verá no Capítulo 2), a **ordem** das regras (a última vence, em caso de empate) e a **origem** do estilo.

Há também a **herança**: algumas propriedades, como `color`, `font-family` e `line-height`, passam automaticamente do elemento pai para os filhos.

```html
<div class="nave">
  <p>Painel principal</p>
  <p>Painel secundário</p>
</div>
```

```css
.nave {
  color: #cfd8dc;
  font-family: Arial, sans-serif;
}
```

Explicação: a cor e a fonte foram definidas apenas em `.nave`, mas os dois parágrafos também ficam cinza-claros e em Arial, porque herdam essas propriedades do pai. Já propriedades como `border` e `margin` **não** são herdadas: se você coloca uma borda na `.nave`, os parágrafos não ganham borda.

## Missão prática

Estilize um cartão `.holocron`.

1. Crie um arquivo `index.html` com este conteúdo:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Meu primeiro holocron</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <div class="holocron">
    <h1>Holocron</h1>
    <p>Os segredos do CSS estão guardados aqui.</p>
  </div>
</body>
</html>
```

2. Crie o arquivo `estilos.css` ao lado dele, com uma regra para `.holocron` que defina:
   - cor de fundo escura (`background-color`);
   - cor de texto clara (`color`);
   - uma borda azul de 2px (`border`);
   - um respiro interno (`padding`).

3. Abra o HTML no navegador e confira o resultado. Uma possível solução:

```css
.holocron {
  background-color: #0b1d3a;
  color: #e3f2fd;
  border: 2px solid #29b6f6;
  padding: 16px;
}
```

Explicação: `background-color` pinta o fundo, `color` ajusta o texto, `border` desenha a moldura (espessura, estilo e cor) e `padding` afasta o conteúdo da borda. Experimente trocar as cores e atualizar a página.

## Resumo

- CSS descreve a **aparência**; HTML descreve a **estrutura**.
- Uma regra tem **seletor** e **declarações** no formato `propriedade: valor;`.
- O CSS pode ser aplicado de forma **inline**, com `<style>` ou em **arquivo externo**; o arquivo externo é o mais recomendado.
- A **cascata** decide qual regra vence e a **herança** repassa certas propriedades do pai para os filhos.

No próximo capítulo você aprenderá a escolher exatamente quem estilizar, usando os **seletores**: a mira do seu painel de comando.
