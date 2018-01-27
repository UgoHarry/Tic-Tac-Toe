
//The original board
var origBoard;
//Player Symbols
const huPlayer = 'O';
const aiPlayer = 'X';
//Winning combinations
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

//All pods /cells
const cells = document.querySelectorAll('.cell');
startGame();

//////////FUNCTION TO START GAME//////////////
function startGame() {
  document.querySelector(".gameBoard").style.display = "none";
//Adding initial values to original board variable (0 - 9)
  origBoard = Array.from(Array(9).keys());
//Go through every cell
	for (var i = 0; i < cells.length; i++) {
    //Remove the value
    cells[i].innerText = '';
    //Remove match colour
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

//////////TURN CLICK FUNCTION/////////////
function turnClick(square) {
  //IF the pod has not been filled
	if (typeof origBoard[square.target.id] == 'number') {
    //Call the turn function and pass it the ID of the element
		turn(square.target.id, huPlayer)
		if (!checkWin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player) {
  //Update the board array with the player that just played
  origBoard[squareId] = player;
  //Display their symbol on the grid
  document.getElementById(squareId).innerText = player;
  //check if player has won
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
  //go through the board, and add to new array 
  // the indexes which have been played by the player
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  // for every win index and its array item in the winCombos array
	for (let [index, win] of winCombos.entries()) {
    //if every item in the win array is also in the plays array
		if (win.every(elem => plays.indexOf(elem) > -1)) {
      //set gameWon to an object 
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose.");
}

//function to display winner
function declareWinner(who) {
	document.querySelector(".gameBoard").style.display = "block";
	document.querySelector(".gameBoard .text p").innerText = who;
}

//function to check for empty squaares left in grid
function emptySquares() {
	return origBoard.filter(s => typeof s == 'number');
}

//function to check for best spots for AI play
function bestSpot() {
	return minimax(origBoard, aiPlayer).index;
}

//function to check if the game is a tie
function checkTie() {
  //IF there are no empty pods left
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}


//Minimax function
function minimax(newBoard, player) {
	var availSpots = emptySquares(newBoard);

	if (checkWin(newBoard, huPlayer)) {
		return {score: -10};
	} else if (checkWin(newBoard, aiPlayer)) {
		return {score: 10};
	} else if (availSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) {
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}