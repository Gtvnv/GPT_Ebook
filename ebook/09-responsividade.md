# Capítulo 9: Responsividade

A frota está espalhada por vários setores, e as informações precisam chegar a todos os tripulantes ao mesmo tempo. Na ponte de comando, um monitor enorme exibe o painel completo, com mapas, listas de naves e alertas lado a lado. No corredor, o oficial de plantão consulta o mesmo painel em um comunicador de pulso, com uma tela do tamanho de um cartão.

O painel é o mesmo, mas as telas são muito diferentes. Se o layout foi pensado só para o monitor grande, o comunicador vai exibir letras minúsculas e barras de rolagem horizontais. Se foi pensado só para o comunicador, o monitor vai mostrar uma coluna estreita e uma enorme faixa vazia.

Design responsivo é a resposta: uma única página que se adapta ao espaço disponível. Neste capítulo, você vai aprender a configurar a janela de visualização, adotar a abordagem mobile first, escrever media queries, usar unidades relativas e tornar imagens fluidas. Ao final, o `.painel-da-frota` vai se comportar bem do comunicador à sala de comando.

![Painel de comando de frota espacial exibido em telas de tamanhos diferentes, de comunicador de pulso a grande monitor](../assets/cap09-responsividade.png)

## A meta tag viewport

Em telas de celular, o navegador finge que a página tem cerca de 980px de largura e a reduz para caber. Isso quebra qualquer layout responsivo. A meta tag `viewport` desliga esse comportamento e diz ao navegador para usar a largura real do dispositivo.

Ela é escrita no HTML, dentro do `<head>`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Painel da Frota</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <main class="painel-da-frota">
    <article class="nave">Nave 1</article>
    <article class="nave">Nave 2</article>
    <article class="nave">Nave 3</article>
  </main>
