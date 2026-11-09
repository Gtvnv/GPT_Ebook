# Prompt 08: Transições e animações

## Objetivo

Gerar o Capítulo 8 do e-book, que ensina transições (`transition`) e animações (`@keyframes` e `animation`) em CSS. O leitor deve aprender a suavizar mudanças de estado, criar animações em loop, controlar duração, atraso e curva de tempo, e usar transformações (`transform`) com desempenho e acessibilidade.

## Contexto

O e-book "CSS na Galáxia" ensina CSS com narrativa e exemplos inspirados em Star Wars. Os capítulos 1 a 7 cobriram introdução, seletores, modelo de caixa, cores e tipografia, Flexbox, Grid e posicionamento. O leitor já sabe estilizar e posicionar elementos; agora vai dar vida a eles.

Nesta missão, o leitor acende um sabre de luz que cresce suavemente, faz uma nave decolar com um efeito de propulsão pulsante e anima um holocron que gira e flutua. O projeto não tem afiliação com os detentores dos direitos de Star Wars. Use apenas nomes de classes e descrições genéricas, sem logotipos nem personagens protegidos.

## Papel da IA

Você é um(a) professor(a) de CSS com experiência em animação para web e redator(a) técnico(a) de livros didáticos em português do Brasil. Explica com exemplos visuais descritos em palavras, cuida de desempenho e acessibilidade e valida todo o código antes de apresentá-lo.

## Instruções

1. Escreva o capítulo em português do Brasil, com o título "Capítulo 8: Transições e animações".
2. Abra com uma narrativa curta (3 a 5 parágrafos) em que o leitor ativa os sistemas de uma nave e acende um sabre de luz.
3. Explique `transition` e suas propriedades (`transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`) com exemplos usando `:hover` e `:focus`, como `.sabre-de-luz`.
4. Explique `transform` (`translate`, `rotate`, `scale`) e mostre como combiná-lo com transições para mover uma `.nave`.
5. Explique `@keyframes` e as propriedades de `animation` (`animation-name`, `animation-duration`, `animation-iteration-count`, `animation-direction`, `animation-fill-mode` e a forma abreviada), com exemplos como `.holocron` girando e o brilho pulsante do `.propulsor`.
6. Explique as curvas de tempo (`ease`, `linear`, `ease-in-out`, `cubic-bezier`, `steps`) com uma comparação em texto.
7. Inclua uma subseção sobre desempenho (preferir `transform` e `opacity`) e outra sobre acessibilidade com `@media (prefers-reduced-motion: reduce)`.
8. Para cada conceito, apresente exemplo CSS válido com o tema Star Wars e uma explicação em português.
9. Inclua uma missão prática (exercício) com enunciado e dica, sem a resposta completa.
10. Inclua uma imagem de abertura referenciada como `![Sabre de luz genérico brilhando em um corredor escuro de nave espacial, com rastros de luz em movimento](../assets/cap08-animacoes.png)`, com texto alternativo descritivo.
11. Garanta que o CSS seja válido e funcione em navegadores modernos.
12. Não use nomes de personagens, logotipos ou marcas registradas, nem dados pessoais.

## Formato de saída esperado

Entregue somente o capítulo em Markdown, sem comentários fora do texto, seguindo a estrutura abaixo. Todo código CSS deve estar em bloco de três crases com a linguagem `css`.

````markdown
# Capítulo 8: Transições e animações

<narrativa de abertura>

![Sabre de luz genérico brilhando em um corredor escuro de nave espacial, com rastros de luz em movimento](../assets/cap08-animacoes.png)

## Transições suaves

```css
.sabre-de-luz {
  height: 4px;
  width: 0;
  transition: width 0.6s ease-in-out;
}

.sabre-de-luz:hover {
  width: 200px;
}
```

## Transformações

## Animações com @keyframes

## Curvas de tempo

## Desempenho e acessibilidade

## Erros comuns

## Missão prática

## Resumo do capítulo
````

O capítulo deve ter ao menos um bloco ```css por seção técnica, cada um seguido de explicação em português, e a imagem `../assets/cap08-animacoes.png`.

## Critérios de qualidade

- [ ] O texto está em português do Brasil, com ortografia e gramática corretas.
- [ ] `transition`, `transform`, `@keyframes` e `animation` são explicados com exemplos.
- [ ] Todo bloco de código usa a linguagem `css` e contém CSS válido.
- [ ] Há uma seção sobre `prefers-reduced-motion` e outra sobre desempenho.
- [ ] Os exemplos usam o tema Star Wars (`.sabre-de-luz`, `.nave`, `.holocron`) sem nomes protegidos.
- [ ] A imagem `../assets/cap08-animacoes.png` está referenciada com texto alternativo descritivo.
- [ ] Há uma missão prática com dica e um resumo final.
- [ ] Nenhum dado pessoal, segredo ou termo proibido aparece no texto.
- [ ] Cada exemplo foi testado em um navegador por um humano antes da publicação.
