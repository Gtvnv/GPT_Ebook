# Capítulo 8: Transições e animações

Os sistemas da nave estão desligados. O hangar está em silêncio, e a única luz vem de uma fresta no teto. Você estende a mão para o painel e aciona o primeiro interruptor. Nada de piscar bruscamente: a energia sobe aos poucos, as luzes do corredor ganham brilho e o zumbido do reator cresce até virar um ronco constante.

No cinto, o cabo do seu sabre de luz espera. Ao acioná-lo, a lâmina não aparece de uma vez; ela se estende, devagar, até atingir o comprimento total. Essa suavidade é o que dá vida à cena. Sem ela, tudo seria um liga-desliga seco.

Em CSS, essa suavidade tem nome: transições e animações. As transições cuidam de mudanças entre dois estados, como "apagado" e "aceso". As animações vão além e descrevem sequências inteiras, que podem repetir para sempre. Neste capítulo, você vai acender uma lâmina, fazer uma nave decolar e deixar um holocron girando e flutuando.

![Sabre de luz genérico brilhando em um corredor escuro de nave espacial, com rastros de luz em movimento](../assets/cap08-animacoes.png)

## Transições suaves

Uma transição diz ao navegador: "quando esta propriedade mudar, não pule para o valor novo; vá até lá aos poucos". Ela depende de dois estados, o inicial e o final, que normalmente são separados por uma pseudoclasse como `:hover` ou `:focus`.

```css
.sabre-de-luz {
  height: 4px;
  width: 0;
  background-color: #3aa0ff;
  transition: width 0.6s ease-in-out;
}

.sabre-de-luz:hover,
.sabre-de-luz:focus {
  width: 200px;
}
```

A regra `transition: width 0.6s ease-in-out` significa: anime a propriedade `width`, em 0,6 segundo, com a curva `ease-in-out`. Quando o ponteiro passa por cima (ou o elemento recebe o foco), a largura vai de 0 a 200px suavemente. Ao tirar o ponteiro, ela volta com a mesma suavidade, porque a transição está declarada no estado base.

A forma abreviada reúne quatro propriedades:

```css
.sabre-de-luz {
  transition-property: width, background-color; /* o que animar */
  transition-duration: 0.6s, 0.3s;              /* quanto tempo leva */
  transition-timing-function: ease-in-out;      /* a curva de velocidade */
  transition-delay: 0.1s;                       /* espera antes de começar */
}
```

Quando há várias propriedades, as listas são lidas em pares, na mesma ordem. Se uma lista for mais curta que a de `transition-property`, ela se repete.

Atenção: `display` não é animável, e nem toda propriedade pode ser interpolada. Prefira valores numéricos e cores.

## Transformações

A propriedade `transform` altera a aparência de um elemento sem mexer no fluxo da página. Os vizinhos não se movem, e o desenho é feito pela placa gráfica, o que o torna bem eficiente.

```css
.nave {
  transition: transform 0.8s ease-out;
}

.nave:hover {
  /* move 120px para a direita, gira 15 graus e aumenta 10% */
  transform: translateX(120px) rotate(15deg) scale(1.1);
}
```

As funções mais usadas são:

- `translate(x, y)`, `translateX()` e `translateY()`: deslocam o elemento.
- `rotate(ângulo)`: gira, em unidades como `deg` ou `turn`.
- `scale(fator)`: amplia ou reduz; `1` é o tamanho original.

A ordem importa. As funções são aplicadas da direita para a esquerda em relação ao sistema de coordenadas, então `rotate(45deg) translateX(100px)` leva o elemento a um lugar diferente de `translateX(100px) rotate(45deg)`. Para mudar o ponto de giro, use `transform-origin`.

## Animações com @keyframes

Quando duas posições não bastam, use animações. Primeiro, defina os quadros-chave com `@keyframes`. Depois, aplique-os com `animation`.

```css
@keyframes girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.holocron {
  width: 64px;
  height: 64px;
  background-color: #3aa0ff;
  animation-name: girar;
  animation-duration: 4s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
```

O bloco `@keyframes girar` descreve o início (`from`, ou `0%`) e o fim (`to`, ou `100%`). Na classe `.holocron`, `animation-name` aponta para o nome dos quadros, `animation-duration` define o tempo de um ciclo e `animation-iteration-count: infinite` repete sem parar.

Para sequências com mais etapas, use porcentagens. Veja o brilho pulsante de um propulsor, com a forma abreviada de `animation`:

```css
@keyframes pulsar {
  0%   { opacity: 0.6; box-shadow: 0 0 6px #ff8a3a; }
  50%  { opacity: 1;   box-shadow: 0 0 24px #ff8a3a; }
  100% { opacity: 0.6; box-shadow: 0 0 6px #ff8a3a; }
}

.propulsor {
  width: 40px;
  height: 14px;
  background-color: #ff8a3a;
  /* nome duração curva atraso repetições direção */
  animation: pulsar 1.2s ease-in-out 0s infinite alternate;
}
```

