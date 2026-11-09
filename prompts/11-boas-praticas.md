# Prompt 11: Boas práticas

## Objetivo

Gerar o Capítulo 11 do e-book, que reúne as boas práticas de CSS: organização de arquivos, nomenclatura (como BEM), especificidade e cascata, reaproveitamento, reset e normalização, acessibilidade (contraste, foco visível), desempenho e legibilidade. O leitor deve aprender a escrever CSS fácil de manter e de revisar em equipe.

## Contexto

O e-book "CSS na Galáxia" ensina CSS com narrativa e exemplos inspirados em Star Wars. Os capítulos 1 a 10 cobriram introdução, seletores, modelo de caixa, cores e tipografia, Flexbox, Grid, posicionamento, transições e animações, responsividade e variáveis CSS. O leitor já domina as ferramentas e precisa de disciplina para usá-las em projetos maiores.

Nesta missão, o leitor organiza o arquivo de estilos de uma base estelar que cresceu sem planejamento e virou uma "galáxia de seletores" difícil de manter. O projeto não tem afiliação com os detentores dos direitos de Star Wars. Use apenas nomes de classes e descrições genéricas, sem logotipos nem personagens protegidos.

## Papel da IA

Você é um(a) engenheiro(a) de front-end sênior e redator(a) técnico(a) de livros didáticos em português do Brasil. Faz revisão de código com empatia, mostra exemplos de "antes e depois" e justifica cada recomendação. Valida todo o código antes de apresentá-lo.

## Instruções

1. Escreva o capítulo em português do Brasil, com o título "Capítulo 11: Boas práticas".
2. Abra com uma narrativa curta (3 a 5 parágrafos) sobre uma base estelar cujo CSS virou um labirinto de regras conflitantes.
3. Explique organização de arquivos e ordem das regras (reset, variáveis, base, componentes, utilitários).
4. Explique nomenclatura de classes e apresente a convenção BEM com exemplos como `.nave`, `.nave__motor` e `.nave--danificada`.
5. Explique especificidade e cascata, com um exemplo de conflito e como resolvê-lo sem recorrer a `!important`.
6. Mostre exemplos de "antes e depois" de refatoração: seletores muito aninhados, repetição de valores, números mágicos.
7. Explique acessibilidade em CSS: contraste de cores, foco visível (`:focus-visible`), tamanhos de fonte relativos e respeito a `prefers-reduced-motion`.
8. Explique desempenho: evitar seletores excessivamente complexos, reduzir repetição e carregar o CSS de forma eficiente.
9. Explique comentários úteis e formatação consistente, e mencione ferramentas de apoio (linters e formatadores) sem exigir instalação.
10. Para cada prática, apresente exemplo CSS válido com tema Star Wars (`.sabre-de-luz`, `.nave`, `.holocron`) e explicação em português.
11. Inclua uma lista de verificação do capítulo e uma missão prática (exercício) com enunciado e dica.
12. Inclua uma imagem de abertura referenciada como `![Hangar organizado de uma base espacial com naves alinhadas e ferramentas etiquetadas, simbolizando código limpo](../assets/cap11-boas-praticas.png)`, com texto alternativo descritivo.
13. Não use nomes de personagens, logotipos ou marcas registradas, nem dados pessoais.

## Formato de saída esperado

Entregue somente o capítulo em Markdown, sem comentários fora do texto, seguindo a estrutura abaixo. Todo código CSS deve estar em bloco de três crases com a linguagem `css`.

````markdown
# Capítulo 11: Boas práticas

<narrativa de abertura>

![Hangar organizado de uma base espacial com naves alinhadas e ferramentas etiquetadas, simbolizando código limpo](../assets/cap11-boas-praticas.png)

## Organização dos estilos

## Nomenclatura com BEM

```css
.nave {
  display: flex;
}

.nave__motor {
  color: var(--cor-propulsor);
}

.nave--danificada {
  opacity: 0.7;
}
```

## Especificidade e cascata

## Antes e depois: refatorando

## Acessibilidade em CSS

## Desempenho

## Erros comuns

## Missão prática

## Resumo do capítulo
````

O capítulo deve ter ao menos um bloco ```css por prática apresentada, cada um com explicação em português, e a imagem `../assets/cap11-boas-praticas.png`.

## Critérios de qualidade

- [ ] O texto está em português do Brasil, com ortografia e gramática corretas.
- [ ] Organização, nomenclatura BEM, especificidade, acessibilidade e desempenho são abordados.
- [ ] Há ao menos um exemplo de "antes e depois" com explicação.
- [ ] Todo bloco de código usa a linguagem `css` e contém CSS válido.
- [ ] Os exemplos usam o tema Star Wars (`.sabre-de-luz`, `.nave`, `.holocron`) sem nomes protegidos.
- [ ] A imagem `../assets/cap11-boas-praticas.png` está referenciada com texto alternativo descritivo.
- [ ] As recomendações são justificadas, sem dogmatismo.
- [ ] Há uma missão prática com dica e um resumo final.
- [ ] Nenhum dado pessoal, segredo ou termo proibido aparece no texto.
- [ ] Cada exemplo foi testado em um navegador por um humano antes da publicação.
