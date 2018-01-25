//VARIABLES

//The original board
var origBoard;

//Player Symbols
const manPlayer = "O";
const aiPlayer = "X";

//Winning combinations
const winCombos = [
  [0,1,2],
  [0,4,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [3,4,5],
  [6,4,2],
  [6,7,8]
]

//All pods /cells
const cells = document.querySelectorAll('.cell');
console.log(cells.length);

startGame();


//////////FUNCTION TO START GAME//////////////
function startGame () {
  console.log("Let it Begin!");
  document.querySelector('.gameBoard').style.display = "none";
  //Adding initial values to original board variable (0 - 9)
  origBoard = Array.from(Array(9).keys());
  console.log(origBoard);
  //Go through every cell
  for(var i = 0; i < cells.length; i++) {
    //Remove the value
    cells[i].innerText = "";
    //Remove match colour
    cells[i].style.removeProperty('background-color');
    cells[i].addEventListener('click',turnClick)
  }
}

//////////TURN CLICK FUNCTION/////////////
function turnClick(el) {
  console.log(el.target.id);
  //Call the turn function and pass it the ID of the element
  turn(el.target.id, manPlayer);
}

function turn(elID, player) {
  //Update the board array with the player that just played
  origBoard[elID] = player;
  //Display their symbol on the grid
  document.getElementById(elID).innerText = player;
  //check if player has won
  let gameWon = playcheck(origBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }
}

function playcheck(board, plyr) {
  console.log("Playcheck");
  //go through the board, and add to new array 
  // the indexes which have been played by the player
  let plays = board.reduce( (d, y, i) =>
    (y === plyr) ? d.concat(i) : d
  , []);
  console.log (plays);
  let gameWon = null;
  // for every win index and its array item in the winCombos array
  for(let [index, win] of winCombos.entries() ) {
    console.log (win);
    //if every item in the win array is also in the plays array
    if(win.every(elem =>plays.indexOf(elem) > -1)){
      //set gameWon to an object 
      gameWon = {index: index, player: plyr};
      break;
    }
  }
  return gameWon;
}


function gameOver (gameWon) {
  for (index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = 
      gameWon.player === manPlayer ? "blue" : "red";
  }

  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click',turnClick, false);
  }
}