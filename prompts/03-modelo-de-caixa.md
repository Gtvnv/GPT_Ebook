# Prompt 03: Modelo de caixa

## Objetivo

Gerar o Capítulo 3 do e-book, que explica o modelo de caixa (box model) do CSS: content, padding, border e margin; as propriedades `width`, `height`, `box-sizing`; o colapso de margens; as diferenças entre `display: block`, `inline` e `inline-block`; e o uso de `overflow`. O leitor deve conseguir calcular o tamanho real de um elemento e controlar espaçamentos.

## Contexto

Este é o terceiro capítulo do e-book de CSS com tema Star Wars. Nos capítulos anteriores o(a) aprendiz conheceu a sintaxe do CSS e os seletores. Agora ele(a) aprende que todo elemento é uma "caixa" e que ela tem camadas, como o casco de uma nave com blindagem, espaço de carga e distância de segurança entre naves. Os exemplos usam `.nave`, `.holocron`, `.painel-de-controle` e `.sabre-de-luz`, com nomes genéricos e sem marcas protegidas.

## Papel da IA

Você é um(a) mestre Jedi do CSS e instrutor(a) de front-end com foco em layout. Escreve em português do Brasil, usa analogias visuais (camadas de blindagem, distância entre naves) e confere cada cálculo de tamanho antes de apresentá-lo.

## Instruções

1. Abra com uma cena curta em que uma nave não cabe no hangar por causa de blindagem e espaçamento mal calculados.
2. Explique as quatro camadas do modelo de caixa (content, padding, border, margin) com um diagrama em texto e um exemplo para `.nave`.
3. Compare `box-sizing: content-box` e `border-box` com um cálculo numérico passo a passo (por exemplo, largura de 200px com padding de 20px e borda de 5px) e recomende o reset `*, *::before, *::after { box-sizing: border-box; }`.
4. Explique atalhos de `margin` e `padding` (1, 2, 3 e 4 valores) e `margin: 0 auto` para centralizar.
5. Explique o colapso de margens verticais com um exemplo e como evitá-lo.
6. Compare `block`, `inline` e `inline-block` e mostre o efeito de `width` e `height` em cada um.
7. Explique `overflow` (`visible`, `hidden`, `auto`, `scroll`) com um exemplo de `.painel-de-controle` com muito texto.
8. Todos os exemplos devem ser CSS válido, testável em navegador, e vir acompanhados de explicação em português. Quando houver cálculo, mostre as contas.
9. Inclua uma "Missão prática": construir um cartão `.holocron` com medidas definidas e conferir o tamanho final nas ferramentas do navegador.
10. Solicite e posicione uma imagem referenciada como `../assets/cap03-caixa.png`, com texto alternativo descritivo (por exemplo, "Diagrama luminoso das camadas de uma caixa em torno de uma nave em um hangar").
11. Termine com um resumo e uma ponte para o Capítulo 4 (Cores e tipografia).

## Formato de saída esperado

Entregue um único arquivo Markdown em português, pronto para salvar em `ebook/03-modelo-de-caixa.md`, com:

- Título de nível 1 no formato "Capítulo 3: Modelo de caixa".
- Seções de nível 2 para a cena de abertura, as camadas da caixa, `box-sizing`, atalhos, colapso de margens, tipos de `display`, `overflow`, missão prática e resumo.
- Pelo menos um bloco de código com a linguagem `css` (mínimo de cinco ao longo do capítulo).
- Um diagrama em texto do modelo de caixa dentro de bloco de código sem linguagem ou com `text`.
- Uma imagem com a sintaxe `![texto alternativo descritivo](../assets/cap03-caixa.png)`.

Exemplo do formato esperado de um trecho:

````markdown
```css
.nave {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid #455a64;
  margin: 16px auto;
}
```

Com `border-box`, a largura total continua 200px: o padding e a borda
ficam dentro dela, e o conteúdo útil mede 150px.
````

Não inclua texto fora do conteúdo do capítulo.

## Critérios de qualidade

- [ ] O texto está em português do Brasil e sem erros de gramática.
- [ ] O tema Star Wars aparece na narrativa e nos exemplos (`.nave`, `.holocron`, `.painel-de-controle`).
- [ ] Há pelo menos um bloco ```css e todas as propriedades usadas existem e estão corretas.
- [ ] Os cálculos de tamanho estão corretos e mostrados passo a passo.
- [ ] Cada exemplo é seguido de explicação em português.
- [ ] A imagem `../assets/cap03-caixa.png` está referenciada com texto alternativo descritivo.
- [ ] Há uma missão prática (exercício) e um resumo.
- [ ] Não há termos proibidos pelo projeto.
