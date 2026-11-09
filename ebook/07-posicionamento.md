# Capítulo 7: Posicionamento

A cabine da nave é pequena, e cada centímetro conta. Você, recém-chegado ao posto de piloto, acaba de receber uma tarefa: montar o painel de controle antes da próxima decolagem. O radar precisa ficar preso ao canto da cabine, o mapa estelar deve ocupar o fundo, e o holocron tem de flutuar sobre o mapa sem empurrar nada para o lado.

Até aqui, você aprendeu a organizar elementos com o fluxo normal, com Flexbox e com Grid. Todos eles respeitam uma regra básica: cada elemento ocupa o seu lugar na fila e empurra o próximo. Mas um painel de nave tem peças que fogem dessa fila. Algumas ficam coladas à tela durante a rolagem. Outras ficam empilhadas umas sobre as outras, como camadas de vidro.

É para isso que existe o posicionamento em CSS. Neste capítulo, você vai tirar elementos do fluxo de forma controlada, escolher a referência certa para cada um e decidir quem aparece na frente de quem. Vamos usar uma cabine genérica de ficção científica como laboratório.

![Cabine de uma nave espacial genérica com painéis sobrepostos e luzes holográficas](../assets/cap07-posicionamento.png)

## O fluxo normal e o position: static

Todo elemento nasce com `position: static`. Nesse modo, o navegador coloca a caixa no fluxo normal: blocos um embaixo do outro, elementos em linha lado a lado. As propriedades `top`, `right`, `bottom`, `left` e `z-index` **não têm efeito** em um elemento estático.

```css
.nave {
  position: static; /* valor padrão: não precisa ser escrito */
  top: 50px;        /* ignorado, pois o elemento é estático */
}
```

Na prática, você raramente escreve `position: static`. Ele é útil para desfazer um posicionamento definido em outra regra. Guarde a ideia principal: se o elemento está no fluxo normal, ele não se move com `top` e companhia.

## position: relative

Com `position: relative`, o elemento continua ocupando o seu espaço original no fluxo, mas pode ser deslocado visualmente a partir dessa posição. O espaço antigo permanece reservado, então os vizinhos não se mexem.

```css
.radar {
  position: relative;
  top: 10px;   /* desce 10px a partir da posição original */
  left: 20px;  /* move 20px para a direita */
}
```

Leia os valores como "afastar da borda indicada". Por isso `top: 10px` empurra o elemento para baixo, e `left: 20px` o empurra para a direita. Valores negativos fazem o caminho inverso.

Há um segundo uso, ainda mais comum: `position: relative` sem deslocamento algum serve para tornar o elemento a **referência** de seus filhos posicionados de forma absoluta. É o que vamos usar a seguir.

## position: absolute

Com `position: absolute`, o elemento sai do fluxo normal. Os vizinhos agem como se ele não existisse, e ele é posicionado em relação ao **ancestral posicionado mais próximo**, isto é, o ancestral mais próximo cujo `position` seja diferente de `static`. Se não houver nenhum, a referência passa a ser a área inicial da página.

```css
.cabine {
  position: relative; /* vira a referência dos filhos absolutos */
  width: 480px;
  height: 280px;
  background-color: #0b1020;
}

.holocron {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 64px;
  height: 64px;
  background-color: #3aa0ff;
}
```

O `.holocron` fica a 16px do topo e a 16px da borda direita da `.cabine`, e não da janela do navegador. Se você remover `position: relative` de `.cabine`, o holocron passa a se posicionar em relação à página inteira, e o painel quebra.

Dica: um elemento absoluto também pode ser esticado definindo as quatro bordas, como `top: 0; right: 0; bottom: 0; left: 0;`. Isso é útil para camadas de fundo que cobrem o pai inteiro.

## position: fixed

Com `position: fixed`, o elemento também sai do fluxo, mas a referência é a **janela de visualização** (viewport). Ele permanece no mesmo lugar da tela mesmo quando a página rola.

```css
.menu-da-frota {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem;
  background-color: #0b1020;
  color: #e6f1ff;
}
```

O menu fica preso ao topo da tela durante toda a leitura. Como o elemento deixa de ocupar espaço no fluxo, o conteúdo logo abaixo sobe para baixo dele. Para compensar, adicione um espaçamento ao conteúdo, por exemplo `padding-top` no `body` com a altura do menu.

