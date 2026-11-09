# Prompt 07: Posicionamento

## Objetivo

Gerar o Capítulo 7 do e-book, que ensina o posicionamento em CSS: a propriedade `position` (`static`, `relative`, `absolute`, `fixed` e `sticky`), as propriedades de deslocamento (`top`, `right`, `bottom`, `left`), o `z-index` e os contextos de empilhamento. Ao final, o leitor deve saber posicionar elementos sobre outros, fixar painéis na tela e controlar a sobreposição de camadas.

## Contexto

O e-book "CSS na Galáxia" ensina CSS com narrativa e exemplos inspirados em Star Wars. Os capítulos 1 a 6 já apresentaram a introdução ao CSS, seletores, modelo de caixa, cores e tipografia, Flexbox e Grid. O leitor já domina o fluxo normal dos elementos e agora precisa tirar elementos desse fluxo de forma controlada.

Nesta missão, o leitor é um jovem piloto que monta o painel de uma nave: o radar fica preso ao canto da cabine, o holocron flutua sobre o mapa estelar e o menu de navegação acompanha a tela durante a rolagem. O projeto não tem afiliação com os detentores dos direitos de Star Wars. Use apenas nomes de classes e descrições genéricas, sem logotipos, sem trechos de obras protegidas e sem dados pessoais.

## Papel da IA

Você é um(a) professor(a) experiente de CSS e redator(a) técnico(a) de livros didáticos em português do Brasil. Explica conceitos com clareza, usa analogias com viagens espaciais e naves, e sempre valida o código antes de apresentá-lo. Seu tom é acolhedor, direto e sem exageros.

## Instruções

1. Escreva o capítulo em português do Brasil, com o título "Capítulo 7: Posicionamento".
2. Abra com uma narrativa curta (3 a 5 parágrafos) em que o leitor monta o painel de controle de uma nave, introduzindo a necessidade de posicionar elementos.
3. Explique cada valor de `position` em uma subseção própria: `static`, `relative`, `absolute`, `fixed` e `sticky`.
4. Para cada valor, apresente ao menos um exemplo CSS válido com o tema Star Wars, usando classes como `.nave`, `.holocron`, `.radar`, `.sabre-de-luz` e `.menu-da-frota`. Acompanhe cada exemplo de uma explicação em português, linha a linha quando útil.
5. Explique `top`, `right`, `bottom` e `left`, e mostre a diferença entre posicionar em relação ao elemento pai (ancestral posicionado) e em relação à janela.
6. Explique o `z-index` e o contexto de empilhamento, com um exemplo de camadas: fundo estelar, nave e painel de alertas.
7. Inclua uma subseção "Erros comuns", cobrindo, por exemplo, `absolute` sem ancestral `relative` e `z-index` que não funciona em elemento `static`.
8. Inclua um mini exercício prático (uma "missão") com enunciado e dica, sem entregar a resposta completa.
9. Inclua uma imagem de abertura do capítulo, referenciada como `![Cabine de uma nave espacial genérica com painéis sobrepostos e luzes holográficas](../assets/cap07-posicionamento.png)`, com texto alternativo descritivo.
10. Garanta que todo código CSS seja válido, que as propriedades existam e que os exemplos possam ser executados em um navegador moderno junto de um HTML mínimo.
11. Não use nomes de personagens, logotipos ou marcas registradas; prefira nomes genéricos de classes e descrições de ficção científica espacial.
12. Não inclua dados pessoais, segredos ou links externos não verificados.

## Formato de saída esperado

Entregue somente o conteúdo do capítulo em Markdown, sem comentários fora do texto, na estrutura abaixo. Todo exemplo de código CSS deve estar em bloco com cerca de três crases e linguagem `css`.

````markdown
# Capítulo 7: Posicionamento

<narrativa de abertura>

![Cabine de uma nave espacial genérica com painéis sobrepostos e luzes holográficas](../assets/cap07-posicionamento.png)

## O fluxo normal e o position: static

<explicação em português>

```css
.nave {
  position: static;
}
```

## position: relative

## position: absolute

## position: fixed

## position: sticky

## Camadas com z-index

## Erros comuns

## Missão prática

## Resumo do capítulo
````

O capítulo deve conter ao menos um bloco ```css por subseção de `position`, uma explicação em português para cada bloco e a imagem do capítulo com a referência `../assets/cap07-posicionamento.png`.

## Critérios de qualidade

- [ ] O capítulo está inteiramente em português do Brasil, com ortografia e gramática corretas.
- [ ] Os cinco valores de `position` são explicados, cada um com exemplo CSS e explicação.
- [ ] Todos os blocos de código usam a linguagem `css` e contêm CSS válido.
- [ ] Os exemplos usam o tema Star Wars (`.nave`, `.holocron`, `.sabre-de-luz`) sem nomes protegidos.
- [ ] A imagem `../assets/cap07-posicionamento.png` está referenciada com texto alternativo descritivo.
- [ ] Há uma seção de erros comuns e uma missão prática com dica.
- [ ] Nenhum dado pessoal, segredo ou termo proibido aparece no texto.
- [ ] Cada exemplo foi testado em um navegador por um humano antes da publicação.
