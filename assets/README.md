# Imagens do e-book

Esta pasta guarda as imagens usadas pelos capítulos em `ebook/`. Os arquivos atuais são placeholders: PNGs de 1280x720 em cor sólida escura, válidos e prontos para o build.

## Como substituir um placeholder

1. Abra `PROMPTS-IMAGENS.md` e localize o bloco com o nome do arquivo (por exemplo, `cap05-flexbox.png`).
2. Use a descrição da cena e o estilo visual em um gerador de imagens, como o MidJourney. Os parâmetros (`--ar 16:9 --v 6`) já estão no texto.
3. Salve a imagem final em PNG, na proporção indicada no bloco.
4. Substitua o arquivo em `assets/` mantendo exatamente o mesmo nome, incluindo a extensão `.png`.
5. Rode `node scripts/validar.mjs` para confirmar que todas as imagens continuam resolvendo.

Como os capítulos referenciam `../assets/<nome>.png`, trocar o arquivo não exige editar nenhum capítulo.

## Arquivos esperados

- `capa.png`
- `cap01-introducao.png`
- `cap02-seletores.png`
- `cap03-caixa.png`
- `cap04-tipografia.png`
- `cap05-flexbox.png`
- `cap06-grid.png`
- `cap07-posicionamento.png`
- `cap08-animacoes.png`
- `cap09-responsividade.png`
- `cap10-variaveis.png`
- `cap11-boas-praticas.png`
- `cap12-projeto-final.png`

## Cuidados

- Não use personagens, logotipos ou marcas protegidas nas imagens finais.
- Mantenha o texto alternativo dos capítulos coerente com a nova imagem.
- Imagens geradas por IA devem seguir `AVISO-IA.md` e `AVISO-ETICO.md`.