## position: sticky

O valor `sticky` é um híbrido. O elemento se comporta como `relative` até que a rolagem o leve a um limite definido por `top`, `right`, `bottom` ou `left`. A partir daí, ele "gruda" naquele ponto, enquanto o contêiner pai ainda estiver visível.

```css
.titulo-do-setor {
  position: sticky;
  top: 0; /* gruda no topo quando chegar lá */
  background-color: #151b33;
  color: #e6f1ff;
  padding: 0.5rem 1rem;
}
```

Esse efeito é ótimo para títulos de seção e cabeçalhos de tabela. Lembre-se de que o `sticky` precisa de ao menos um valor de deslocamento (como `top`) para funcionar, e que ele deixa de grudar quando o pai sai da tela.

## Camadas com z-index

Quando elementos posicionados se sobrepõem, o `z-index` decide quem fica na frente. Números maiores ficam à frente de números menores. A propriedade só funciona em elementos posicionados (qualquer `position` diferente de `static`) e também em itens de Flexbox e de Grid.

```css
.fundo-estelar {
  position: absolute;
  inset: 0;           /* atalho para top, right, bottom e left iguais a 0 */
  z-index: 1;
  background-color: #05070f;
}

.nave {
  position: absolute;
  top: 40%;
  left: 40%;
  z-index: 2;
}

.painel-de-alertas {
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 3;         /* fica na frente da nave e do fundo */
  padding: 0.5rem 0.75rem;
  background-color: rgba(255, 80, 80, 0.85);
  color: #ffffff;
}
```

As três camadas ficam empilhadas na ordem: fundo estelar, nave e painel de alertas. Sem `z-index`, elementos posicionados seguem a ordem do HTML, e os últimos aparecem por cima.

Um detalhe importante: o `z-index` só compete **dentro do mesmo contexto de empilhamento**. Um contexto novo nasce, por exemplo, em um elemento posicionado com `z-index` definido, em um elemento com `opacity` menor que 1 ou com `transform`. Dentro de um contexto, os filhos competem entre si; para o mundo de fora, o contexto inteiro vale como um só bloco. Por isso um `z-index: 9999` pode não vencer um elemento que está em outro contexto com valor maior.

## Erros comuns

- **Absoluto sem ancestral posicionado.** O elemento se posiciona em relação à página inteira. Dê `position: relative` ao pai que deve servir de referência.
- **`z-index` em elemento estático.** Fora de Flexbox e Grid, ele é ignorado. Defina um `position` diferente de `static`.
- **Guerra de `z-index`.** Valores enormes (`99999`) escondem o problema. Prefira poucos níveis e documente a escala.
- **Menu fixo cobrindo o conteúdo.** Reserve o espaço correspondente com `padding-top` ou `scroll-margin-top`.
- **`sticky` sem deslocamento.** Sem `top` (ou equivalente), nada gruda. Além disso, um ancestral com `overflow` diferente de `visible` pode impedir o efeito.

## Missão prática

Monte o painel de uma nave com um HTML mínimo e o CSS que você aprendeu neste capítulo.

1. Crie uma `.cabine` de 480px por 280px com fundo escuro.
2. Coloque um `.radar` fixado no canto inferior esquerdo da cabine.
3. Faça um `.holocron` flutuar no canto superior direito, sobre o fundo.
4. Adicione um `.menu-da-frota` que fique preso ao topo da janela durante a rolagem.
5. Garanta que o painel de alertas apareça na frente do radar.

Dica: a `.cabine` precisa de `position: relative` para que o radar e o holocron usem os seus cantos como referência. Teste a rolagem aumentando a altura do `body`.

## Resumo do capítulo

- `static` é o padrão: o elemento segue o fluxo e ignora `top`, `right`, `bottom`, `left` e `z-index`.
- `relative` desloca o elemento a partir de sua posição original e serve de referência para filhos absolutos.
- `absolute` retira o elemento do fluxo e o posiciona em relação ao ancestral posicionado mais próximo.
- `fixed` prende o elemento à janela, mesmo durante a rolagem.
- `sticky` alterna entre `relative` e fixo conforme a rolagem atinge o limite definido.
- `z-index` controla a sobreposição dentro de um contexto de empilhamento; use poucos níveis e com critério.
