const yoshiElements = document.querySelectorAll('.yoshi');
const yoshiVerde = document.querySelector('.img_yoshi_verde');
const yoshiVermelho = document.querySelector('.img_yoshi_vermelho');
const yoshiAzul = document.querySelector('.img_yoshi_azul');
const yoshiLaranja = document.querySelector('.img_yoshi_laranja');
let selectedYoshi = null;

function handleYoshiClick(event) {
  // Remove selected class from last selected yoshi element
  if (selectedYoshi) {
    selectedYoshi.classList.remove('selected');
    yoshiVerde.setAttribute("src", "./assets/verde-icon.png");
    yoshiVermelho.setAttribute("src", "./assets/vermelho-icon.png");
    yoshiAzul.setAttribute("src", "./assets/azul-icon.png");
    yoshiLaranja.setAttribute("src", "./assets/laranja-icon.png");
  }

  // Add selected class to clicked yoshi element
  event.target.classList.add('selected');
  selectedYoshi = event.target;
  if (yoshiVerde == event.target) {
    yoshiVerde.setAttribute("src", "./assets/verde-icon-hover.png");
  } else if (yoshiVermelho == event.target) {
    yoshiVermelho.setAttribute("src", "./assets/vermelho-icon-hover.png");
  } else if (yoshiAzul == event.target) {
    yoshiAzul.setAttribute("src", "./assets/azul-icon-hover.png");
  } else if (yoshiLaranja == event.target) {
    yoshiLaranja.setAttribute("src", "./assets/laranja-icon-hover.png");
  }
}

yoshiElements.forEach(yoshi => {
  yoshi.addEventListener('click', handleYoshiClick);
});

const salvarBtn = document.getElementById('start');

salvarBtn.addEventListener('click', () => {
  const imagemSelecionada = document.querySelector('.selected');
  const enderecoImagem = imagemSelecionada.getAttribute('src');
  localStorage.setItem('imagemSelecionada', enderecoImagem);
});