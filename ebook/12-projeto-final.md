# Capítulo 12: Projeto final

A jornada começou em uma cabine apagada, com um arquivo de estilos vazio e uma pergunta simples: como dar forma a uma página? Desde então, você aprendeu a escolher elementos com seletores, a medir caixas, a combinar cores e fontes, a alinhar naves com Flexbox e Grid, a posicionar painéis, a animar luzes e a adaptar tudo a qualquer tela. Agora tem diante de si uma frota inteira de conhecimento.

Resta a última missão. O comando da frota precisa de um painel que reúna tudo: um menu sempre à vista, cartões com as naves disponíveis, um painel lateral de status, um holocron brilhante e a possibilidade de trocar o tema entre luz e sombra. O painel deve funcionar no comunicador de pulso e na sala de comando.

Não há atalhos nem peças novas. Você vai montar o Painel da Frota Estelar passo a passo, usando o que já domina. Ao final, terá uma página completa, responsiva e organizada, pronta para ser mostrada a qualquer pessoa.

![Painel final de uma frota espacial com cartões de naves, menu fixo e brilho holográfico em um layout organizado](../assets/cap12-projeto-final.png)

## Requisitos da missão

O painel deve ter:

- um **cabeçalho com menu fixo** no topo da janela;
- uma **seção principal com cartões de naves** organizados em Grid;
- um **painel lateral** de status construído com Flexbox;
- uma **animação de destaque** no `.holocron`;
- um **tema alternável** (luz e sombra) feito com variáveis CSS;
- **comportamento responsivo**, de uma coluna no comunicador a três colunas na sala de comando;
- código organizado, com nomes consistentes e foco visível para o teclado.

## Estrutura HTML

Salve o HTML abaixo como `index.html` e o CSS final como `estilos.css`, na mesma pasta. Não há dependências externas.

```html
<!DOCTYPE html>
<html lang="pt-BR" data-tema="sombra">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Painel da Frota Estelar</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <header class="menu-da-frota">
    <span class="menu-da-frota__marca">Frota Estelar</span>
    <nav class="menu-da-frota__navegacao" aria-label="Principal">
      <a href="#naves">Naves</a>
      <a href="#status">Status</a>
      <a href="#holocron">Holocron</a>
    </nav>
  </header>

  <div class="painel-da-frota">
    <main class="painel-da-frota__principal" id="naves">
      <h1 class="painel-da-frota__titulo">Painel da Frota Estelar</h1>

      <section class="naves" aria-label="Naves disponíveis">
        <article class="nave">
          <h2 class="nave__nome">Explorador</h2>
          <p class="nave__descricao">Nave de reconhecimento, leve e veloz.</p>
          <div class="sabre-de-luz" role="presentation"></div>
        </article>
        <article class="nave nave--danificada">
          <h2 class="nave__nome">Cargueiro</h2>
          <p class="nave__descricao">Em reparo no hangar 3.</p>
          <div class="sabre-de-luz" role="presentation"></div>
        </article>
        <article class="nave">
          <h2 class="nave__nome">Patrulheira</h2>
          <p class="nave__descricao">Responsável pela ronda do setor.</p>
          <div class="sabre-de-luz" role="presentation"></div>
        </article>
      </section>
    </main>

    <aside class="status" id="status" aria-label="Status da frota">
      <h2 class="status__titulo">Status</h2>
      <div class="status__item"><span>Energia</span><strong>92%</strong></div>
      <div class="status__item"><span>Escudos</span><strong>Ativos</strong></div>
      <div class="status__item" id="holocron">
        <span>Holocron</span>
        <div class="holocron" role="presentation"></div>
      </div>
      <button class="status__botao" type="button" id="alternar-tema">Alternar tema</button>
    </aside>
  </div>

  <script>
    // Alterna entre os temas "luz" e "sombra"
    document.getElementById("alternar-tema").addEventListener("click", function () {
      var raiz = document.documentElement;
      raiz.setAttribute("data-tema", raiz.getAttribute("data-tema") === "sombra" ? "luz" : "sombra");
    });
  </script>
</body>
</html>
```

