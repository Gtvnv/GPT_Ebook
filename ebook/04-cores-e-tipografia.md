# Capítulo 4: Cores e tipografia

![Letreiro dourado em perspectiva sobre um fundo estrelado e uma paleta de cores azul e vermelha](../assets/cap04-tipografia.png)

## Cena de abertura: aliados ou inimigos?

No radar, dezenas de naves se aproximam. O(a) aprendiz precisa decidir em segundos quem é aliado e quem é inimigo. As naves aliadas brilham em azul e verde; as hostis, em vermelho e preto. Os letreiros nos cascos identificam cada uma, mas só funcionam se forem **legíveis**.

No CSS, cor e tipografia fazem esse trabalho: comunicam significado e garantem que o texto possa ser lido por todos. Neste capítulo você vai aprender a escolher, escrever e combinar essas ferramentas.

## Formatos de cor

O CSS aceita várias notações para a mesma cor. Veja o azul do `.sabre-de-luz` escrito de cinco formas equivalentes (ou muito próximas):

```css
.sabre-de-luz {
  color: deepskyblue;               /* nome */
}

.sabre-de-luz {
  color: #00bfff;                   /* hexadecimal */
}

.sabre-de-luz {
  color: rgb(0 191 255);            /* vermelho, verde, azul */
}

.sabre-de-luz {
  color: rgb(0 191 255 / 50%);      /* com transparência */
}

.sabre-de-luz {
  color: hsl(195 100% 50%);         /* matiz, saturação, luminosidade */
}
```

Explicação: as regras acima são alternativas; em um projeto real você escolheria apenas uma. A notação `rgb()` mistura os canais de 0 a 255. A barra seguida de porcentagem define a opacidade (alfa). Em `hsl()`, o primeiro valor é o **matiz** em graus (0 a 360 na roda de cores), o segundo é a **saturação** e o terceiro a **luminosidade**. A forma `hsl` facilita criar variações: basta mexer na luminosidade para clarear ou escurecer.

| Formato | Exemplo | Quando usar |
|---|---|---|
| Nome | `deepskyblue` | Testes rápidos; poucas cores disponíveis |
| Hexadecimal | `#00bfff` | Padrão comum em ferramentas de design |
| `rgb()` / `rgba()` | `rgb(0 191 255 / 50%)` | Quando precisa de transparência |
| `hsl()` | `hsl(195 100% 50%)` | Criar paletas e variações de tom |

## Fundos e gradientes

`background-color` pinta o fundo com uma cor sólida. `background-image` aceita imagens e **gradientes**, que são imagens geradas pelo próprio CSS.

```css
.sabre-de-luz {
  background: linear-gradient(90deg, #e3f2fd, #29b6f6);
  color: hsl(200 90% 20%);
  box-shadow: 0 0 12px #29b6f6;
}
```

O `linear-gradient` vai da esquerda para a direita (90deg), do azul quase branco, que é o núcleo do sabre, até o azul vivo. O texto escuro em `hsl` fica legível sobre o fundo claro, e `box-shadow` cria o brilho ao redor.

Para o céu estrelado, combine um gradiente radial e um fundo escuro:

```css
.espaco {
  background-color: #050816;
  background-image: radial-gradient(circle at 30% 20%, #1a237e 0%, transparent 60%);
  min-height: 200px;
}
```

O `radial-gradient` desenha uma nebulosa azul que parte de um ponto (30% da largura, 20% da altura) e se dissolve em transparente. O fundo escuro aparece por baixo.

## Contraste e acessibilidade

Cor bonita não basta: o texto precisa se destacar do fundo. As diretrizes de acessibilidade web (WCAG) recomendam uma razão de contraste mínima de **4,5:1** para texto comum (nível AA) e 3:1 para texto grande.

Exemplo ruim e exemplo bom:

```css
/* RUIM: cinza-claro sobre branco, contraste muito baixo (cerca de 2,3:1) */
.letreiro-ruim {
  background-color: #ffffff;
  color: #aaaaaa;
}

/* BOM: azul-claro sobre azul-marinho, contraste muito alto */
.letreiro-bom {
  background-color: #0b1d3a;
  color: #e3f2fd;
}
```

O primeiro letreiro cansa a vista e é quase ilegível para quem tem baixa visão ou usa a tela sob sol forte. O segundo passa folgado no critério. Ferramentas como o inspetor de cores do navegador mostram a razão de contraste de qualquer par. Nunca use apenas a cor para transmitir uma informação (por exemplo, só vermelho para "perigo"); acompanhe com texto ou ícone.

## Fontes

A propriedade `font-family` recebe uma **pilha de fontes**. O navegador usa a primeira disponível, e a última deve ser uma família genérica de reserva (*fallback*).

