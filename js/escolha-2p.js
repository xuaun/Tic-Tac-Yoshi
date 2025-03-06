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
const salvarBtn = document.getElementById("start");

let selectedYoshis = [];

function handleYoshiClick(clickedYoshi) {
  if (selectedYoshis.includes(clickedYoshi)) {
    selectedYoshis = selectedYoshis.filter((yoshi) => yoshi !== clickedYoshi);
    clickedYoshi.classList.remove("selected");
    removeSelectionMarker(clickedYoshi);
    updateSelectionMarkers();
    resetYoshiImage(clickedYoshi);
    updateStartButtonState();
    return;
  }

  if (selectedYoshis.length >= 2) {
    alert("Você só pode selecionar dois Yoshis!");
    return;
  }

  selectedYoshis.push(clickedYoshi);
  clickedYoshi.classList.add("selected");
  updateSelectionMarkers();
  updateYoshiImage(clickedYoshi);
  updateStartButtonState();
}

function addSelectionMarker(yoshi, markerText) {
  removeSelectionMarker(yoshi);

  const marker = document.createElement("span");
  marker.textContent = markerText;
  marker.classList.add("selection-marker");
  yoshi.parentElement.appendChild(marker);
}

function removeSelectionMarker(yoshi) {
  const marker = yoshi.parentElement.querySelector(".selection-marker");
  if (marker) {
    marker.remove();
  }
}

function updateSelectionMarkers() {
  selectedYoshis.forEach((yoshi, index) => {
    const markerText = index === 0 ? "X" : "O";
    addSelectionMarker(yoshi, markerText);
  });
}

function resetYoshiImage(yoshi) {
  if (yoshi === yoshiVerde) {
    yoshiVerde.setAttribute("src", "./assets/verde-icon.png");
  } else if (yoshi === yoshiVermelho) {
    yoshiVermelho.setAttribute("src", "./assets/vermelho-icon.png");
  } else if (yoshi === yoshiAzul) {
    yoshiAzul.setAttribute("src", "./assets/azul-icon.png");
  } else if (yoshi === yoshiLaranja) {
    yoshiLaranja.setAttribute("src", "./assets/laranja-icon.png");
  } else if (yoshi === yoshiRosa) {
    yoshiRosa.setAttribute("src", "./assets/rosa-icon.png");
  } else if (yoshi === yoshiAmarelo) {
    yoshiAmarelo.setAttribute("src", "./assets/amarelo-icon.png");
  } else if (yoshi === yoshiBranco) {
    yoshiBranco.setAttribute("src", "./assets/branco-icon.png");
  } else if (yoshi === yoshiPreto) {
    yoshiPreto.setAttribute("src", "./assets/preto-icon.png");
  } else if (yoshi === yoshiRoxo) {
    yoshiRoxo.setAttribute("src", "./assets/roxo-icon.png");
  } else if (yoshi === yoshiAzulClaro) {
    yoshiAzulClaro.setAttribute("src", "./assets/azul claro-icon.png");
  }
}

function updateYoshiImage(yoshi) {
  if (yoshi === yoshiVerde) {
    yoshiVerde.setAttribute("src", "./assets/verde-icon-hover.png");
  } else if (yoshi === yoshiVermelho) {
    yoshiVermelho.setAttribute("src", "./assets/vermelho-icon-hover.png");
  } else if (yoshi === yoshiAzul) {
    yoshiAzul.setAttribute("src", "./assets/azul-icon-hover.png");
  } else if (yoshi === yoshiLaranja) {
    yoshiLaranja.setAttribute("src", "./assets/laranja-icon-hover.png");
  } else if (yoshi === yoshiRosa) {
    yoshiRosa.setAttribute("src", "./assets/rosa-icon-hover.png");
  } else if (yoshi === yoshiAmarelo) {
    yoshiAmarelo.setAttribute("src", "./assets/amarelo-icon-hover.png");
  } else if (yoshi === yoshiBranco) {
    yoshiBranco.setAttribute("src", "./assets/branco-icon-hover.png");
  } else if (yoshi === yoshiPreto) {
    yoshiPreto.setAttribute("src", "./assets/preto-icon-hover.png");
  } else if (yoshi === yoshiRoxo) {
    yoshiRoxo.setAttribute("src", "./assets/roxo-icon-hover.png");
  } else if (yoshi === yoshiAzulClaro) {
    yoshiAzulClaro.setAttribute("src", "./assets/azul claro-icon-hover.png");
  }
}

function updateStartButtonState() {
  if (selectedYoshis.length === 2) {
    salvarBtn.classList.remove("disabled");
    salvarBtn.removeAttribute("disabled");
    salvarBtn.href = "./partida-2p.html";
  } else {
    salvarBtn.classList.add("disabled");
    salvarBtn.setAttribute("disabled", "disabled");
    salvarBtn.href = "#";
  }
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

salvarBtn.addEventListener("click", () => {
  if (selectedYoshis.length !== 2) {
    alert("Por favor, selecione dois Yoshis antes de começar!");
    return;
  }

  const imagensSelecionadas = selectedYoshis.map((yoshi) =>
    yoshi.getAttribute("src")
  );
  yoshi1 = imagensSelecionadas[0];
  yoshi2 = imagensSelecionadas[1];

  localStorage.setItem("yoshi1", yoshi1);
  localStorage.setItem("yoshi2", yoshi2);
});

updateStartButtonState();
