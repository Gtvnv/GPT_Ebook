# Receita de Prompts para Criar um E-book

Repositório educacional com uma receita de prompts, o conteúdo e o script de build de um e-book de CSS com tema Star Wars: **"CSS na Galáxia"**.

> Artigo relacionado: [https://exemplo.com/artigo-placeholder](https://exemplo.com/artigo-placeholder) (**link a ser preenchido**).

## Sumário

- [Visão geral](#visão-geral)
- [Objetivo](#objetivo)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Pré-requisitos](#pré-requisitos)
- [Como usar a Receita de Prompts](#como-usar-a-receita-de-prompts)
- [Como gerar o PDF](#como-gerar-o-pdf)
- [Como substituir imagens](#como-substituir-imagens)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Avisos](#avisos)
- [Créditos](#créditos)

## Visão geral

O projeto reúne tudo o que é necessário para produzir um e-book de CSS do zero com apoio de IA:

- **Prompts por capítulo**: 12 prompts em `prompts/`, executados em ordem, que geram o texto de cada capítulo.
- **E-book**: capa, 12 capítulos, glossário e seção de créditos e avisos em Markdown (`ebook/`), com folha de estilo própria em CSS.
- **Build**: script em Node.js que consolida os capítulos em HTML e gera o PDF.
- **Imagens**: placeholders em `assets/` e prompts de MidJourney documentados em `assets/PROMPTS-IMAGENS.md`.
- **Revisão e avisos**: checklist de revisão, aviso de uso de IA e aviso ético.

Tecnologias e ferramentas:

- **IA de texto** para gerar e refinar o conteúdo dos capítulos, sempre com revisão humana.
- **MidJourney** para as ilustrações. Os prompts de imagem estão documentados e as imagens atuais são **placeholders**, a serem substituídas pelas imagens finais.
- **Tema CSS + Star Wars**: o universo de Star Wars é usado apenas como narrativa educacional, sem afiliação ou endosso (veja o [Aviso Ético](AVISO-ETICO.md)).
- **Node.js**, `markdown-it` e `puppeteer` (Chromium headless) para o build.

## Objetivo

Oferecer um fluxo reproduzível para criar um e-book didático de CSS: do prompt ao PDF, passando por revisão, validação automática e geração de imagens. O projeto também serve como modelo para quem quiser adaptar a receita a outros temas.

## Estrutura de pastas

```text
.
├── assets/                  Imagens (placeholders) e prompts de imagem
│   ├── README.md            Como substituir cada placeholder
│   └── PROMPTS-IMAGENS.md   Prompts do MidJourney por imagem
├── ebook/                   Conteúdo do e-book em Markdown
│   ├── 00-capa.md
│   ├── 01-introducao.md ... 12-projeto-final.md
│   ├── 98-glossario.md
│   ├── 99-creditos-e-avisos.md
│   ├── manifesto.json       Lista dos arquivos esperados no build
│   └── estilos/ebook.css    Folha de estilo do e-book
├── output/                  Artefatos gerados (HTML e PDF), ignorados pelo Git
├── prompts/                 Receita de Prompts (um prompt por capítulo)
│   └── README.md            Ordem de execução e como combinar as saídas
├── scripts/                 Build, validador e módulos auxiliares
│   ├── build.mjs
│   ├── build.ps1            Wrapper para Windows (PowerShell)
│   ├── build.sh             Wrapper para Unix
│   ├── validar.mjs
│   ├── config/
│   └── lib/
├── tests/                   Testes unitários e de propriedades
├── AVISO-ETICO.md
├── AVISO-IA.md
├── CHECKLIST-REVISAO.md
├── CONTRIBUTING.md
├── LICENSE
└── package.json
```

## Pré-requisitos

- **Node.js 18 ou superior** (verifique com `node --version`).
- **npm**, que acompanha o Node.js.
- **Dependências do projeto**, instaladas na raiz do repositório:

  ```bash
  npm install
  ```

- **Chromium do puppeteer**: o `npm install` costuma baixá-lo automaticamente. Se o download for bloqueado (rede corporativa, por exemplo), instale-o manualmente:

  ```bash
  npx puppeteer browsers install chrome
  ```

Se alguma dependência estiver ausente, o script de build exibe uma mensagem em português com o nome da dependência e o comando de instalação.

## Como usar a Receita de Prompts

1. Leia [prompts/README.md](prompts/README.md). Ele descreve a ordem de execução, a estrutura de cada prompt e como combinar as saídas.
2. Execute os prompts em **ordem numérica** (`01-introducao.md` até `12-projeto-final.md`) em uma ferramenta de IA de texto, colando o conteúdo completo de cada arquivo.
3. Confira a resposta com os critérios de qualidade do próprio prompt e peça ajustes quando necessário.
4. Revise o texto e teste os exemplos CSS em um navegador.
5. Salve o resultado revisado em `ebook/`, com o **mesmo nome** do prompt correspondente (por exemplo, o resultado de `prompts/02-seletores.md` vai para `ebook/02-seletores.md`).
6. Ao final, percorra o [Checklist de Revisão](CHECKLIST-REVISAO.md).

## Como gerar o PDF

Instale as dependências (`npm install`) e use um dos comandos abaixo na raiz do repositório.

**Windows (PowerShell):**

```powershell
./scripts/build.ps1
```

**Unix (Linux e macOS):**

```bash
./scripts/build.sh
```

**Qualquer sistema, direto com Node.js ou npm:**

```bash
node scripts/build.mjs
npm run build
```

O build lê `ebook/manifesto.json`, concatena os capítulos pela ordem do prefixo numérico e grava em `output/`:

- `output/ebook.html`: versão HTML consolidada.
- `output/ebook.pdf`: versão em PDF.

Se um capítulo esperado não existir, o build informa o arquivo ausente e encerra com código diferente de zero.

Comandos auxiliares:

```bash
npm run validar   # varre termos proibidos e confere capítulos, prompts, imagens e links
npm test          # executa os testes (node --test)
```

## Como substituir imagens

As imagens atuais em `assets/` são **placeholders**. Para trocá-las:

1. Consulte [assets/PROMPTS-IMAGENS.md](assets/PROMPTS-IMAGENS.md) e gere cada imagem no MidJourney com o prompt documentado.
2. Salve a imagem final em `assets/` com **exatamente o mesmo nome de arquivo** do placeholder, sobrescrevendo-o.
3. Rode `npm run build` novamente. Os capítulos não precisam ser editados, pois a referência ao arquivo continua a mesma.

Instruções detalhadas estão em [assets/README.md](assets/README.md). Os prompts de imagem evitam nomes de personagens, logotipos e marcas protegidas.

## Contribuição

Contribuições são bem-vindas. Antes de começar, leia o [CONTRIBUTING.md](CONTRIBUTING.md), que descreve como reportar problemas, propor novos prompts, o padrão de nomenclatura e de escrita em português, a convenção de branches e o fluxo por Pull Request. Use o [Checklist de Revisão](CHECKLIST-REVISAO.md) para validar suas alterações.

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).

## Avisos

- [AVISO-IA.md](AVISO-IA.md): o conteúdo foi produzido com apoio de IA, revisado por humano e pode conter imprecisões.
- [AVISO-ETICO.md](AVISO-ETICO.md): diretrizes sobre transparência, direitos autorais, uso de marcas de terceiros e finalidade educacional. Este projeto **não tem afiliação** com os detentores dos direitos de Star Wars.
- [CHECKLIST-REVISAO.md](CHECKLIST-REVISAO.md): itens de revisão antes de publicar.

## Créditos

Este projeto se inspira, de forma neutra, no repositório público [prompts-recipe-to-create-a-ebook](https://github.com/felipeAguiarCode/prompts-recipe-to-create-a-ebook). Os prompts, o conteúdo do e-book, os scripts e a documentação deste repositório são próprios, e o autor do repositório citado não responde pelo conteúdo daqui.

Star Wars é marca de seus respectivos detentores e é citada apenas com finalidade educacional.