Repare nas classes: `.painel-da-frota`, `.nave`, `.holocron`, `.sabre-de-luz` e outras seguem a convenção BEM do capítulo 11. O `<script>` é opcional, apenas para alternar o tema.

## Etapa 1: variáveis e reset

Comece pelo alicerce: o reset de `box-sizing` e as variáveis que definem os dois temas.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root,
[data-tema="sombra"] {
  --cor-fundo-espaco: #05070f;
  --cor-superficie: #151b33;
  --cor-texto: #e6f1ff;
  --cor-sabre: #3aa0ff;
  --cor-alerta: #ff5a4d;
  --altura-menu: 3.5rem;
  --espaco-base: 1rem;
}

[data-tema="luz"] {
  --cor-fundo-espaco: #f2f6ff;
  --cor-superficie: #ffffff;
  --cor-texto: #0b1020;
  --cor-sabre: #0b6cd1;
  --cor-alerta: #c0392b;
}
```

O tema "sombra" é o padrão, e o "luz" apenas redefine as cores. Os espaçamentos ficam definidos uma única vez. Como todo o resto usará `var()`, trocar o atributo `data-tema` muda a página inteira.

## Etapa 2: tipografia e cores

Agora, o corpo do texto, os títulos e os links.

```css
body {
  margin: 0;
  padding-top: var(--altura-menu);
  background-color: var(--cor-fundo-espaco);
  color: var(--cor-texto);
  font-family: system-ui, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

h1,
h2 {
  line-height: 1.2;
}

.painel-da-frota__titulo {
  margin-top: 0;
  font-size: clamp(1.5rem, 4vw + 0.5rem, 2.75rem);
}

a {
  color: var(--cor-sabre);
}

a:focus-visible,
button:focus-visible {
  outline: 3px solid #ffd54a;
  outline-offset: 3px;
}
```

O `padding-top` do `body` reserva o espaço do menu fixo que virá na etapa 4. O título usa `clamp()` para crescer de forma fluida, e o foco visível garante a navegação por teclado.

## Etapa 3: layout com Grid e Flexbox

O painel usa Grid para a área principal e Flexbox para o conteúdo interno. Primeiro, a versão mobile, com tudo em uma coluna.

```css
.painel-da-frota {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--espaco-base) * 1.5);
  max-width: 75rem;
  margin-inline: auto;
  padding: var(--espaco-base);
}

.naves {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--espaco-base);
}

.nave {
  padding: var(--espaco-base);
  background-color: var(--cor-superficie);
  border-radius: 0.5rem;
}

.nave--danificada {
  opacity: 0.75;
  border: 2px dashed var(--cor-alerta);
}

.status {
  display: flex;
  flex-direction: column;
  gap: var(--espaco-base);
  padding: var(--espaco-base);
  background-color: var(--cor-superficie);
  border-radius: 0.5rem;
}

.status__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

`.painel-da-frota` e `.naves` são grades; `.status` e `.status__item` são contêineres flexíveis. No `.status__item`, `justify-content: space-between` separa o rótulo do valor. A responsividade completa vem na etapa 6.

## Etapa 4: posicionamento

Agora, o menu fixo e o brilho do sabre de luz em cada nave.

```css
.menu-da-frota {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: var(--altura-menu);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--espaco-base);
  background-color: var(--cor-superficie);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.menu-da-frota__navegacao {
  display: flex;
  gap: var(--espaco-base);
}

.nave {
  position: relative; /* referência para filhos absolutos */
  overflow: hidden;
}

.sabre-de-luz {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  background-color: var(--cor-sabre);
  box-shadow: 0 0 12px var(--cor-sabre);
}
```

O menu usa `position: fixed` com `z-index` alto para ficar sobre o conteúdo. Cada `.nave` é `relative`, de modo que o `.sabre-de-luz` (absoluto) fique colado à sua borda inferior.

## Etapa 5: animações

Por fim, o holocron ganha vida com giro contínuo, e os cartões respondem ao ponteiro com uma transição. Tudo isso respeita a preferência de movimento reduzido.