</body>
</html>
```

`width=device-width` ajusta a largura da página à da tela, e `initial-scale=1` define o zoom inicial. Evite `user-scalable=no` e `maximum-scale`, pois impedem o zoom e prejudicam a acessibilidade.

## Mobile first

Na abordagem mobile first, você escreve primeiro o CSS para a tela menor e, depois, usa media queries com `min-width` para acrescentar melhorias conforme o espaço cresce. O CSS base fica simples, e as telas maiores recebem camadas extras.

```css
.painel-da-frota {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .painel-da-frota {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

No comunicador, as naves aparecem em uma coluna. A partir de 768px, o painel passa a ter três colunas de largura igual. Repare que a regra base não precisa de media query: ela vale para todos.

Como escolher os pontos de quebra? Pelo **conteúdo**, não por aparelhos. Redimensione a janela e observe: quando o layout começa a ficar apertado ou esticado demais, é hora de uma quebra. Valores como 600px, 768px e 1024px são pontos de partida comuns, mas não verdades absolutas; aparelhos novos surgem o tempo todo.

## Media queries

Uma media query aplica regras apenas quando uma condição é verdadeira. As condições mais usadas são:

- `min-width`: vale a partir de uma largura mínima (mobile first).
- `max-width`: vale até uma largura máxima.
- `orientation`: `portrait` (retrato) ou `landscape` (paisagem).
- `prefers-color-scheme`: tema claro ou escuro preferido pelo usuário.

```css
.nave {
  padding: 1rem;
  background-color: #151b33;
  color: #e6f1ff;
}

/* A partir de telas médias, as naves ganham mais espaço */
@media (min-width: 768px) {
  .nave {
    padding: 1.5rem;
  }
}

/* Em telas deitadas e baixas, o holocron diminui */
@media (orientation: landscape) and (max-height: 500px) {
  .holocron {
    width: 40px;
    height: 40px;
  }
}

/* Respeita o tema claro do sistema */
@media (prefers-color-scheme: light) {
  .nave {
    background-color: #f2f6ff;
    color: #0b1020;
  }
}
```

É possível combinar condições com `and`, separar alternativas com vírgula (equivalente a "ou") e negar com `not`. Também é possível escrever faixas com a sintaxe moderna, como `@media (600px <= width <= 1024px)`, que já tem bom suporte em navegadores atuais.

## Unidades relativas e clamp()

Pixels são fixos. Unidades relativas se ajustam ao contexto:

- `%`: relativo ao tamanho do elemento pai.
- `em`: relativo ao tamanho da fonte do próprio elemento.
- `rem`: relativo ao tamanho da fonte do elemento raiz (`html`); ótimo para espaçamentos e fontes consistentes.
- `vw` e `vh`: 1% da largura e da altura da janela, respectivamente.

A função `clamp(mínimo, ideal, máximo)` junta tudo: o valor ideal cresce com a tela, mas nunca passa dos limites.

```css
.painel-da-frota {
  max-width: 70rem;
  margin-inline: auto;
  padding: 1rem;
}

.painel-da-frota h1 {
  /* nunca menor que 1.5rem, nunca maior que 3rem, e cresce com a largura */
  font-size: clamp(1.5rem, 4vw + 0.5rem, 3rem);
}

.sala-de-comando {
  min-height: 100vh; /* ocupa pelo menos a altura da janela */
}
```

O título cresce de forma fluida entre 1,5rem e 3rem, sem precisar de media queries. A combinação `max-width` com `margin-inline: auto` centraliza o painel e impede que ele estique demais em monitores grandes.

## Imagens fluidas

Uma imagem com largura fixa pode estourar o contêiner em telas pequenas. A regra clássica resolve isso:

```css
.nave img,
.holocron img {
  max-width: 100%;  /* nunca passa da largura do contêiner */
  height: auto;     /* mantém a proporção */
  display: block;   /* remove o espaço extra de elementos em linha */
}

.nave__foto {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover; /* corta o excesso em vez de distorcer */
}
```

Com `max-width: 100%` e `height: auto`, a imagem encolhe junto com o contêiner e preserva a proporção. Já `object-fit: cover` preenche uma área fixa sem distorcer, e `aspect-ratio` reserva o espaço antes do carregamento, evitando saltos no layout. Aplicando isso à imagem deste capítulo, ela se ajusta bem tanto no comunicador quanto no monitor.

## Consultas de contêiner

Media queries olham para a janela. Às vezes, o que importa é o tamanho do **contêiner** em que o componente está. As consultas de contêiner (`@container`) resolvem isso: um cartão de nave pode mudar de layout conforme o espaço que recebeu, esteja ele em uma coluna estreita ou em uma área larga.

```css
.coluna-da-frota {
  container-type: inline-size;
  container-name: frota;
}

.nave {
  display: block;
}

@container frota (min-width: 400px) {
  .nave {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}
```

A `.coluna-da-frota` declara que pode ser consultada. Quando a largura dela chega a 400px, a `.nave` dentro dela passa a ser exibida em linha. Esse recurso é relativamente recente: verifique o suporte nos navegadores que você precisa atender (por exemplo, em caniuse.com) e tenha um layout básico como alternativa.

## Erros comuns

- **Esquecer a meta tag `viewport`.** Em celulares, as media queries parecem não funcionar.
- **Pontos de quebra baseados em aparelhos.** Prefira quebras guiadas pelo conteúdo.
- **Largura fixa em pixels para contêineres.** Use `max-width` e porcentagens.
- **Misturar `min-width` e `max-width` sem critério.** Escolha uma direção (preferencialmente mobile first) e mantenha a coerência.
- **Fonte pequena demais em telas de toque.** Mantenha textos legíveis e áreas clicáveis com pelo menos cerca de 44px.
- **Rolagem horizontal inesperada.** Quase sempre vem de uma largura fixa ou de uma imagem sem `max-width: 100%`.

## Missão prática

Torne o painel de uma frota responsivo.

1. Crie um `.painel-da-frota` com seis `.nave` dentro.
2. No comunicador, exiba uma coluna; a partir de 600px, duas colunas; a partir de 1024px, três.
3. Faça o título principal usar `clamp()` para crescer de forma fluida.
4. Inclua uma imagem em cada nave que nunca ultrapasse a largura do cartão.
5. Teste redimensionando a janela do navegador e usando as ferramentas de desenvolvedor.

Dica: use `grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr))` como alternativa que dispensa media queries, e compare o resultado com a versão que usa pontos de quebra.

## Resumo do capítulo

- A meta tag `viewport` é obrigatória para um layout responsivo em dispositivos móveis.
- Mobile first: escreva o CSS base para telas pequenas e acrescente melhorias com `min-width`.
- Escolha pontos de quebra pelo conteúdo, não por modelos de aparelho.
- Media queries também reagem a orientação e a preferências, como `prefers-color-scheme`.
- Unidades relativas (`%`, `rem`, `vw`, `vh`) e `clamp()` criam tipografia e espaçamentos fluidos.
- Imagens fluidas usam `max-width: 100%` e `height: auto`; `object-fit` evita distorção.
- `@container` permite adaptar componentes ao espaço do contêiner; verifique o suporte antes de usar.
