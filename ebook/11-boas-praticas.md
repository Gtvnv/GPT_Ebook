# Capítulo 11: Boas práticas

A base estelar começou pequena: três regras, uma nave e um sabre de luz. Foram chegando novos módulos, novos tripulantes e novos prazos. Cada pessoa acrescentou o seu pedaço de estilo no fim do arquivo, sem olhar o que já existia. Hoje, o arquivo tem milhares de linhas, e ninguém sabe ao certo o que acontece se uma regra for removida.

Quando alguém tenta mudar a cor de um botão, outra parte do painel muda junto. Quando alguém escreve uma regra nova, ela não surte efeito, porque uma regra antiga é mais forte. Para vencer o conflito, surgiram os `!important`, e a situação piorou. A equipe já chama o arquivo de "galáxia de seletores": vasta, confusa e perigosa de atravessar.

A boa notícia é que existe um mapa. Boas práticas não são regras rígidas, e sim hábitos que tornam o CSS previsível, fácil de ler e seguro de alterar. Neste capítulo, você vai organizar a base: estrutura de arquivos, nomes de classes, especificidade, acessibilidade e desempenho.

![Hangar organizado de uma base espacial com naves alinhadas e ferramentas etiquetadas, simbolizando código limpo](../assets/cap11-boas-praticas.png)

## Organização dos estilos

Uma ordem consistente evita surpresas, porque a cascata depende da sequência das regras. Uma organização comum, do mais geral ao mais específico, é:

1. **Reset ou normalização:** ajustes iniciais para reduzir diferenças entre navegadores.
2. **Variáveis:** cores, espaçamentos e fontes em `:root`.
3. **Base:** estilos de elementos (`body`, `a`, `h1`).
4. **Componentes:** `.nave`, `.sabre-de-luz`, `.holocron`.
5. **Utilitários:** classes pequenas e de uso pontual, como `.oculto`.

```css
/* 1. Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* 2. Variáveis */
:root {
  --cor-fundo-espaco: #05070f;
  --cor-texto: #e6f1ff;
  --cor-propulsor: #ff8a3a;
  --espaco-base: 1rem;
}

/* 3. Base */
body {
  margin: 0;
  background-color: var(--cor-fundo-espaco);
  color: var(--cor-texto);
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

/* 5. Utilitários */
.oculto {
  display: none;
}
```

Os componentes ficam entre a base e os utilitários. Em projetos maiores, cada bloco costuma morar em seu próprio arquivo, reunido depois por uma ferramenta de build ou por `@import`. Tanto faz o formato, desde que a equipe saiba onde procurar cada coisa.

## Nomenclatura com BEM

BEM significa Bloco, Elemento, Modificador. É uma convenção de nomes que deixa claro, só pelo seletor, o que cada classe faz:

- **Bloco:** componente independente, como `.nave`.
- **Elemento:** parte do bloco, separada por dois sublinhados, como `.nave__motor`.
- **Modificador:** variação do bloco ou do elemento, separada por dois hífens, como `.nave--danificada`.

```css
.nave {
  display: flex;
  gap: var(--espaco-base);
  padding: var(--espaco-base);
  background-color: #151b33;
}

.nave__motor {
  color: var(--cor-propulsor);
}

.nave--danificada {
  opacity: 0.7;
  border: 2px dashed #ff5a4d;
}
```

No HTML, ficaria `<article class="nave nave--danificada">` com um `<span class="nave__motor">` dentro. Como cada regra usa uma única classe, a especificidade é baixa e uniforme, e os conflitos diminuem. Escolha uma convenção (BEM não é a única) e seja consistente. Use nomes que descrevem função, e não aparência: `.alerta` envelhece melhor que `.vermelho`.

## Especificidade e cascata

Quando duas regras disputam a mesma propriedade, o navegador decide pela origem, depois pela **especificidade** e, em caso de empate, pela **ordem** (a última vence). A especificidade, de forma simplificada, pesa assim: estilos inline > IDs > classes, atributos e pseudoclasses > elementos e pseudoelementos.

```css
/* Conflito: a segunda regra tem especificidade maior */
.painel .nave {
  color: #e6f1ff;
}

.painel .nave.nave--danificada .nave__motor {
  color: #ff5a4d;
}

/* Quem escreve depois precisa usar uma regra ainda mais forte...
   e esse é o início do problema. */
```

Em vez de recorrer a `!important`, resolva na origem:

```css
/* Solução: seletores curtos, de uma classe só */
.nave__motor {
  color: var(--cor-propulsor);
}

.nave--danificada .nave__motor {
  color: #ff5a4d;
}
```

Agora a regra de modificador tem especificidade só um pouco maior, de propósito, e é fácil de prever. Regras gerais para manter a cascata saudável: evite IDs como seletores de estilo, evite aninhamento profundo e deixe `!important` para casos excepcionais, como utilitários que devem vencer qualquer outra regra.

## Antes e depois: refatorando

Veja três problemas frequentes: seletores muito aninhados, repetição de valores e números mágicos (valores sem explicação).

**Antes:**

```css
body div.painel ul li.nave a.link span.motor {
  color: #ff8a3a;
  margin-top: 17px;
}

.sabre-de-luz {
  background-color: #3aa0ff;
  box-shadow: 0 0 10px #3aa0ff;
}

.botao-sabre {
  border: 1px solid #3aa0ff;
}
```

**Depois:**

