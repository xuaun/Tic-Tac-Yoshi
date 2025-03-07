const yoshiElements = document.querySelectorAll(".yoshi");
const yoshiVerde = document.querySelector(".img_yoshi_verde");
const yoshiVermelho = document.querySelector(".img_yoshi_vermelho");
const yoshiAzul = document.querySelector(".img_yoshi_azul");
const yoshiLaranja = document.querySelector(".img_yoshi_laranja");
const yoshiRosa = document.querySelector(".img_yoshi_rosa");
const yoshiAmarelo = document.querySelector(".img_yoshi_amarelo");
const yoshiBranco = document.querySelector(".img_yoshi_branco");
const yoshiPreto = document.querySelector(".img_yoshi_preto");
const yoshiRoxo = document.querySelector(".img_yoshi_roxo");
const yoshiAzulClaro = document.querySelector(".img_yoshi_azulclaro");
let selectedYoshi = null;

function handleYoshiClick(yoshi) {
  if (selectedYoshi) {
    selectedYoshi.classList.remove("selected");
    yoshiVerde.setAttribute("src", "./assets/verde-icon.png");
    yoshiVermelho.setAttribute("src", "./assets/vermelho-icon.png");
    yoshiAzul.setAttribute("src", "./assets/azul-icon.png");
    yoshiLaranja.setAttribute("src", "./assets/laranja-icon.png");
    yoshiRosa.setAttribute("src", "./assets/rosa-icon.png");
    yoshiAmarelo.setAttribute("src", "./assets/amarelo-icon.png");
    yoshiBranco.setAttribute("src", "./assets/branco-icon.png");
    yoshiPreto.setAttribute("src", "./assets/preto-icon.png");
    yoshiRoxo.setAttribute("src", "./assets/roxo-icon.png");
    yoshiAzulClaro.setAttribute("src", "./assets/azul claro-icon.png");
  }

  selectedYoshi = yoshi;

  selectedYoshi.classList.add("selected");
  if (yoshiVerde == selectedYoshi) {
    yoshiVerde.setAttribute("src", "./assets/verde-icon-hover.png");
  } else if (yoshiVermelho == selectedYoshi) {
    yoshiVermelho.setAttribute("src", "./assets/vermelho-icon-hover.png");
  } else if (yoshiAzul == selectedYoshi) {
    yoshiAzul.setAttribute("src", "./assets/azul-icon-hover.png");
  } else if (yoshiLaranja == selectedYoshi) {
    yoshiLaranja.setAttribute("src", "./assets/laranja-icon-hover.png");
  } else if (yoshiRosa == selectedYoshi) {
    yoshiRosa.setAttribute("src", "./assets/rosa-icon-hover.png");
  } else if (yoshiAmarelo == selectedYoshi) {
    yoshiAmarelo.setAttribute("src", "./assets/amarelo-icon-hover.png");
  } else if (yoshiBranco == selectedYoshi) {
    yoshiBranco.setAttribute("src", "./assets/branco-icon-hover.png");
  } else if (yoshiPreto == selectedYoshi) {
    yoshiPreto.setAttribute("src", "./assets/preto-icon-hover.png");
  } else if (yoshiRoxo == selectedYoshi) {
    yoshiRoxo.setAttribute("src", "./assets/roxo-icon-hover.png");
  } else if (yoshiAzulClaro == selectedYoshi) {
    yoshiAzulClaro.setAttribute("src", "./assets/azul claro-icon-hover.png");
  }
  updateStartButtonState();
}

yoshiElements.forEach((yoshi) => {
  yoshi.addEventListener("click", (event) => {
    handleYoshiClick(event.target);
  });
  yoshi.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleYoshiClick(event.target.getElementsByTagName("img")[0]);
    }
  });
});

const salvarBtn = document.getElementById("start");

function updateStartButtonState() {
  if (selectedYoshi) {
    salvarBtn.classList.remove("disabled");
    salvarBtn.removeAttribute("disabled");
    salvarBtn.href = "./partida-1p.html";
  } else {
    salvarBtn.classList.add("disabled");
    salvarBtn.setAttribute("disabled", "disabled");
    salvarBtn.href = "#";
  }
}

salvarBtn.addEventListener("click", () => {
  if (!selectedYoshi) {
    alert("Por favor, selecione um Yoshi antes de começar!");
    return;
  }
  const imagemSelecionada = document.querySelector(".selected");
  const enderecoImagem = imagemSelecionada.getAttribute("src");
  localStorage.setItem("imagemSelecionada", enderecoImagem);
  const cpuImage = getRandomIcon(enderecoImagem);
  localStorage.setItem("cpu", cpuImage);
});

const icons = [
  "./assets/verde-icon-hover.png",
  "./assets/vermelho-icon-hover.png",
  "./assets/azul-icon-hover.png",
  "./assets/laranja-icon-hover.png",
  "./assets/rosa-icon-hover.png",
  "./assets/amarelo-icon-hover.png",
  "./assets/branco-icon-hover.png",
  "./assets/preto-icon-hover.png",
  "./assets/roxo-icon-hover.png",
  "./assets/azul claro-icon-hover.png",
];

function getRandomIcon(previousIcon) {
  const filteredIcons = icons.filter((icon) => icon !== previousIcon);

  const randomIndex = Math.floor(Math.random() * filteredIcons.length);
  return filteredIcons[randomIndex];
}

updateStartButtonState();
