# Guia de Contribuição

Obrigado por querer contribuir com este projeto. Este guia explica como reportar problemas, propor novos prompts e enviar alterações de forma organizada.

Antes de começar, leia:

- [README.md](README.md): visão geral, estrutura de pastas e comandos.
- [AVISO-IA.md](AVISO-IA.md): como a inteligência artificial é usada no projeto.
- [AVISO-ETICO.md](AVISO-ETICO.md): diretrizes éticas, direitos autorais e uso de marcas.
- [CHECKLIST-REVISAO.md](CHECKLIST-REVISAO.md): itens de revisão do e-book.

## Como reportar problemas

1. Procure nas issues já abertas para evitar duplicidade.
2. Abra uma nova issue com um título curto e objetivo.
3. Descreva:
   - o que você esperava que acontecesse;
   - o que aconteceu de fato;
   - o arquivo ou capítulo afetado (por exemplo, `prompts/05-flexbox.md`);
   - passos para reproduzir, quando for um problema de build ou de código CSS;
   - sistema operacional e versão do Node.js, quando relevante.
4. Não cole segredos, chaves, dados pessoais ou trechos de conteúdo protegido por direitos autorais na issue.

## Como propor novos prompts

1. Abra uma issue descrevendo o tema, o objetivo e onde o prompt se encaixa na sequência da receita.
2. Aguarde a conversa inicial com os mantenedores antes de investir tempo na escrita.
3. Crie o arquivo em `prompts/` seguindo o padrão de nomenclatura abaixo.
4. Inclua as seis seções obrigatórias, nesta ordem:
   - Objetivo
   - Contexto
   - Papel da IA
   - Instruções
   - Formato de saída esperado
   - Critérios de qualidade
5. Use o tema Star Wars nos exemplos e na narrativa, solicite exemplos de código CSS válidos e peça explicações em português.
6. Atualize `prompts/README.md` com a nova posição na ordem de execução.
7. Se o prompt gerar um novo capítulo, crie o arquivo correspondente em `ebook/` com o mesmo nome.

## Padrão de nomenclatura de arquivos

Os arquivos de prompts e de capítulos seguem o formato `NN-slug.md`:

- `NN`: número com dois dígitos, que define a ordem (`01`, `02`, ..., `12`).
- `slug`: nome curto em minúsculas, sem acentos, com palavras separadas por hífen.
- Extensão `.md`.

Exemplos válidos: `01-introducao.md`, `05-flexbox.md`, `08-transicoes-e-animacoes.md`.

Exemplos inválidos: `1-introducao.md` (um dígito), `05_flexbox.md` (sem hífen), `05-Flexbox.md` (maiúscula).

Cada capítulo em `ebook/NN-slug.md` deve ter um prompt de mesmo nome em `prompts/NN-slug.md`. Imagens ficam em `assets/` e mantêm o mesmo nome de arquivo quando o placeholder é trocado pela imagem final.

## Padrão de escrita em português

- Escreva todo o conteúdo em português do Brasil.
- Use linguagem clara, direta e acessível a iniciantes.
- Explique cada exemplo de código CSS com texto em português.
- Mantenha termos técnicos consagrados (como `flexbox`, `grid`, `hover`) e explique-os na primeira ocorrência.
- Use títulos curtos, listas para sequências e blocos de código com a linguagem indicada (` ```css `).
- Revise ortografia e gramática antes de enviar.
- Em imagens, escreva sempre um texto alternativo descritivo.

## Uso do checklist de revisão

Antes de abrir um Pull Request que altere conteúdo do e-book, percorra o [CHECKLIST-REVISAO.md](CHECKLIST-REVISAO.md) e confirme os itens aplicáveis:

- conteúdo técnico e correção dos códigos CSS (teste cada exemplo em um navegador);
- texto e gramática em português;
- imagens e direitos;
- avisos de IA e ética;
- build do PDF;
- ausência de termos proibidos, de segredos e de dados pessoais.

Você também pode rodar o validador do projeto para detectar inconsistências:

```bash
node scripts/validar.mjs
```

Cite no Pull Request quais categorias do checklist foram verificadas.

## Convenção de branches

Todo trabalho nasce em uma branch própria, criada a partir da branch principal atualizada. Use um dos prefixos abaixo, com nome em `kebab-case`:

| Prefixo | Quando usar |
|---|---|
| `feature/` | Funcionalidade ou conteúdo novo (por exemplo, um novo prompt) |
| `fix/` | Correção de erro |
| `docs/` | Alteração apenas de documentação |
| `chore/` | Manutenção sem mudar comportamento (dependências, configuração) |
| `refactor/` | Reorganização sem mudar comportamento |
| `test/` | Criação ou ajuste de testes |

Exemplos: `feature/prompt-container-queries`, `fix/exemplo-css-grid`, `docs/ajuste-readme`.

Mantenha uma branch por assunto. Não acumule mudanças não relacionadas.

## Fluxo de alterações

### Pull Request obrigatório

Nenhuma alteração entra na branch principal por commit ou push direto. Toda mudança chega à branch principal somente por Pull Request, revisado e aprovado por uma pessoa.

1. Crie sua branch de trabalho.
2. Faça commits pequenos e com mensagens claras.
3. Envie a branch com rastreio do remoto: `git push -u origin <nome-da-branch>`.
4. Abra o Pull Request com título curto e objetivo.
5. Na descrição, informe o resumo da mudança, o que foi testado e o que ficou pendente.
6. Aguarde a revisão humana. O merge acontece pelo Pull Request, nunca localmente.

### Boas práticas com Git

- Adicione arquivos por nome, um a um ou em lista explícita:

  ```bash
  git add prompts/13-novo-prompt.md ebook/13-novo-prompt.md
  ```

  Nunca use `git add .`, para não incluir mudanças não relacionadas ou arquivos sensíveis por acidente.
- Antes de commitar, revise o que foi preparado com `git status` e `git diff --staged`.
- Não use `git push --force` na branch principal. Também evite `git reset --hard` e qualquer reescrita do histórico da branch principal.
- Não use `--no-verify`. Os hooks do Git devem sempre rodar.
- Prefira novos commits a `git commit --amend`, e só altere commits seus que ainda não foram enviados.

## O que não incluir

Para manter o projeto seguro e legalmente correto, não inclua nas contribuições:

- **Segredos**: chaves de API, tokens, senhas, certificados, arquivos `.env` com valores reais ou qualquer credencial.
- **Dados pessoais**: nomes, e-mails, telefones, documentos ou qualquer informação que identifique pessoas, inclusive em prompts e exemplos.
- **Conteúdo protegido por direitos autorais**: textos, imagens, trechos de livros, roteiros, logotipos ou código de terceiros sem licença que permita o uso.

Nos prompts de imagem, prefira descrições genéricas inspiradas em ficção científica espacial e evite nomes de personagens, logotipos e marcas registradas. O projeto não tem afiliação com os detentores dos direitos de Star Wars. Veja os detalhes em [AVISO-ETICO.md](AVISO-ETICO.md).

Se você perceber que um segredo ou dado pessoal foi enviado por engano, avise os mantenedores imediatamente e não tente apagar o histórico por conta própria.

## Conteúdo gerado com IA

Ao usar IA para escrever ou refinar conteúdo, revise tudo como pessoa responsável pelo texto, confira a correção dos exemplos CSS e respeite as orientações de [AVISO-IA.md](AVISO-IA.md).

## Dúvidas

Abra uma issue com sua pergunta. Para entender a estrutura do projeto e os comandos de build, consulte o [README.md](README.md).
