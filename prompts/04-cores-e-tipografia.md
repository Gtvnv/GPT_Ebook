# Prompt 04: Cores e tipografia

## Objetivo

Gerar o Capítulo 4 do e-book, que ensina cores e tipografia em CSS: formatos de cor (nomes, hexadecimal, `rgb()`, `hsl()`, transparência), `background` (cor, imagem, gradientes), contraste e acessibilidade, `font-family` e pilhas de fontes, `font-size` (`px`, `rem`, `em`), `font-weight`, `line-height`, `letter-spacing`, `text-align`, `text-transform` e uso de web fonts com `@font-face` ou `@import`. O leitor deve criar uma identidade visual legível e acessível.

## Contexto

Este é o quarto capítulo do e-book de CSS com tema Star Wars. Os capítulos anteriores cobriram sintaxe, seletores e modelo de caixa. Agora o(a) aprendiz dá vida visual ao projeto, como quem pinta e identifica uma frota: o lado luminoso usa azuis e verdes, o lado sombrio usa vermelhos e pretos. Os exemplos usam `.sabre-de-luz`, `.nave`, `.holocron` e `.letreiro` (um letreiro em estilo de abertura de filme, sem reproduzir logotipos ou marcas). Use apenas fontes livres ou do sistema.

## Papel da IA

Você é um(a) mestre Jedi do CSS e designer front-end com atenção a acessibilidade. Escreve em português do Brasil, explica o porquê das escolhas de cor e fonte e alerta sobre contraste insuficiente.

## Instruções

1. Abra com uma cena curta em que o(a) aprendiz precisa distinguir naves aliadas e inimigas apenas pelas cores e pela legibilidade dos letreiros.
2. Explique os formatos de cor (nome, hex, `rgb()`, `rgba()`, `hsl()`) com a mesma cor azul do `.sabre-de-luz` escrita de cada forma.
3. Mostre `background-color`, `background-image` e gradientes (`linear-gradient`, `radial-gradient`) criando o brilho de um sabre e um céu estrelado simples.
4. Explique contraste e acessibilidade, citando a razão mínima de contraste recomendada pelas diretrizes de acessibilidade web (WCAG) para texto comum, e mostre um exemplo ruim e um bom.
5. Explique `font-family` com pilha de fontes e fallback, e `@font-face` com um exemplo genérico.
6. Explique unidades de fonte (`px`, `em`, `rem`) e `line-height` sem unidade, com recomendação de uso.
7. Explique `text-align`, `text-transform`, `letter-spacing` e `text-shadow` criando o `.letreiro`.
8. Todos os exemplos devem ser CSS válido, testável em navegador, e vir acompanhados de explicação em português.
9. Inclua uma "Missão prática": criar um cartão de personagem genérico com título, subtítulo e texto, com contraste adequado.
10. Solicite e posicione uma imagem referenciada como `../assets/cap04-tipografia.png`, com texto alternativo descritivo (por exemplo, "Letreiro dourado em perspectiva sobre um fundo estrelado e uma paleta de cores azul e vermelha").
11. Termine com um resumo e uma ponte para o Capítulo 5 (Flexbox).

## Formato de saída esperado

Entregue um único arquivo Markdown em português, pronto para salvar em `ebook/04-cores-e-tipografia.md`, com:

- Título de nível 1 no formato "Capítulo 4: Cores e tipografia".
- Seções de nível 2 para a cena de abertura, formatos de cor, fundos e gradientes, contraste, fontes, unidades, efeitos de texto, missão prática e resumo.
- Pelo menos um bloco de código com a linguagem `css` (mínimo de cinco ao longo do capítulo).
- Uma tabela Markdown comparando formatos de cor ou unidades de fonte.
- Uma imagem com a sintaxe `![texto alternativo descritivo](../assets/cap04-tipografia.png)`.

Exemplo do formato esperado de um trecho:

````markdown
```css
.sabre-de-luz {
  background: linear-gradient(90deg, #e3f2fd, #29b6f6);
  color: hsl(200 90% 20%);
  box-shadow: 0 0 12px #29b6f6;
}
```

O gradiente cria o núcleo claro do sabre, a cor `hsl` garante texto escuro
legível sobre ele e `box-shadow` produz o brilho ao redor.
````

Não inclua texto fora do conteúdo do capítulo.

## Critérios de qualidade

- [ ] O texto está em português do Brasil e sem erros de gramática.
- [ ] O tema Star Wars aparece na narrativa e nos exemplos (`.sabre-de-luz`, `.nave`, `.letreiro`), sem logotipos ou marcas protegidas.
- [ ] Há pelo menos um bloco ```css e toda a sintaxe de cor e fonte é válida.
- [ ] O capítulo trata de contraste e acessibilidade com exemplos bom e ruim.
- [ ] Cada exemplo é seguido de explicação em português.
- [ ] A imagem `../assets/cap04-tipografia.png` está referenciada com texto alternativo descritivo.
- [ ] Há uma missão prática (exercício) e um resumo.
- [ ] Não há termos proibidos pelo projeto.
