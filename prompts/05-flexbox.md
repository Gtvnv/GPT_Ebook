# Prompt 05: Layout com Flexbox

## Objetivo

Gerar o Capítulo 5 do e-book, que ensina o layout com Flexbox: contêiner e itens flex, `display: flex`, eixo principal e eixo transversal, `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `align-content`, `align-self`, `gap`, `order` e a abreviação `flex` (`flex-grow`, `flex-shrink`, `flex-basis`). O leitor deve montar barras de navegação, cartões em linha e centralizações com confiança.

## Contexto

Este é o quinto capítulo do e-book de CSS com tema Star Wars. Os capítulos anteriores cobriram sintaxe, seletores, modelo de caixa, cores e tipografia. Agora o(a) aprendiz precisa organizar uma frota em formação: alinhar, distribuir e reordenar naves no espaço disponível. Os exemplos usam `.frota` como contêiner flex, `.nave` como itens, além de `.painel-de-controle` e `.holocron`, com nomes genéricos e sem marcas protegidas.

## Papel da IA

Você é um(a) mestre Jedi do CSS e instrutor(a) de layout. Escreve em português do Brasil, descreve sempre qual é o eixo principal e qual é o transversal em cada exemplo, e usa analogias de formações de voo.

## Instruções

1. Abra com uma cena curta em que uma frota de naves precisa se alinhar em formação, mas continua desorganizada com `display: block`.
2. Mostre o HTML de apoio (`.frota` com cinco `.nave`) e o efeito de aplicar `display: flex`.
3. Explique os eixos principal e transversal e como `flex-direction` os inverte, com um diagrama em texto.
4. Explique `justify-content` (`flex-start`, `center`, `space-between`, `space-around`, `space-evenly`) e `align-items` (`stretch`, `center`, `flex-start`, `flex-end`), cada um com exemplo curto.
5. Explique `flex-wrap`, `gap`, `align-content` e `align-self`.
6. Explique `flex-grow`, `flex-shrink`, `flex-basis` e a abreviação `flex: 1`, com um exemplo de três naves de proporções diferentes.
7. Mostre três receitas práticas: barra de navegação, centralização total de um `.holocron` na tela e cartões que quebram de linha.
8. Todos os exemplos devem ser CSS válido, testável em navegador, e vir acompanhados de explicação em português indicando o que muda visualmente.
9. Inclua uma "Missão prática": montar uma barra de navegação do painel de comando com logo à esquerda e links à direita.
10. Solicite e posicione uma imagem referenciada como `../assets/cap05-flexbox.png`, com texto alternativo descritivo (por exemplo, "Frota de naves espaciais genéricas alinhadas em formação sobre um planeta desértico").
11. Termine com um resumo e uma ponte para o Capítulo 6 (Grid).

## Formato de saída esperado

Entregue um único arquivo Markdown em português, pronto para salvar em `ebook/05-flexbox.md`, com:

- Título de nível 1 no formato "Capítulo 5: Layout com Flexbox".
- Seções de nível 2 para a cena de abertura, introdução ao flex, eixos, alinhamento, quebra e espaçamento, crescimento e encolhimento, receitas, missão prática e resumo.
- Pelo menos um bloco de código com a linguagem `css` (mínimo de seis ao longo do capítulo) e blocos `html` para o HTML de apoio.
- Uma tabela Markdown resumindo as propriedades do contêiner e dos itens.
- Uma imagem com a sintaxe `![texto alternativo descritivo](../assets/cap05-flexbox.png)`.

Exemplo do formato esperado de um trecho:

````markdown
```css
.frota {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
```

`display: flex` transforma `.frota` em contêiner flex. `justify-content`
distribui as naves no eixo principal e `align-items` as centraliza no transversal.
````

Não inclua texto fora do conteúdo do capítulo.

## Critérios de qualidade

- [ ] O texto está em português do Brasil e sem erros de gramática.
- [ ] O tema Star Wars aparece na narrativa e nos exemplos (`.frota`, `.nave`, `.holocron`).
- [ ] Há pelo menos um bloco ```css e todas as propriedades e valores flex são válidos.
- [ ] Cada exemplo indica qual é o eixo principal e o que muda visualmente.
- [ ] Cada exemplo é seguido de explicação em português.
- [ ] A imagem `../assets/cap05-flexbox.png` está referenciada com texto alternativo descritivo.
- [ ] Há uma missão prática (exercício) e um resumo.
- [ ] Não há termos proibidos pelo projeto.
