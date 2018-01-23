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
}