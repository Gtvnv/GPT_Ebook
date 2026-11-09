# Prompt 12: Projeto final

## Objetivo

Gerar o Capítulo 12 do e-book, que guia o leitor na construção de um projeto final: uma página "Painel da Frota Estelar" que integra os conceitos dos capítulos anteriores (seletores, modelo de caixa, cores e tipografia, Flexbox, Grid, posicionamento, transições e animações, responsividade, variáveis CSS e boas práticas). O leitor deve terminar com uma página completa, responsiva e organizada.

## Contexto

O e-book "CSS na Galáxia" ensina CSS com narrativa e exemplos inspirados em Star Wars. Os capítulos 1 a 11 apresentaram todos os fundamentos. Este é o capítulo de encerramento: a missão final, em que o leitor reúne tudo o que aprendeu para montar a página de controle de uma frota espacial.

O projeto não tem afiliação com os detentores dos direitos de Star Wars. Use apenas nomes de classes e descrições genéricas, sem logotipos, sem personagens protegidos e sem dados pessoais. O capítulo deve fechar a narrativa iniciada no capítulo 1.

## Papel da IA

Você é um(a) mentor(a) de front-end e redator(a) técnico(a) de livros didáticos em português do Brasil. Conduz o leitor passo a passo, explica as decisões de cada etapa e valida todo o código antes de apresentá-lo, garantindo que as partes se encaixem em um único projeto funcional.

## Instruções

1. Escreva o capítulo em português do Brasil, com o título "Capítulo 12: Projeto final".
2. Abra com uma narrativa curta (3 a 5 parágrafos) que fecha a jornada do leitor e apresenta a missão final: construir o Painel da Frota Estelar.
3. Descreva os requisitos do projeto: cabeçalho com menu fixo, seção principal com cartões de naves em Grid, painel lateral com Flexbox, animação de destaque no `.holocron`, tema alternável com variáveis CSS e comportamento responsivo.
4. Apresente o HTML base completo e mínimo do projeto, em bloco `html`, com classes como `.painel-da-frota`, `.nave`, `.holocron` e `.sabre-de-luz`.
5. Construa o CSS em etapas numeradas (variáveis e reset, tipografia e cores, layout, posicionamento, animações, responsividade), cada etapa com bloco CSS válido e explicação em português.
6. Apresente ao final o arquivo CSS completo consolidado em um único bloco `css`.
7. Inclua uma lista de verificação para o leitor conferir o resultado e sugestões de extensão (novas naves, novo tema, novas animações).
8. Inclua uma seção de revisão que remete aos capítulos anteriores, indicando onde cada conceito foi estudado.
9. Feche com uma mensagem de encerramento e próximos passos de estudo (por exemplo, pré-processadores, frameworks e acessibilidade avançada) sem prometer resultados.
10. Inclua uma imagem de abertura referenciada como `![Painel final de uma frota espacial com cartões de naves, menu fixo e brilho holográfico em um layout organizado](../assets/cap12-projeto-final.png)`, com texto alternativo descritivo.
11. Garanta que HTML e CSS funcionem juntos em um navegador moderno, sem dependências externas.
12. Não use nomes de personagens, logotipos ou marcas registradas, nem dados pessoais.

## Formato de saída esperado

Entregue somente o capítulo em Markdown, sem comentários fora do texto, seguindo a estrutura abaixo. Todo código CSS deve estar em bloco de três crases com a linguagem `css`, e o HTML em bloco `html`.

````markdown
# Capítulo 12: Projeto final

<narrativa de encerramento e apresentação da missão>

![Painel final de uma frota espacial com cartões de naves, menu fixo e brilho holográfico em um layout organizado](../assets/cap12-projeto-final.png)

## Requisitos da missão

## Estrutura HTML

## Etapa 1: variáveis e reset

```css
:root {
  --cor-fundo-espaco: #05070f;
  --cor-sabre: #3aa0ff;
  --espaco-base: 1rem;
}
```

## Etapa 2: tipografia e cores

## Etapa 3: layout com Grid e Flexbox

## Etapa 4: posicionamento

## Etapa 5: animações

## Etapa 6: responsividade

## CSS completo

## Lista de verificação

## Revisão dos capítulos

## Próximos passos
````

O capítulo deve ter blocos ```css em todas as etapas, explicação em português para cada bloco, o CSS completo consolidado e a imagem `../assets/cap12-projeto-final.png`.

## Critérios de qualidade

- [ ] O texto está em português do Brasil, com ortografia e gramática corretas.
- [ ] O projeto integra seletores, modelo de caixa, cores, Flexbox, Grid, posicionamento, animações, responsividade e variáveis.
- [ ] O HTML base e o CSS consolidado funcionam juntos em um navegador.
- [ ] Todo bloco de código CSS usa a linguagem `css` e contém CSS válido.
- [ ] Os exemplos usam o tema Star Wars (`.painel-da-frota`, `.nave`, `.holocron`, `.sabre-de-luz`) sem nomes protegidos.
- [ ] A imagem `../assets/cap12-projeto-final.png` está referenciada com texto alternativo descritivo.
- [ ] Há lista de verificação, revisão dos capítulos anteriores e próximos passos.
- [ ] O capítulo fecha a narrativa do livro de forma coerente.
- [ ] Nenhum dado pessoal, segredo ou termo proibido aparece no texto.
- [ ] O projeto completo foi testado em um navegador por um humano antes da publicação.
