# Checklist de Revisão do E-book

Use este checklist antes de publicar o e-book de CSS com tema Star Wars. Marque cada item somente depois de verificá-lo. Itens não aplicáveis devem ser justificados no Pull Request.

## 1. Conteúdo técnico

- [ ] Todos os capítulos cobrem os tópicos previstos: introdução ao CSS, seletores, modelo de caixa, cores e tipografia, Flexbox, Grid, posicionamento, transições e animações, responsividade, variáveis CSS, boas práticas e projeto final.
- [ ] As explicações estão tecnicamente corretas e atualizadas em relação à especificação do CSS.
- [ ] Cada capítulo possui pelo menos um exemplo de código CSS.
- [ ] A ordem dos capítulos segue o prefixo numérico e a progressão didática faz sentido.
- [ ] Cada capítulo em `ebook/` possui o Prompt_Capitulo de mesmo nome em `prompts/`.
- [ ] Os termos do glossário estão corretos e em ordem alfabética.
- [ ] O tema Star Wars aparece na narrativa e nos exemplos sem prejudicar a clareza técnica.
- [ ] Possíveis imprecisões geradas pela IA foram identificadas e corrigidas por revisão humana.

## 2. Correção dos códigos CSS

- [ ] Cada exemplo CSS foi testado em navegador e produz o resultado descrito no texto.
- [ ] Os exemplos foram testados em pelo menos dois navegadores modernos.
- [ ] Os blocos de código não contêm erros de sintaxe (chaves, ponto e vírgula, propriedades e valores válidos).
- [ ] Os exemplos que dependem de HTML trazem o HTML necessário para reproduzi-los.
- [ ] Propriedades recentes ou com suporte limitado estão sinalizadas no texto.
- [ ] Os nomes de classes e variáveis seguem um padrão consistente em todo o livro.
- [ ] Os comentários nos códigos estão em português e ajudam a entender o exemplo.
- [ ] O projeto final reúne os conceitos dos capítulos anteriores e funciona do início ao fim.

## 3. Texto e gramática em português

- [ ] O texto está inteiramente em português, com ortografia e acentuação corretas.
- [ ] A concordância, a pontuação e a clareza das frases foram revisadas.
- [ ] O tom é consistente em todos os capítulos.
- [ ] Os termos técnicos têm tradução ou explicação na primeira aparição.
- [ ] Títulos e subtítulos seguem um padrão uniforme de numeração e capitalização.
- [ ] Não há trechos duplicados, truncados ou restos de instruções dirigidas à IA.
- [ ] O sumário reflete os títulos reais dos capítulos.

## 4. Imagens e direitos

- [ ] Cada imagem referenciada no e-book existe em `assets/`, como placeholder ou como arquivo final.
- [ ] Todas as imagens têm texto alternativo descritivo.
- [ ] Cada imagem possui entrada em `assets/PROMPTS-IMAGENS.md` com arquivo de destino, descrição da cena, estilo visual, proporção e observações de uso.
- [ ] Os prompts de imagem não citam nomes de personagens, logotipos ou marcas protegidas.
- [ ] As imagens finais não reproduzem personagens, logotipos ou obras protegidas.
- [ ] A troca de placeholder por imagem final manteve o mesmo nome de arquivo, sem editar os capítulos.
- [ ] A origem e a licença de cada imagem final estão registradas.

## 5. Avisos de IA e ética

- [ ] O Aviso_de_IA (`AVISO-IA.md`) informa que o conteúdo foi gerado com apoio de IA, revisado por humano e que pode conter imprecisões.
- [ ] O Aviso_Etico (`AVISO-ETICO.md`) aborda transparência, direitos autorais, uso de marcas de terceiros, ausência de dados pessoais nos prompts e finalidade educacional.
- [ ] Há declaração clara de que o projeto não tem afiliação nem endosso dos detentores dos direitos de Star Wars.
- [ ] Os dois avisos aparecem em seção própria no e-book (`ebook/99-creditos-e-avisos.md`) e estão referenciados no README.
- [ ] Ausência de Termos_Proibidos: `npm run validar` termina com código de saída zero, sem encontrar os termos proibidos listados em `scripts/config/termos-proibidos.json`.
- [ ] Ausência de segredos e dados pessoais: nenhum arquivo contém chaves de API, tokens, senhas, e-mails, telefones ou outros dados pessoais, incluindo prompts, scripts e histórico de commits.
- [ ] O Repositorio_Referencia é citado apenas na seção de créditos do README, como inspiração neutra.
- [ ] A licença em `LICENSE` é open source reconhecida e compatível com o conteúdo reaproveitado.

## 6. Build do PDF

- [ ] As dependências foram instaladas com `npm install` sem erros.
- [ ] `npm run validar` termina sem problemas antes do build.
- [ ] O build executa com sucesso no Windows (`./scripts/build.ps1`).
- [ ] O build executa com sucesso em Unix (`./scripts/build.sh`).
- [ ] `output/ebook.html` e `output/ebook.pdf` foram gerados.
- [ ] O PDF abre corretamente e tem capa, sumário, capítulos, glossário e créditos e avisos, nesta ordem.
- [ ] Os capítulos aparecem no PDF na ordem do prefixo numérico.
- [ ] Imagens, fontes e estilos aparecem corretamente no PDF, sem cortes de código ou quebras de página ruins.
- [ ] A pasta `output/` continua ignorada pelo Git, com apenas o `.gitkeep` versionado.
- [ ] O script de build não contém segredos nem credenciais.
