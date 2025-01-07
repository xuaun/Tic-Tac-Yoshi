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
    const caminhoImagemBase = localStorage.getItem("imagemSelecionada").replace('-hover.png', '');
    const caminhoImagemBaseP2 = localStorage.getItem("cpu").replace('-hover.png', '');

    const imagemP1 = document.querySelector("#P1 img");
    const imagemP2 = document.querySelector("#P2 img");

    if (currentPlayer == 'X') {
        imagemP1.src = `${caminhoImagemBase}-hover.png`;
        imagemP1.alt = "Yoshi vencedor - jogador X";
        imagemP2.src = `${caminhoImagemBaseP2}-loser.png`;
        imagemP2.alt = "Yoshi perdedor - jogador O";
    } else {
        imagemP1.src = `${caminhoImagemBase}-loser.png`;
        imagemP1.alt = "Yoshi perdedor - jogador X";
        imagemP2.src = `${caminhoImagemBaseP2}-hover.png`;
        imagemP2.alt = "Yoshi vencedor - jogador O";
    }
}

function changeTieImages() {
    const caminhoImagemBase = localStorage.getItem("imagemSelecionada").replace('-hover.png', '');
    const caminhoImagemBaseP2 = localStorage.getItem("cpu").replace('-hover.png', '');

    const imagemP1 = document.querySelector("#P1 img");
    const imagemP2 = document.querySelector("#P2 img");

    if (imagemP1) {
        imagemP1.src = `${caminhoImagemBase}-loser.png`;
        imagemP1.alt = "Yoshi empate - jogador X";
    }
    if (imagemP2) {
        imagemP2.src = `${caminhoImagemBaseP2}-loser.png`;
        imagemP2.alt = "Yoshi empate - jogador O";
    }
}

// Function to handle a square click
// Atualizar a função handleSquareClick para acionar a jogada da IA
function handleSquareClick(event) {
    const index = event.target.id;
    if (!gameBoard[index] && currentPlayer === 'X') {
        event.target.textContent = currentPlayer;
        gameBoard[index] = currentPlayer;

        if (checkWinner() || checkTie()) {
            updateStatus();
        } else {
            currentPlayer = 'O';
            updateStatus();
            handleAIMove();
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
        imagemP1.src = caminhoImagem;
        imagemP1.alt = "Yoshi selecionado - jogador X";
    } else {
        let imagem = document.createElement("img");
        imagem.src = caminhoImagem;
        imagem.alt = "Yoshi selecionado - jogador X";
        P1.appendChild(imagem);
    }

    if (imagemP2) {
        imagemP2.src = caminhoImagemP2;
        imagemP2.alt = "Yoshi selecionado - jogador O";
    } else {
        let imagem2 = document.createElement("img");
        imagem2.src = caminhoImagemP2;
        imagem2.alt = "Yoshi selecionado - jogador O";
        P2.appendChild(imagem2);
    }
}

// Add event listeners
for (let i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', handleSquareClick);
}
resetButton.addEventListener('click', resetGame);

// Initial status message
updateStatus();

// Function to handle the AI move for player 'O'
function handleAIMove() {
    if (currentPlayer === 'O') {
        // Encontrar todos os índices disponíveis no tabuleiro
        const availableIndices = gameBoard
            .map((value, index) => (value === '' ? index : null))
            .filter(index => index !== null);

        // Escolher um índice aleatório entre os disponíveis
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

        // Simular o atraso de 1 segundo antes de fazer o movimento
        setTimeout(() => {
            // Atualizar o DOM e o estado do jogo
            const square = document.getElementById(randomIndex);
            square.textContent = currentPlayer;
            gameBoard[randomIndex] = currentPlayer;

            // Verificar vitória ou empate
            if (checkWinner() || checkTie()) {
                updateStatus();
            } else {
                // Passar o turno para o próximo jogador
                currentPlayer = 'X';
                updateStatus();
            }
        }, 1000);
    }
}

const caminhoImagem = localStorage.getItem("imagemSelecionada").replace('-hover.png', '.png');
        let imagem = document.createElement("img");
        imagem.src = caminhoImagem;
        imagem.alt = "Yoshi selecionado - jogador X";
        P1.appendChild(imagem);

const caminhoImagemP2 = localStorage.getItem("cpu").replace('-hover.png', '.png');
        let imagemp2 = document.createElement("img");
        imagemp2.src = caminhoImagemP2;
        imagemp2.alt = "Yoshi selecionado - jogador O";
        P2.appendChild(imagemp2);
