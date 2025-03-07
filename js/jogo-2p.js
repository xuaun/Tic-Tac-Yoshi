const squares = document.querySelectorAll(".square");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const P1 = document.getElementById("P1");
const P2 = document.getElementById("P2");
let gameStatus = true;
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return !gameBoard.includes("");
}

function updateStatus() {
  if (checkWinner()) {
    if (currentPlayer == "X") {
      status.textContent = `O Yoshi ${cor} ${currentPlayer} venceu, parabens!`;
    } else {
      status.textContent = `O Yoshi ${corP2} ${currentPlayer} venceu, parabens!`;
      
    }
    changeWinnerAndLoserImages();
    disableSquares();
    gameStatus = false;
  } else if (checkTie()) {
    status.textContent = `Que pena, empatou!`;
    changeTieImages();
    disableSquares();
    gameStatus = false;
  } else {
    if (currentPlayer == "X") {
      status.textContent = `Turno do Yoshi ${cor} - ${currentPlayer}`;
    } else {
      status.textContent = `Turno do Yoshi ${corP2} - ${currentPlayer}`;
    }
  }
}

function changeWinnerAndLoserImages() {
  const caminhoImagemBaseP1 = localStorage
    .getItem("yoshi1")
    .replace("-hover.png", "");
  const caminhoImagemBaseP2 = localStorage
    .getItem("yoshi2")
    .replace("-hover.png", "");

  const imagemP1 = document.querySelector("#P1 img");
  const imagemP2 = document.querySelector("#P2 img");

  if (currentPlayer == "X") {
    imagemP1.src = `${caminhoImagemBaseP1}-hover.png`;
    imagemP1.alt = `Yoshi ${cor} vencedor - jogador X`;
    imagemP2.src = `${caminhoImagemBaseP2}-loser.png`;
    imagemP2.alt = `Yoshi ${corP2} perdedor - jogador O`;
  } else {
    imagemP1.src = `${caminhoImagemBaseP1}-loser.png`;
    imagemP1.alt = `Yoshi ${cor} perdedor - jogador X`;
    imagemP2.src = `${caminhoImagemBaseP2}-hover.png`;
    imagemP2.alt = `Yoshi vencedor - jogador O`;
  }
}

function changeTieImages() {
  const caminhoImagemBaseP1 = localStorage
    .getItem("yoshi1")
    .replace("-hover.png", "");
  const caminhoImagemBaseP2 = localStorage
    .getItem("yoshi2")
    .replace("-hover.png", "");

  const imagemP1 = document.querySelector("#P1 img");
  const imagemP2 = document.querySelector("#P2 img");

  if (imagemP1) {
    imagemP1.src = `${caminhoImagemBaseP1}-loser.png`;
    imagemP1.alt = `Yoshi ${cor} empatou - jogador X`;
  }
  if (imagemP2) {
    imagemP2.src = `${caminhoImagemBaseP2}-loser.png`;
    imagemP2.alt = `Yoshi ${cor} empatou - jogador O`;
  }
}

function handleSquareClick(event) {
  const index = event.target.id;
  if (!gameBoard[index] && index !== "") {
    if (currentPlayer == "X" && gameStatus) {
      let eggImageP1 = document.createElement("img");
      eggImageP1.src = `./assets/${cor}-egg.png`;
      eggImageP1.alt = `Ovo de Yoshi ${cor} - jogador ${currentPlayer}`;
      event.target.appendChild(eggImageP1);
      let jogadaP1 = document.createElement("p");
      jogadaP1.innerHTML = `${currentPlayer}`
      event.target.appendChild(jogadaP1);
    } else if (currentPlayer == "O" && gameStatus) {
      let eggImageP2 = document.createElement("img");
      eggImageP2.src = `./assets/${corP2}-egg.png`;
      eggImageP2.alt = `Ovo de Yoshi ${corP2} - jogador ${currentPlayer}`;
      event.target.appendChild(eggImageP2);
      let jogadaP2 = document.createElement("p");
      jogadaP2.innerHTML = `${currentPlayer}`
      event.target.appendChild(jogadaP2);
    }
    gameBoard[index] = currentPlayer;
    if (checkWinner() || checkTie()) {
      updateStatus();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateStatus();
    }
  }
}

function disableSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener("click", handleSquareClick);
  }
}

function resetGame() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
    squares[i].addEventListener("click", handleSquareClick);
    gameStatus = true;
  }
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  resetPlayerImages();
  updateStatus();
}

function resetPlayerImages() {
  const imagemP1 = document.querySelector("#P1 img");
  const imagemP2 = document.querySelector("#P2 img");

  if (imagemP1) {
    imagemP1.src = caminhoImagemP1;
    imagemP1.alt = `Yoshi ${cor} selecionado - jogador X`;
  } else {
    let imagemp1 = document.createElement("img");
    imagemp1.src = caminhoImagemP1;
    imagemp1.alt = `Yoshi ${cor} selecionado - jogador X`;
    P1.appendChild(imagemp1);
  }

  if (imagemP2) {
    imagemP2.src = caminhoImagemP2;
    imagemP2.alt = `Yoshi ${corP2} selecionado - jogador O`;
  } else {
    let imagemp2 = document.createElement("img");
    imagemp2.src = caminhoImagemP2;
    imagemp2.alt = `Yoshi ${corP2} selecionado - jogador O`;
    P2.appendChild(imagemp2);
  }
}

const caminhoImagemP1 = localStorage
  .getItem("yoshi1")
  .replace("-hover.png", ".png");
const cor = caminhoImagemP1.split("/")[2].split("-")[0];
let imagemp1 = document.createElement("img");
imagemp1.src = caminhoImagemP1;
imagemp1.alt = `Yoshi ${cor} selecionado - jogador X`;
P1.appendChild(imagemp1);

const caminhoImagemP2 = localStorage
  .getItem("yoshi2")
  .replace("-hover.png", ".png");
const corP2 = caminhoImagemP2.split("/")[2].split("-")[0];
let imagemp2 = document.createElement("img");
imagemp2.src = caminhoImagemP2;
imagemp2.alt = `Yoshi ${corP2} selecionado - jogador O`;
P2.appendChild(imagemp2);

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", handleSquareClick);
  squares[i].addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSquareClick(event);
    }
  });
}
resetButton.addEventListener("click", resetGame);

updateStatus();
