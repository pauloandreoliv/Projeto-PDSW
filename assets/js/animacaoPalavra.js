//Palavra da tela inicial
const palavras = ["nível", "conceito", "universo"];
const tempoDigitacao = 210;
let palavraAtual = 0;
let caractereAtual = 0;
let animacaoSpan = document.getElementById("animacaoSpan");

function animarPalavra() {
  if (caractereAtual < palavras[palavraAtual].length) {
    animacaoSpan.textContent += palavras[palavraAtual].charAt(caractereAtual);
    caractereAtual++;
    setTimeout(animarPalavra, tempoDigitacao);
  } else {
    setTimeout(apagarPalavra, tempoDigitacao * 2);
  }
}

function apagarPalavra() {
  if (caractereAtual >= 0) {
    animacaoSpan.textContent = animacaoSpan.textContent.slice(0, -1);
    caractereAtual--;
    setTimeout(apagarPalavra, tempoDigitacao);
  } else {
    palavraAtual = (palavraAtual + 1) % palavras.length;
    setTimeout(animarPalavra, tempoDigitacao);
  }
}

animarPalavra();