# Prompt 01: Introdução ao CSS

## Objetivo

Gerar o Capítulo 1 do e-book, que apresenta o CSS a iniciantes: o que é, para que serve, como se relaciona com o HTML, as três formas de aplicar estilos (inline, `<style>` e arquivo externo), a anatomia de uma regra (seletor, propriedade, valor) e como o navegador aplica a cascata. Ao final, o leitor deve conseguir escrever e testar sua primeira regra CSS.

## Contexto

O e-book ensina CSS por meio de uma jornada em uma galáxia muito, muito distante. O leitor é um(a) aprendiz de desenvolvimento web que ainda não conhece CSS. Este é o primeiro capítulo, então não há conteúdo anterior a retomar. A narrativa começa com um(a) jovem aprendiz que encontra um holocron antigo contendo os segredos da "Força da Estilização". Os exemplos devem usar nomes de classes temáticos, como `.sabre-de-luz`, `.nave` e `.holocron`, sempre com nomes genéricos e sem marcas protegidas. O projeto tem finalidade educacional e não tem afiliação com os detentores dos direitos de Star Wars.

## Papel da IA

Você é um(a) mestre Jedi do CSS: um(a) instrutor(a) de front-end experiente, paciente e didático(a), que escreve em português do Brasil. Você explica conceitos com clareza, usa analogias com o universo espacial e nunca sacrifica a correção técnica pela diversão da narrativa.

## Instruções

1. Escreva uma abertura narrativa curta (2 a 3 parágrafos) em que o(a) aprendiz descobre um holocron que guarda os segredos do CSS.
2. Explique o que é CSS e qual é a diferença entre estrutura (HTML) e apresentação (CSS), usando a analogia de uma nave (casco = HTML, pintura e painéis = CSS).
3. Apresente a anatomia de uma regra CSS: seletor, bloco de declarações, propriedade e valor. Mostre um exemplo com a classe `.sabre-de-luz`.
4. Mostre as três formas de aplicar CSS (inline, tag `<style>` e arquivo externo com `<link>`), com um exemplo válido de cada uma e uma recomendação sobre qual usar.
5. Explique em linguagem simples a cascata e a herança, com um exemplo em que a cor definida em `.nave` é herdada pelos elementos filhos.
6. Inclua pelo menos três exemplos de código CSS válidos e testáveis em navegador, cada um seguido de uma explicação em português linha a linha ou propriedade a propriedade.
7. Inclua uma seção "Missão prática" com um exercício guiado, por exemplo estilizar um cartão `.holocron` com cor de fundo, borda e texto.
8. Solicite e posicione uma imagem de abertura do capítulo, referenciada como `../assets/cap01-introducao.png`, com texto alternativo descritivo (por exemplo, "Holocron azul brilhando sobre uma mesa em uma sala escura de uma base espacial").
9. Termine com um resumo em tópicos e uma ponte para o Capítulo 2 (Seletores).
10. Use apenas CSS que funcione em navegadores atuais. Não invente propriedades e não use bibliotecas externas.

## Formato de saída esperado

Entregue um único arquivo Markdown em português, pronto para salvar em `ebook/01-introducao.md`, com esta estrutura:

- Título de nível 1 no formato "Capítulo 1: Introdução ao CSS".
- Seções de nível 2 para: a abertura narrativa, o que é CSS, anatomia de uma regra, formas de aplicar CSS, cascata e herança, missão prática e resumo.
- Pelo menos um bloco de código com a linguagem `css` (mínimo de três ao longo do capítulo), fechado corretamente.
- Uma imagem com a sintaxe `![texto alternativo descritivo](../assets/cap01-introducao.png)`.

Exemplo do formato esperado de um trecho de código com explicação:

````markdown
```css
.sabre-de-luz {
  color: #4fc3f7;
  font-weight: bold;
}
```

A regra acima seleciona todos os elementos com a classe `sabre-de-luz`
e define a cor do texto como azul e o peso da fonte como negrito.
````

Não inclua texto fora do conteúdo do capítulo (nada de comentários do tipo "Claro, aqui está").

## Critérios de qualidade

- [ ] O texto está inteiramente em português do Brasil, sem erros de gramática.
- [ ] A narrativa e os exemplos usam o tema Star Wars com nomes genéricos (`.sabre-de-luz`, `.nave`, `.holocron`).
- [ ] Há pelo menos um bloco ```css e todos os exemplos são CSS válido.
- [ ] Cada exemplo de código é seguido de explicação em português.
- [ ] A imagem `../assets/cap01-introducao.png` está referenciada com texto alternativo descritivo.
- [ ] Os blocos de código estão todos fechados e o Markdown renderiza sem quebras.
- [ ] O capítulo inclui uma missão prática (exercício) e um resumo.
- [ ] Não há referência a plataformas, cursos ou termos proibidos pelo projeto.
