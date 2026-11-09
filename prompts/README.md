# Receita de Prompts

Esta pasta contém a Receita de Prompts do e-book "CSS na Galáxia": um conjunto ordenado de 12 prompts, um por capítulo. Executados em sequência em uma ferramenta de IA, eles produzem o conteúdo de cada capítulo, que depois passa por revisão humana e é salvo na pasta `ebook/`.

## Ordem de execução

Execute os prompts na ordem numérica. O prefixo de dois dígitos do nome do arquivo define a sequência.

| Ordem | Prompt | Tópico |
|---|---|---|
| 01 | [01-introducao.md](01-introducao.md) | Introdução ao CSS |
| 02 | [02-seletores.md](02-seletores.md) | Seletores |
| 03 | [03-modelo-de-caixa.md](03-modelo-de-caixa.md) | Modelo de caixa |
| 04 | [04-cores-e-tipografia.md](04-cores-e-tipografia.md) | Cores e tipografia |
| 05 | [05-flexbox.md](05-flexbox.md) | Layout com Flexbox |
| 06 | [06-grid.md](06-grid.md) | Layout com Grid |
| 07 | [07-posicionamento.md](07-posicionamento.md) | Posicionamento |
| 08 | [08-transicoes-e-animacoes.md](08-transicoes-e-animacoes.md) | Transições e animações |
| 09 | [09-responsividade.md](09-responsividade.md) | Responsividade |
| 10 | [10-variaveis-css.md](10-variaveis-css.md) | Variáveis CSS |
| 11 | [11-boas-praticas.md](11-boas-praticas.md) | Boas práticas |
| 12 | [12-projeto-final.md](12-projeto-final.md) | Projeto final |

## Estrutura de cada prompt

Todo prompt segue o mesmo formato: um título `# Prompt NN: <título>` e seis seções.

- **Objetivo**: o que o capítulo deve ensinar.
- **Contexto**: o lugar do capítulo no livro e a narrativa de Star Wars.
- **Papel da IA**: a persona que a IA deve assumir.
- **Instruções**: passos numerados, incluindo a exigência de exemplos CSS válidos com explicação em português e de uma imagem por capítulo.
- **Formato de saída esperado**: a estrutura do Markdown a ser devolvido, com blocos `css`.
- **Critérios de qualidade**: caixas de seleção para conferir o resultado.

## Como executar cada prompt

1. Abra uma conversa nova na ferramenta de IA de sua preferência.
2. Cole o contexto compartilhado (veja a seção abaixo), se estiver em uma conversa nova.
3. Cole o conteúdo completo do prompt do capítulo.
4. Leia a resposta, confira os critérios de qualidade e peça ajustes quando necessário.
5. Salve o resultado revisado em `ebook/NN-slug.md`, com o mesmo nome do arquivo do prompt.

## Como combinar a saída de cada prompt

A saída de cada prompt é um capítulo completo em Markdown. Para combiná-las:

1. Salve cada capítulo na pasta `ebook/` com **exatamente o mesmo nome** do prompt correspondente. Por exemplo, a saída de `prompts/07-posicionamento.md` vai para `ebook/07-posicionamento.md`.
2. Mantenha as partes fixas do livro: `ebook/00-capa.md`, `ebook/98-glossario.md` e `ebook/99-creditos-e-avisos.md`. Elas não têm prompt próprio.
3. Confira que a referência de imagem de cada capítulo aponta para o nome previsto em `assets/` (por exemplo, `../assets/cap07-posicionamento.png`). Assim, ao trocar o placeholder pela imagem final, o texto não precisa de edição.
4. Rode o script de build, que concatena os capítulos pela ordem do prefixo numérico e gera o HTML e o PDF em `output/`.
5. Rode o validador de conteúdo para conferir que todo capítulo tem prompt correspondente, que as imagens existem e que não há termos proibidos.

## Contexto compartilhado entre prompts

Para manter a coerência do livro, mantenha estas informações em todas as conversas:

- **Livro**: "CSS na Galáxia", e-book educacional de CSS escrito em português do Brasil.
- **Público**: pessoas iniciantes em CSS, com noções básicas de HTML.
- **Tema**: Star Wars na narrativa e nos exemplos de código, com classes como `.sabre-de-luz`, `.nave` e `.holocron`.
- **Narrativa contínua**: o leitor é um(a) aprendiz que avança por missões ao longo dos 12 capítulos.
- **Direitos e marcas**: sem afiliação com os detentores dos direitos de Star Wars; sem logotipos, personagens protegidos ou trechos de obras.
- **Código**: CSS válido, testável em navegador moderno, com explicação em português.
- **Imagens**: uma por capítulo, referenciada em `../assets/` com texto alternativo descritivo.
- **Privacidade**: nenhum dado pessoal, segredo ou chave nos prompts.

Ao iniciar um capítulo em uma conversa nova, informe também um resumo curto dos capítulos já produzidos, para que a IA evite repetições e respeite o nível de conhecimento do leitor.

## Aviso de revisão humana

A saída da IA é um rascunho. Todo capítulo **deve** ser revisado por uma pessoa antes da publicação, o que inclui:

- conferir a correção técnica e testar cada exemplo CSS em um navegador;
- revisar texto, gramática e coerência da narrativa;
- verificar direitos autorais e o uso de marcas;
- garantir que não há dados pessoais, segredos ou termos proibidos.

A IA pode cometer erros e produzir informações imprecisas. Use o checklist de revisão para registrar essa conferência.

## Documentos relacionados

- [Aviso de uso de IA](../AVISO-IA.md)
- [Aviso ético](../AVISO-ETICO.md)
- [Checklist de revisão](../CHECKLIST-REVISAO.md)
