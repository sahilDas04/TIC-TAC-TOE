console.log("Hello World!")
let music = new Audio("music.mp3")
let turn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const reset = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

const handleSquareClick = (event) => {
	const squareIndex = event.target.id;
	if (gameState[squareIndex] === '' && !gameOver) {
		event.target.textContent = currentPlayer;
		gameState[squareIndex] = currentPlayer;
		checkWin();
		checkDraw();
		togglePlayer();
	}
};

const togglePlayer = () => {
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
	turn.play();
	message.textContent = `It's ${currentPlayer}'s turn`;
	turn.play();
};

const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            message.textContent = `${currentPlayer} wins!`;
			document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "300px"
			music.play();
            gameOver = true;
            break;
        }
    }
};

const checkDraw = () => {
    if (!gameState.includes('') && !gameOver) {
        message.textContent = `It's a draw!`;
        gameOver = true;
		gameover.play();
    }
};

const resetGame = () => {
	for (let i = 0; i < squares.length; i++) {
		squares[i].textContent = '';
		gameState[i] = '';
	}
	currentPlayer = 'X';
	gameOver = false;
	message.textContent = `It's ${currentPlayer}'s turn`;
};

for (let i = 0; i < squares.length; i++) {
	squares[i].addEventListener('click', handleSquareClick);
}

reset.addEventListener('click', resetGame);
