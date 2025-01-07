const squares = document.querySelectorAll('.square');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['','','','','','','','',''];

// Function to check if there is a winner
function checkWinner() {
	const winningCombos = [		[0,1,2], [3,4,5], [6,7,8], // Horizontal
		[0,3,6], [1,4,7], [2,5,8], // Vertical
		[0,4,8], [2,4,6] // Diagonal
	];

	for (let i = 0; i < winningCombos.length; i++) {
		const [a, b, c] = winningCombos[i];
		if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
			return true;
		}
	}
	return false;
}

// Function to check if the game is a tie
function checkTie() {
	return !gameBoard.includes('');
}

// Function to update the status message
function updateStatus() {
	if (checkWinner()) {
		status.textContent = `O Yoshi ${currentPlayer} venceu, parabens!`;
		changeWinnerAndLoserImages(); // Mudar imagens ao vencer
		disableSquares();
	} else if (checkTie()) {
		status.textContent = `Que pena, empatou!`;
		changeTieImages(); // Mudar imagens ao empatar
		disableSquares();
	} else {
		status.textContent = `Turno do Yoshi ${currentPlayer}`;
	}
}

function changeWinnerAndLoserImages() {
    const caminhoImagemBaseP1 = localStorage.getItem("yoshi1").replace('-hover.png', '');
	const caminhoImagemBaseP2 = localStorage.getItem("yoshi2").replace('-hover.png', '');

    const imagemP1 = document.querySelector("#P1 img");
    const imagemP2 = document.querySelector("#P2 img");

    if (currentPlayer == 'X') {
        imagemP1.src = `${caminhoImagemBaseP1}-hover.png`;
        imagemP1.alt = "Yoshi vencedor - jogador X";
        imagemP2.src = `${caminhoImagemBaseP2}-loser.png`;
        imagemP2.alt = "Yoshi perdedor - jogador O";
    } else {
        imagemP1.src = `${caminhoImagemBaseP1}-loser.png`;
        imagemP1.alt = "Yoshi perdedor - jogador X";
        imagemP2.src = `${caminhoImagemBaseP2}-hover.png`;
        imagemP2.alt = "Yoshi vencedor - jogador O";
    }
}

function changeTieImages() {
    const caminhoImagemBaseP1 = localStorage.getItem("yoshi1").replace('-hover.png', '');
	const caminhoImagemBaseP2 = localStorage.getItem("yoshi2").replace('-hover.png', '');

    const imagemP1 = document.querySelector("#P1 img");
    const imagemP2 = document.querySelector("#P2 img");

    if (imagemP1) {
        imagemP1.src = `${caminhoImagemBaseP1}-loser.png`;
        imagemP1.alt = "Yoshi empate - jogador X";
    }
    if (imagemP2) {
        imagemP2.src = `${caminhoImagemBaseP2}-loser.png`;
        imagemP2.alt = "Yoshi empate - jogador O";
    }
}

// Function to handle a square click
function handleSquareClick(event) {
	const index = event.target.id;
	if (!gameBoard[index]) {
		event.target.textContent = currentPlayer;
		gameBoard[index] = currentPlayer;
		if (checkWinner() || checkTie()) {
			updateStatus();
		} else {
			currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
			updateStatus();
		}
	}
}

// Function to disable squares after game over
function disableSquares() {
	for (let i = 0; i < squares.length; i++) {
		squares[i].removeEventListener('click', handleSquareClick);
	}
}

// Function to reset the game
function resetGame() {
	for (let i = 0; i < squares.length; i++) {
		squares[i].textContent = '';
		squares[i].addEventListener('click', handleSquareClick);
	}
	gameBoard = ['','','','','','','','',''];
	currentPlayer = 'X';
	resetPlayerImages(); // Retorna para as imagens originais
	updateStatus();
}

function resetPlayerImages() {
    
    const imagemP1 = document.querySelector("#P1 img");
    const imagemP2 = document.querySelector("#P2 img");

    if (imagemP1) {
        imagemP1.src = caminhoImagemP1;
        imagemP1.alt = "Yoshi selecionado - jogador X";
    } else {
        let imagemp1 = document.createElement("img");
        imagemp1.src = caminhoImagemP1;
        imagemp1.alt = "Yoshi selecionado - jogador X";
        P1.appendChild(imagemp1);
    }

    if (imagemP2) {
        imagemP2.src = caminhoImagemP2;
        imagemP2.alt = "Yoshi selecionado - jogador O";
    } else {
        let imagemp2 = document.createElement("img");
        imagemp2.src = caminhoImagemP2;
        imagemp2.alt = "Yoshi selecionado - jogador O";
        P2.appendChild(imagemp2);
    }
}

// Add event listeners
for (let i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', handleSquareClick);
}
resetButton.addEventListener('click', resetGame);

// Initial status message
updateStatus();

const caminhoImagemP1 = localStorage.getItem("yoshi1").replace('-hover.png', '.png');
        let imagemp1 = document.createElement("img");
        imagemp1.src = caminhoImagemP1;
        imagemp1.alt = "Yoshi selecionado - jogador X";
        P1.appendChild(imagemp1);

const caminhoImagemP2 = localStorage.getItem("yoshi2").replace('-hover.png', '.png');
        let imagemp2 = document.createElement("img");
        imagemp2.src = caminhoImagemP2;
        imagemp2.alt = "Yoshi selecionado - jogador O";
        P2.appendChild(imagemp2);