```css
.nave {
  font-family: "Trebuchet MS", Verdana, sans-serif;
}

.codigo-de-bordo {
  font-family: "Courier New", monospace;
}
```

Se "Trebuchet MS" não existir no dispositivo, tenta-se Verdana; se também faltar, cai na `sans-serif` do sistema.

Para usar uma fonte própria (livre, com licença que permita), declare-a com `@font-face`:

```css
@font-face {
  font-family: "FonteDaFrota";
  src: url("fontes/fonte-da-frota.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

.letreiro {
  font-family: "FonteDaFrota", Arial, sans-serif;
}
```

Explicação: `@font-face` registra o nome `FonteDaFrota` apontando para o arquivo. `font-display: swap` mostra o texto com a fonte reserva enquanto a nova carrega, evitando tela em branco. Mantenha sempre fontes de reserva na pilha. Também é possível carregar fontes hospedadas por um serviço via `@import` ou `<link>`, desde que a licença permita.

## Unidades de fonte

```css
body {
  font-size: 100%;        /* base: normalmente 16px */
  line-height: 1.5;
}

.titulo {
  font-size: 2rem;        /* 2 x 16px = 32px */
}

.legenda {
  font-size: 0.875em;     /* 87,5% do tamanho do elemento pai */
}
```

| Unidade | Relativa a | Observação |
|---|---|---|
| `px` | Pixel fixo | Previsível, mas ignora a preferência de tamanho do usuário em alguns casos |
| `em` | Tamanho de fonte do elemento pai | Pode acumular em elementos aninhados |
| `rem` | Tamanho de fonte da raiz (`html`) | Previsível e respeita preferências do usuário |

Recomendação: use `rem` para tamanhos de fonte e espaçamentos globais, e `em` para ajustes locais que devem acompanhar o texto. O `line-height` é melhor **sem unidade** (como `1.5`): o valor é multiplicado pelo tamanho da fonte de cada elemento, o que evita surpresas na herança. Um `font-weight` de `400` é o normal e `700` é o negrito.

## Efeitos de texto

Agora o `.letreiro`, no estilo de uma abertura cinematográfica, sem reproduzir logotipos ou marcas:

```css
.letreiro {
  font-family: Arial, sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ffd54f;
  background-color: #050816;
  padding: 24px;
  text-shadow: 0 0 10px rgba(255, 213, 79, 0.6);
}
```

Explicação:

- `text-align: center` centraliza o texto na horizontal;
- `text-transform: uppercase` transforma tudo em maiúsculas sem alterar o HTML;
- `letter-spacing` aumenta o espaço entre as letras, dando um ar épico;
- `text-shadow` (deslocamento horizontal, vertical, desfoque e cor) cria um brilho dourado;
- o amarelo `#ffd54f` sobre o fundo `#050816` tem contraste altíssimo.

## Missão prática

Crie um **cartão de personagem genérico** (sem usar nomes de personagens conhecidos) com título, subtítulo e um parágrafo. Requisitos:

- fundo escuro e texto claro, com contraste adequado (acima de 4,5:1);
- título em `rem`, em maiúsculas, com `letter-spacing`;
- subtítulo em cor de destaque;
- parágrafo com `line-height: 1.6`.

HTML de apoio:

```html
<article class="cartao-personagem">
  <h2>Piloto Estelar</h2>
  <h3>Esquadrão Alfa</h3>
  <p>Especialista em manobras evasivas e navegação por mapas estelares.</p>
</article>
```

Uma possível solução:

```css
.cartao-personagem {
  max-width: 320px;
  padding: 24px;
  background-color: #0b1d3a;
  color: #e3f2fd;
  font-family: "Trebuchet MS", Verdana, sans-serif;
  border-left: 6px solid #29b6f6;
}

.cartao-personagem h2 {
  font-size: 1.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 4px;
}

.cartao-personagem h3 {
  font-size: 1rem;
  font-weight: 400;
  color: #ffd54f;
  margin: 0 0 16px;
}

.cartao-personagem p {
  line-height: 1.6;
  margin: 0;
}
```

Teste no navegador e use o inspetor para conferir a razão de contraste do texto principal.

## Resumo

- Cores podem ser escritas por nome, hexadecimal, `rgb()` e `hsl()`; a barra `/` adiciona transparência.
- `linear-gradient` e `radial-gradient` criam fundos sem imagens externas.
- Contraste mínimo recomendado pela WCAG para texto comum: **4,5:1**.
- `font-family` usa pilha de fontes com *fallback*; `@font-face` registra fontes próprias.
- Prefira `rem` e `line-height` sem unidade.
- `text-align`, `text-transform`, `letter-spacing` e `text-shadow` dão personalidade ao texto.

No Capítulo 5 você aprenderá a alinhar e distribuir elementos com o **Flexbox**: a formação de voo da sua frota.
