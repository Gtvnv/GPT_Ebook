# Capítulo 10: Variáveis CSS

A frota inteira vai trocar de identidade visual. Depois de uma longa viagem, o comando decidiu que as luzes azuis das naves devem dar lugar a um tom vermelho de alerta, e que o fundo escuro deve ficar ainda mais profundo. Você abre o arquivo de estilos e encontra o mesmo azul escrito em dezenas de lugares: nos sabres de luz, nos botões, nos contornos dos painéis.

Trocar tudo à mão seria um trabalho cansativo e cheio de riscos. Um valor esquecido, e uma nave brilha na cor errada. O que você precisa é de um painel central de controle, onde mudar uma cor uma única vez atualize a frota inteira.

É isso que as variáveis CSS, também chamadas de propriedades personalizadas, oferecem. Neste capítulo, você vai declará-las, usá-las com `var()`, entender o escopo e a herança, criar temas "luz" e "sombra" e até alterar valores com um pouco de JavaScript.

![Duas versões do mesmo painel de nave, uma com luzes azuis e outra com luzes vermelhas, mostrando a troca de tema](../assets/cap10-variaveis.png)

## Declarando e usando variáveis

Uma variável CSS é declarada com um nome que começa com dois hífens (`--`) e é lida com a função `var()`. O lugar mais comum para declarar variáveis globais é o seletor `:root`, que representa o elemento raiz do documento (equivalente ao `html`, porém com maior especificidade).

```css
:root {
  --cor-sabre: #3aa0ff;
  --cor-fundo-espaco: #05070f;
  --espaco-base: 1rem;
}

.sabre-de-luz {
  background-color: var(--cor-sabre);
  padding: var(--espaco-base);
}

body {
  background-color: var(--cor-fundo-espaco);
}
```

O nome da variável diferencia maiúsculas de minúsculas: `--Cor-Sabre` e `--cor-sabre` são variáveis diferentes. Dê nomes que descrevam o **papel** do valor (como `--cor-sabre`), e não só o valor (como `--azul`), pois o papel continua valendo se a cor mudar.

Ao contrário de variáveis de linguagens de programação, as variáveis CSS existem no navegador, em tempo de execução, e participam da cascata. Isso permite trocá-las dinamicamente.

## Valores de reserva

A função `var()` aceita um segundo argumento: o valor de reserva (fallback), usado quando a variável não está definida ou é inválida.

```css
.holocron {
  /* se --cor-holocron não existir, usa #7fd1ff */
  color: var(--cor-holocron, #7fd1ff);

  /* a reserva pode ser outra variável */
  border-color: var(--cor-borda-holocron, var(--cor-sabre, #3aa0ff));
}
```

Isso torna os componentes mais robustos: mesmo sem o tema carregado, o `.holocron` continua legível. Repare que, se o valor de reserva contém vírgulas, tudo depois da primeira vírgula é tratado como reserva, o que permite listas como `var(--fonte, "Segoe UI", sans-serif)`.

## Escopo e herança

Variáveis herdam como qualquer propriedade herdável. Se você declara uma variável em um seletor, ela vale para o elemento e para todos os seus descendentes. Declarar em `:root` torna a variável global; declarar em `.nave` a restringe àquela nave e seus filhos.

```css
:root {
  --cor-luz: #3aa0ff;
}

.nave {
  --cor-luz: #ff5a4d; /* redefine só dentro da .nave */
}

.sabre-de-luz {
  background-color: var(--cor-luz);
}
```

Um `.sabre-de-luz` fora de qualquer `.nave` usa o azul. Um `.sabre-de-luz` dentro de uma `.nave` usa o vermelho, porque encontra o valor mais próximo na árvore de elementos. Esse comportamento permite criar variações locais sem escrever novas regras para cada componente.

## Temas com variáveis

A grande vantagem das variáveis é a troca de tema. Você escreve os componentes uma vez, usando apenas `var()`, e cria os temas redefinindo as variáveis. Aqui, um atributo `data-tema` no elemento raiz alterna entre o lado "luz" e o lado "sombra".

```css
:root,
[data-tema="luz"] {
  --cor-fundo: #f2f6ff;
  --cor-texto: #0b1020;
  --cor-destaque: #3aa0ff;
}

[data-tema="sombra"] {
  --cor-fundo: #0b0508;
  --cor-texto: #ffe6e6;
  --cor-destaque: #ff3b30;
}

body {
  background-color: var(--cor-fundo);
  color: var(--cor-texto);
}

.sabre-de-luz {
  background-color: var(--cor-destaque);
  box-shadow: 0 0 12px var(--cor-destaque);
}
```

No HTML, basta escrever `<html data-tema="sombra">` para que todo o painel mude. O mesmo mecanismo pode seguir a preferência do sistema operacional:

```css
:root {
  --cor-fundo: #f2f6ff;
  --cor-texto: #0b1020;
}

@media (prefers-color-scheme: dark) {
  :root {
    --cor-fundo: #05070f;
    --cor-texto: #e6f1ff;
  }
}
```

Na prática, os dois podem ser combinados: a preferência do sistema define o ponto de partida, e o atributo `data-tema` permite que o usuário escolha manualmente.

## Variáveis e calc()

Variáveis guardam valores com unidades, e a função `calc()` faz contas com elas. Isso é ideal para criar escalas de espaçamento coerentes a partir de um único valor-base.

```css
:root {
  --espaco-base: 0.5rem;
  --espaco-1: var(--espaco-base);
  --espaco-2: calc(var(--espaco-base) * 2);
  --espaco-3: calc(var(--espaco-base) * 4);
}

.nave {
  padding: var(--espaco-2);
  margin-bottom: var(--espaco-3);
}

.holocron {
  width: calc(var(--espaco-base) * 10);
  height: calc(var(--espaco-base) * 10);
}
```

Se o comando decidir aumentar o respiro visual de todo o painel, basta mudar `--espaco-base`. Todas as medidas derivadas acompanham. Uma dica útil: variáveis que guardam números sem unidade (por exemplo `--escala: 1.5`) podem ser multiplicadas dentro de `calc()`, como `calc(1rem * var(--escala))`.

## Alterando variáveis com JavaScript

O foco deste livro é CSS, mas vale conhecer um pequeno recurso de JavaScript: alterar uma variável em tempo de execução. Com `element.style.setProperty`, você muda o valor e todos os elementos que dependem dele são atualizados.

```html
<button id="alternar">Alternar tema</button>
<script>
  const botao = document.getElementById("alternar");
  botao.addEventListener("click", () => {
    const raiz = document.documentElement;
    const atual = raiz.getAttribute("data-tema");
    raiz.setAttribute("data-tema", atual === "sombra" ? "luz" : "sombra");
  });

  // Alterar uma variável isolada:
  document.documentElement.style.setProperty("--cor-destaque", "#7fd1ff");
</script>
```

O primeiro trecho alterna o atributo `data-tema`, o que ativa as regras do CSS mostradas na seção anterior. A última linha altera diretamente o valor de `--cor-destaque`. Para ler o valor atual, use `getComputedStyle(elemento).getPropertyValue("--cor-destaque")`.

## Limitações e erros comuns

- **Não funcionam em media queries.** Você não pode escrever `@media (min-width: var(--ponto))`. Para isso, use valores literais (ou o recurso de consultas de contêiner, quando adequado).
- **Não substituem nomes de propriedade nem seletores.** Variáveis só entram onde um valor é esperado.
- **Diferem de variáveis de pré-processadores.** Em ferramentas como Sass, as variáveis são resolvidas na compilação e não existem no navegador. As variáveis CSS são vivas: mudam em tempo de execução e respeitam a cascata.
- **Valor inválido só aparece em uso.** Se `--espaco-base: azul` for usado em `padding`, a declaração é descartada ou cai no valor inicial, sem aviso. Teste no navegador.
- **Nomes sem critério.** Prefira um padrão (`--cor-*`, `--espaco-*`, `--fonte-*`) para facilitar a manutenção.
- **Esquecer a reserva.** Em componentes reutilizáveis, forneça `var(--nome, reserva)` sempre que fizer sentido.

## Missão prática

Crie um sistema de temas para o painel da frota.

1. Defina em `:root` as variáveis `--cor-fundo`, `--cor-texto`, `--cor-destaque` e `--espaco-base`.
2. Estilize `.nave`, `.sabre-de-luz` e `.holocron` usando apenas `var()`.
3. Crie um tema `[data-tema="sombra"]` que redefina as cores.
4. Derive pelo menos duas medidas de espaçamento com `calc()`.
5. Adicione um botão que alterne o tema (pode copiar a ideia do trecho de JavaScript deste capítulo).

Dica: se algum elemento não mudar de cor ao trocar o tema, procure uma cor escrita diretamente (como `#3aa0ff`) que ainda não foi trocada por uma variável.

## Resumo do capítulo

- Variáveis CSS são declaradas com `--nome` e lidas com `var(--nome, reserva)`.
- `:root` guarda variáveis globais; outros seletores criam variáveis locais que herdam para os filhos.
- O valor de reserva evita falhas quando a variável não existe.
- Temas são criados redefinindo variáveis, com `[data-tema]` ou `prefers-color-scheme`.
- `calc()` combina variáveis para montar escalas de espaçamento.
- `setProperty` altera variáveis em tempo de execução.
- Variáveis não funcionam em media queries e diferem das variáveis de pré-processadores.