```css
.holocron {
  width: 3rem;
  height: 3rem;
  background-color: var(--cor-sabre);
  box-shadow: 0 0 16px var(--cor-sabre);
  animation: girar 6s linear infinite;
}

@keyframes girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.nave {
  transition: transform 0.3s ease-out;
}

.nave:hover {
  transform: translateY(-4px);
}

.status__botao {
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.25rem;
  background-color: var(--cor-sabre);
  color: var(--cor-fundo-espaco);
  font: inherit;
  cursor: pointer;
}

@media (prefers-reduced-motion: reduce) {
  .holocron {
    animation: none;
  }

  .nave {
    transition: none;
  }
}
```

A animação usa apenas `transform`, que é eficiente. A media query `prefers-reduced-motion` desliga o giro e a transição para quem pede menos movimento.

## Etapa 6: responsividade

Com a base mobile pronta, as telas maiores recebem as melhorias.

```css
@media (min-width: 640px) {
  .naves {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .painel-da-frota {
    grid-template-columns: 1fr 18rem; /* área principal + painel lateral */
    align-items: start;
  }

  .naves {
    grid-template-columns: repeat(3, 1fr);
  }

  .status {
    position: sticky;
    top: calc(var(--altura-menu) + var(--espaco-base));
  }
}
```

Em telas a partir de 640px, os cartões ficam em duas colunas. A partir de 1024px, o painel ganha duas áreas (principal e lateral), os cartões passam para três colunas e o painel de status gruda abaixo do menu durante a rolagem, graças ao `position: sticky`. Os pontos de quebra vieram da observação do conteúdo, como vimos no capítulo 9.

## CSS completo

Abaixo, o arquivo `estilos.css` consolidado, na ordem recomendada pelo capítulo 11: reset, variáveis, base, componentes, animações e responsividade.

```css
/* ===== Reset ===== */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* ===== Variáveis e temas ===== */
:root,
[data-tema="sombra"] {
  --cor-fundo-espaco: #05070f;
  --cor-superficie: #151b33;
  --cor-texto: #e6f1ff;
  --cor-sabre: #3aa0ff;
  --cor-alerta: #ff5a4d;
  --altura-menu: 3.5rem;
  --espaco-base: 1rem;
}

[data-tema="luz"] {
  --cor-fundo-espaco: #f2f6ff;
  --cor-superficie: #ffffff;
  --cor-texto: #0b1020;
  --cor-sabre: #0b6cd1;
  --cor-alerta: #c0392b;
}

/* ===== Base ===== */
body {
  margin: 0;
  padding-top: var(--altura-menu);
  background-color: var(--cor-fundo-espaco);
  color: var(--cor-texto);
  font-family: system-ui, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

h1,
h2 {
  line-height: 1.2;
}

a {
  color: var(--cor-sabre);
}

a:focus-visible,
button:focus-visible {
  outline: 3px solid #ffd54a;
  outline-offset: 3px;
}

/* ===== Menu da frota ===== */
.menu-da-frota {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  height: var(--altura-menu);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--espaco-base);
  background-color: var(--cor-superficie);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.menu-da-frota__navegacao {
  display: flex;
  gap: var(--espaco-base);
}

/* ===== Painel e naves ===== */
.painel-da-frota {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--espaco-base) * 1.5);
  max-width: 75rem;
  margin-inline: auto;
  padding: var(--espaco-base);
}

.painel-da-frota__titulo {
  margin-top: 0;
  font-size: clamp(1.5rem, 4vw + 0.5rem, 2.75rem);
}

.naves {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--espaco-base);
}

.nave {
  position: relative;
  overflow: hidden;
  padding: var(--espaco-base);
  background-color: var(--cor-superficie);
  border-radius: 0.5rem;
  transition: transform 0.3s ease-out;
}

.nave:hover {
  transform: translateY(-4px);
}

.nave--danificada {
  opacity: 0.75;
  border: 2px dashed var(--cor-alerta);
}

.sabre-de-luz {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  background-color: var(--cor-sabre);
  box-shadow: 0 0 12px var(--cor-sabre);
}

/* ===== Painel lateral ===== */
.status {
  display: flex;
  flex-direction: column;
  gap: var(--espaco-base);
  padding: var(--espaco-base);
  background-color: var(--cor-superficie);
  border-radius: 0.5rem;
}

.status__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status__botao {
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.25rem;
  background-color: var(--cor-sabre);
  color: var(--cor-fundo-espaco);
  font: inherit;
  cursor: pointer;
}

/* ===== Holocron e animações ===== */
.holocron {
  width: 3rem;
  height: 3rem;
  background-color: var(--cor-sabre);
  box-shadow: 0 0 16px var(--cor-sabre);
  animation: girar 6s linear infinite;
}

@keyframes girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .holocron {
    animation: none;
  }

  .nave {
    transition: none;
  }
}

/* ===== Responsividade ===== */
@media (min-width: 640px) {
  .naves {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .painel-da-frota {
    grid-template-columns: 1fr 18rem;
    align-items: start;
  }

  .naves {
    grid-template-columns: repeat(3, 1fr);
  }

  .status {
    position: sticky;
    top: calc(var(--altura-menu) + var(--espaco-base));
  }
}
```

