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
		disableSquares();
	} else if (checkTie()) {
		status.textContent = `Que pena, empatou!`;
		disableSquares();
	} else {
		status.textContent = `Turno do Yoshi ${currentPlayer}`;
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
	updateStatus();
}

// Add event listeners
for (let i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', handleSquareClick);
}
resetButton.addEventListener('click', resetGame);

// Initial status message
updateStatus();