```css
:root {
  --cor-propulsor: #ff8a3a;
  --cor-sabre: #3aa0ff;
  --espaco-motor: 1rem;
}

.nave__motor {
  color: var(--cor-propulsor);
  margin-top: var(--espaco-motor);
}

.sabre-de-luz {
  background-color: var(--cor-sabre);
  box-shadow: 0 0 10px var(--cor-sabre);
}

.botao-sabre {
  border: 1px solid var(--cor-sabre);
}
```

O que mudou: o seletor longo virou uma única classe, que independe da estrutura do HTML. O azul, antes repetido em três lugares, agora vive em uma variável. E `17px` ganhou nome e significado. Se o design pedir outro azul, basta alterar `--cor-sabre`.

## Acessibilidade em CSS

O CSS pode ajudar ou atrapalhar a acessibilidade. Alguns cuidados essenciais:

- **Contraste:** o texto precisa de contraste suficiente com o fundo. As diretrizes WCAG indicam uma razão mínima de 4,5:1 para texto comum. Use uma ferramenta de verificação de contraste.
- **Foco visível:** quem navega com teclado precisa ver onde está. Nunca remova o contorno de foco sem oferecer um substituto.
- **Tamanhos relativos:** use `rem` e `em` em fontes, para respeitar a configuração do usuário.
- **Movimento reduzido:** respeite `prefers-reduced-motion`.

```css
.sabre-de-luz:focus-visible {
  outline: 3px solid #ffd54a;
  outline-offset: 3px;
}

.nave {
  font-size: 1rem;       /* acompanha a preferência de tamanho do usuário */
  color: #e6f1ff;        /* contraste alto sobre #05070f */
  background-color: #05070f;
}

@media (prefers-reduced-motion: reduce) {
  .holocron {
    animation: none;
  }
}
```

A pseudoclasse `:focus-visible` mostra o contorno quando ele é realmente útil, como na navegação por teclado, sem poluir os cliques com mouse. E esconder conteúdo com `display: none` também o esconde de leitores de tela; escolha a técnica conforme a intenção.

## Desempenho

O CSS é lido antes de a página aparecer, então o tamanho e a complexidade importam.

- **Seletores simples:** classes diretas são rápidas e legíveis. Evite cadeias longas e o seletor universal em lugares desnecessários.
- **Menos repetição:** variáveis, agrupamento de seletores e componentes reutilizáveis reduzem o arquivo.
- **Entrega eficiente:** em produção, minifique o CSS e carregue apenas o que a página usa. Dividir estilos críticos dos demais pode acelerar a primeira exibição.
- **Animações baratas:** prefira `transform` e `opacity`.

```css
/* Agrupar seletores evita repetir o mesmo bloco */
.nave__titulo,
.holocron__titulo,
.painel__titulo {
  font-weight: 700;
  letter-spacing: 0.04em;
}
```

Em geral, a legibilidade pesa mais do que microotimizações de seletor. Meça antes de otimizar.

## Comentários e formatação

Comentários devem explicar o **porquê**, não repetir o que o código já diz. Use um formato consistente: um seletor por linha, uma declaração por linha, recuo igual. Ferramentas como linters (por exemplo, Stylelint) e formatadores (como Prettier) automatizam essas verificações, mas não são obrigatórias para começar.

```css
/* O propulsor precisa ficar sobre o casco para o brilho aparecer */
.nave__motor {
  position: relative;
  z-index: 1;
}
```

## Erros comuns

- **Usar `!important` para vencer conflitos.** Isso empurra o problema para frente; reorganize os seletores.
- **IDs e seletores aninhados em excesso.** Aumentam a especificidade e acoplam o CSS ao HTML.
- **Remover o contorno de foco** (`outline: none`) sem substituto.
- **Números mágicos.** Valores soltos, sem nome, são difíceis de manter.
- **Nomes por aparência** (`.azul-grande`). Prefira nomes por função.
- **Regra "dogmática".** Convenções ajudam, mas se adaptam ao tamanho e ao ritmo da equipe.

## Lista de verificação do capítulo

- [ ] Os estilos seguem uma ordem clara (reset, variáveis, base, componentes, utilitários).
- [ ] As classes seguem uma convenção de nomes consistente.
- [ ] Não há `!important` sem justificativa.
- [ ] Cores e espaçamentos repetidos viraram variáveis.
- [ ] O foco do teclado está visível em todos os elementos interativos.
- [ ] O contraste do texto foi conferido.
- [ ] As animações respeitam `prefers-reduced-motion`.

## Missão prática

Resgate uma base com um arquivo de estilos desorganizado.

1. Pegue um trecho de CSS com seletores longos, cores repetidas e pelo menos um `!important`.
2. Mova as cores e os espaçamentos para variáveis em `:root`.
3. Renomeie as classes usando BEM, como `.nave`, `.nave__motor` e `.nave--danificada`.
4. Elimine o `!important` simplificando os seletores.
5. Acrescente um estilo de `:focus-visible` para os botões do painel.

Dica: comece pela cor que mais se repete, transformando-a em variável, e vá substituindo uma ocorrência por vez, conferindo o resultado no navegador a cada passo.

## Resumo do capítulo

- Organize os estilos do geral ao específico: reset, variáveis, base, componentes e utilitários.
- Use uma convenção de nomes, como BEM, para deixar a intenção clara.
- Mantenha a especificidade baixa e uniforme; evite `!important` e IDs como seletores.
- Refatore trocando seletores longos por classes, valores repetidos por variáveis e números mágicos por nomes.
- Cuide da acessibilidade: contraste, foco visível, unidades relativas e movimento reduzido.
- Priorize legibilidade, reduza repetição e meça antes de otimizar.