## Lista de verificação

Confira o resultado no navegador:

- [ ] O menu fica preso ao topo durante a rolagem e não cobre o título.
- [ ] Em tela estreita, as naves aparecem em uma coluna; em telas maiores, em duas e depois em três.
- [ ] A partir de 1024px, o painel de status fica ao lado e acompanha a rolagem.
- [ ] O holocron gira e, com movimento reduzido ativado no sistema, fica parado.
- [ ] O botão "Alternar tema" muda as cores de toda a página.
- [ ] Todos os links e botões mostram contorno ao receber foco pelo teclado.
- [ ] O texto tem contraste suficiente nos dois temas.

## Sugestões de extensão

- Adicione mais naves e use `repeat(auto-fit, minmax(14rem, 1fr))` para dispensar os pontos de quebra.
- Crie um terceiro tema com novas variáveis de cor.
- Anime a entrada dos cartões com `@keyframes` e `animation-delay` escalonado.
- Inclua uma imagem em cada nave, com `max-width: 100%` e `object-fit`.
- Use `@container` para que o cartão mude de layout conforme o espaço disponível.

## Revisão dos capítulos

| Conceito usado no projeto | Onde foi estudado |
| --- | --- |
| Introdução, regras e `link` do CSS | Capítulo 1 |
| Seletores de classe, atributo e pseudoclasses | Capítulo 2 |
| Modelo de caixa, `box-sizing`, `padding`, `border` | Capítulo 3 |
| Cores, fontes e `clamp()` para títulos | Capítulo 4 |
| Flexbox no menu e no painel de status | Capítulo 5 |
| Grid no painel e nos cartões | Capítulo 6 |
| `fixed`, `sticky`, `relative`, `absolute` e `z-index` | Capítulo 7 |
| Transições, `@keyframes` e movimento reduzido | Capítulo 8 |
| Mobile first, media queries e unidades relativas | Capítulo 9 |
| Variáveis, temas e `calc()` | Capítulo 10 |
| BEM, especificidade baixa e foco visível | Capítulo 11 |

## Próximos passos

Você chegou ao fim do roteiro, mas o estudo de CSS continua. Algumas direções possíveis:

- **Pré-processadores** (como Sass) para organizar projetos grandes.
- **Frameworks e bibliotecas** de interface, depois de entender bem os fundamentos que você acabou de praticar.
- **Acessibilidade avançada:** leitores de tela, ordem de foco, contraste em todos os estados e testes com pessoas reais.
- **Recursos modernos:** consultas de contêiner, `:has()`, camadas de cascata (`@layer`) e animações guiadas pela rolagem, sempre conferindo o suporte dos navegadores.
- **Prática constante:** reproduzir interfaces que você admira e publicar seus experimentos.

A frota está pronta, e o painel é seu. Que as próximas páginas que você construir sejam claras, acessíveis e cheias de luz.
