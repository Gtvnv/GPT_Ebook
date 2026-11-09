# Prompt 10: Variáveis CSS

## Objetivo

Gerar o Capítulo 10 do e-book, que ensina as variáveis CSS (propriedades personalizadas): declaração com `--nome`, uso com `var()`, valores de reserva, escopo e herança, `:root`, temas claro e escuro e alteração de valores com JavaScript em nível básico. O leitor deve conseguir centralizar cores, espaçamentos e fontes de um projeto.

## Contexto

O e-book "CSS na Galáxia" ensina CSS com narrativa e exemplos inspirados em Star Wars. Os capítulos 1 a 9 cobriram introdução, seletores, modelo de caixa, cores e tipografia, Flexbox, Grid, posicionamento, transições e animações e responsividade. O leitor já escreveu bastante CSS e já percebeu a repetição de valores.

Nesta missão, o leitor cria um sistema de temas para a frota: um lado "luz" e um lado "sombra", trocados mudando apenas algumas variáveis. O projeto não tem afiliação com os detentores dos direitos de Star Wars. Use apenas nomes de classes e descrições genéricas, sem logotipos nem personagens protegidos.

## Papel da IA

Você é um(a) professor(a) de CSS com foco em manutenção de código e sistemas de design, e redator(a) técnico(a) de livros didáticos em português do Brasil. Explica com clareza o escopo e a cascata das variáveis e valida todo o código antes de apresentá-lo.

## Instruções

1. Escreva o capítulo em português do Brasil, com o título "Capítulo 10: Variáveis CSS".
2. Abra com uma narrativa curta (3 a 5 parágrafos) sobre a frota que precisa trocar de identidade visual sem reescrever cada regra.
3. Explique a sintaxe `--nome-da-variavel` e o uso de `var(--nome, valor-de-reserva)`, com exemplos como `--cor-sabre`, `--cor-fundo-espaco` e `--espaco-base`.
4. Explique o escopo: variáveis em `:root` versus variáveis em um seletor específico como `.nave`, e como a herança afeta o valor.
5. Mostre como criar um tema claro e escuro com `[data-tema="sombra"]` e com `prefers-color-scheme`.
6. Mostre variáveis combinadas com `calc()` e com unidades, por exemplo uma escala de espaçamento.
7. Faça uma introdução simples a alterar uma variável com JavaScript usando `element.style.setProperty`, avisando que o foco do livro é CSS.
8. Explique diferenças em relação a variáveis de pré-processadores e mencione limitações (por exemplo, variáveis não funcionam em media queries).
9. Para cada conceito, apresente exemplo CSS válido com tema Star Wars (`.sabre-de-luz`, `.nave`, `.holocron`) e explicação em português.
10. Inclua uma missão prática (exercício) com enunciado e dica, sem a resposta completa.
11. Inclua uma imagem de abertura referenciada como `![Duas versões do mesmo painel de nave, uma com luzes azuis e outra com luzes vermelhas, mostrando a troca de tema](../assets/cap10-variaveis.png)`, com texto alternativo descritivo.
12. Não use nomes de personagens, logotipos ou marcas registradas, nem dados pessoais.

## Formato de saída esperado

Entregue somente o capítulo em Markdown, sem comentários fora do texto, seguindo a estrutura abaixo. Todo código CSS deve estar em bloco de três crases com a linguagem `css`.

````markdown
# Capítulo 10: Variáveis CSS

<narrativa de abertura>

![Duas versões do mesmo painel de nave, uma com luzes azuis e outra com luzes vermelhas, mostrando a troca de tema](../assets/cap10-variaveis.png)

## Declarando e usando variáveis

```css
:root {
  --cor-sabre: #3aa0ff;
  --espaco-base: 1rem;
}

.sabre-de-luz {
  background-color: var(--cor-sabre);
  padding: var(--espaco-base);
}
```

## Valores de reserva

## Escopo e herança

## Temas com variáveis

## Variáveis e calc()

## Alterando variáveis com JavaScript

## Limitações e erros comuns

## Missão prática

## Resumo do capítulo
````

O capítulo deve ter ao menos um bloco ```css por seção técnica, cada um com explicação em português, e a imagem `../assets/cap10-variaveis.png`.

## Critérios de qualidade

- [ ] O texto está em português do Brasil, com ortografia e gramática corretas.
- [ ] Declaração, `var()`, valor de reserva, escopo e herança são explicados com exemplos.
- [ ] Há um exemplo completo de troca de tema por variáveis.
- [ ] Todo bloco de código usa a linguagem `css` e contém CSS válido.
- [ ] Os exemplos usam o tema Star Wars (`.sabre-de-luz`, `.nave`, `.holocron`) sem nomes protegidos.
- [ ] A imagem `../assets/cap10-variaveis.png` está referenciada com texto alternativo descritivo.
- [ ] As limitações das variáveis são mencionadas.
- [ ] Há uma missão prática com dica e um resumo final.
- [ ] Nenhum dado pessoal, segredo ou termo proibido aparece no texto.
- [ ] Cada exemplo foi testado em um navegador por um humano antes da publicação.
