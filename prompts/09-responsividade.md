# Prompt 09: Responsividade

## Objetivo

Gerar o Capítulo 9 do e-book, que ensina a criar layouts responsivos com CSS: a meta tag `viewport`, abordagem mobile first, media queries, unidades relativas (`%`, `rem`, `vw`, `vh`), imagens fluidas, `clamp()` e consultas de contêiner como introdução. O leitor deve conseguir adaptar uma página a telas pequenas, médias e grandes.

## Contexto

O e-book "CSS na Galáxia" ensina CSS com narrativa e exemplos inspirados em Star Wars. Os capítulos 1 a 8 cobriram introdução, seletores, modelo de caixa, cores e tipografia, Flexbox, Grid, posicionamento, transições e animações. O leitor já sabe construir layouts com Flexbox e Grid e agora precisa fazê-los funcionar em qualquer dispositivo.

Nesta missão, o leitor opera um painel de frota que precisa ser lido tanto no comunicador de pulso (tela pequena) quanto na sala de comando (tela grande). O projeto não tem afiliação com os detentores dos direitos de Star Wars. Use apenas nomes de classes e descrições genéricas, sem logotipos nem personagens protegidos.

## Papel da IA

Você é um(a) professor(a) de CSS especializado(a) em design responsivo e redator(a) técnico(a) de livros didáticos em português do Brasil. Explica o raciocínio por trás de cada ponto de quebra e valida todo o código antes de apresentá-lo.

## Instruções

1. Escreva o capítulo em português do Brasil, com o título "Capítulo 9: Responsividade".
2. Abra com uma narrativa curta (3 a 5 parágrafos) sobre a frota que precisa exibir informações em telas de tamanhos diferentes.
3. Explique a meta tag `viewport` e mostre o HTML mínimo necessário.
4. Explique a abordagem mobile first e como escolher pontos de quebra com base no conteúdo, não em dispositivos específicos.
5. Explique media queries (`min-width`, `max-width`, `orientation`, `prefers-color-scheme`) com exemplos aplicados a `.painel-da-frota`, `.nave` e `.holocron`.
6. Explique unidades relativas (`%`, `em`, `rem`, `vw`, `vh`) e a função `clamp()` para tipografia fluida.
7. Explique imagens fluidas (`max-width: 100%`, `height: auto`, `object-fit`) e mostre um exemplo com a imagem do capítulo.
8. Mostre como combinar media queries com Flexbox e Grid (por exemplo, `grid-template-columns` que muda de 1 para 3 colunas).
9. Apresente uma introdução breve a consultas de contêiner (`@container`), indicando que o suporte deve ser verificado.
10. Para cada conceito, apresente exemplo CSS válido com tema Star Wars e explicação em português.
11. Inclua uma missão prática (exercício) com enunciado e dica, sem a resposta completa.
12. Inclua uma imagem de abertura referenciada como `![Painel de comando de frota espacial exibido em telas de tamanhos diferentes, de comunicador de pulso a grande monitor](../assets/cap09-responsividade.png)`, com texto alternativo descritivo.
13. Não use nomes de personagens, logotipos ou marcas registradas, nem dados pessoais.

## Formato de saída esperado

Entregue somente o capítulo em Markdown, sem comentários fora do texto, seguindo a estrutura abaixo. Todo código CSS deve estar em bloco de três crases com a linguagem `css`.

````markdown
# Capítulo 9: Responsividade

<narrativa de abertura>

![Painel de comando de frota espacial exibido em telas de tamanhos diferentes, de comunicador de pulso a grande monitor](../assets/cap09-responsividade.png)

## A meta tag viewport

## Mobile first

```css
.painel-da-frota {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .painel-da-frota {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Media queries

## Unidades relativas e clamp()

## Imagens fluidas

## Consultas de contêiner

## Erros comuns

## Missão prática

## Resumo do capítulo
````

O capítulo deve ter ao menos um bloco ```css por seção técnica, cada um com explicação em português, e a imagem `../assets/cap09-responsividade.png`.

## Critérios de qualidade

- [ ] O texto está em português do Brasil, com ortografia e gramática corretas.
- [ ] `viewport`, mobile first, media queries, unidades relativas e imagens fluidas são explicados.
- [ ] Todo bloco de código usa a linguagem `css` e contém CSS válido.
- [ ] Os exemplos usam o tema Star Wars (`.painel-da-frota`, `.nave`, `.holocron`) sem nomes protegidos.
- [ ] A imagem `../assets/cap09-responsividade.png` está referenciada com texto alternativo descritivo.
- [ ] Os pontos de quebra são justificados pelo conteúdo.
- [ ] O suporte de `@container` é mencionado com ressalva de verificação.
- [ ] Há uma missão prática com dica e um resumo final.
- [ ] Nenhum dado pessoal, segredo ou termo proibido aparece no texto.
- [ ] Cada exemplo foi testado em um navegador, em larguras diferentes, por um humano.