Outras propriedades úteis:

- `animation-direction`: `normal`, `reverse`, `alternate` (vai e volta) e `alternate-reverse`.
- `animation-fill-mode`: `forwards` mantém o último quadro ao terminar; `backwards` aplica o primeiro quadro durante o atraso; `both` combina os dois.
- `animation-delay`: espera antes de começar.
- `animation-play-state`: `running` ou `paused`.

## Curvas de tempo

A curva define como a velocidade varia ao longo da duração. Compare, em texto, as principais:

- `linear`: velocidade constante, do início ao fim. Boa para giros contínuos.
- `ease`: começa devagar, acelera no meio e desacelera no fim. É o padrão.
- `ease-in`: começa devagar e termina rápido. Parece uma nave ganhando impulso.
- `ease-out`: começa rápido e termina devagar. Parece uma nave que freia ao chegar.
- `ease-in-out`: lento nas duas pontas e rápido no meio.
- `cubic-bezier(x1, y1, x2, y2)`: curva personalizada.
- `steps(n)`: salta em `n` passos, sem interpolar; serve para efeitos "quadro a quadro".

```css
.nave {
  transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1); /* arranque forte e pouso suave */
}

.indicador {
  animation: piscar 1s steps(2, start) infinite; /* liga e desliga, sem suavizar */
}

@keyframes piscar {
  to {
    visibility: hidden;
  }
}
```

A função `steps(2, start)` divide o ciclo em dois saltos. O indicador alterna entre visível e oculto, como uma luz de alerta de painel.

## Desempenho e acessibilidade

**Desempenho.** Nem todas as propriedades custam o mesmo. Alterar `width`, `height`, `top` ou `margin` obriga o navegador a recalcular o layout a cada quadro. Já `transform` e `opacity` costumam ser tratadas pela placa gráfica, sem recalcular o layout, e rendem animações mais fluidas. Sempre que possível, anime essas duas.

```css
/* Menos eficiente: recalcula o layout a cada quadro */
.nave-lenta {
  transition: left 0.5s;
}

/* Mais eficiente: usa transform */
.nave-rapida {
  transition: transform 0.5s;
}
```

**Acessibilidade.** Movimento intenso pode causar desconforto, como tontura ou náusea, em algumas pessoas. Os sistemas operacionais permitem pedir "menos movimento", e o CSS consegue ler essa preferência com a media query `prefers-reduced-motion`.

```css
@media (prefers-reduced-motion: reduce) {
  .holocron,
  .propulsor,
  .nave {
    animation: none;
    transition: none;
  }
}
```

Quando o usuário ativa a preferência, as animações e transições desses elementos são desligadas. Uma alternativa mais gentil é reduzir a intensidade em vez de remover tudo, por exemplo trocando o giro por um leve esmaecer. Também evite piscar mais de três vezes por segundo.

## Erros comuns

- **Declarar a transição só no estado `:hover`.** A volta ao estado original acontece de forma brusca. Declare a transição no estado base.
- **Tentar animar `display` ou `auto`.** Essas mudanças não são interpoladas; use `opacity`, `visibility` ou valores numéricos.
- **Esquecer `animation-duration`.** Sem duração, o valor é `0s` e nada acontece.
- **Animar propriedades de layout.** Prefira `transform` e `opacity`.
- **Ignorar `prefers-reduced-motion`.** Respeite a preferência de quem pede menos movimento.
- **Misturar `transform` em regras diferentes.** A última declaração substitui a anterior; combine todas as funções em uma só linha.

## Missão prática

Prepare a decolagem de uma nave.

1. Crie uma `.nave` parada no chão do hangar.
2. Ao passar o ponteiro (ou focar) sobre ela, faça-a subir 80px e inclinar 10 graus com uma transição de 1 segundo.
3. Adicione um `.propulsor` com o brilho pulsante usando `@keyframes` e `alternate`.
4. Coloque um `.holocron` girando devagar ao lado, em loop.
5. Desligue as animações para quem prefere menos movimento.

Dica: use `transform: translateY(-80px) rotate(-10deg)` no estado `:hover` e lembre-se de declarar `transition: transform 1s` na regra base da nave.

## Resumo do capítulo

- `transition` suaviza a mudança entre dois estados; declare-a no estado base.
- `transform` move, gira e escala sem alterar o fluxo da página.
- `@keyframes` descreve a sequência, e `animation` a aplica, com nome, duração, curva, atraso, repetições, direção e preenchimento.
- As curvas de tempo (`linear`, `ease`, `ease-in-out`, `cubic-bezier`, `steps`) mudam a sensação do movimento.
- Prefira animar `transform` e `opacity` por desempenho.
- Respeite `prefers-reduced-motion` para tornar a experiência acessível.
