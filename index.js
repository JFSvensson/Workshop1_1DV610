const gameBoard = document.querySelector('.gameBoard');
const cell_11 = document.querySelector('#cell-1-1');
const cell_12 = document.querySelector('#cell-1-2');
const cell_13 = document.querySelector('#cell-1-3');
const cell_21 = document.querySelector('#cell-2-1');
const cell_22 = document.querySelector('#cell-2-2');
const cell_23 = document.querySelector('#cell-2-3');
const cell_31 = document.querySelector('#cell-3-1');
const cell_32 = document.querySelector('#cell-3-2');
const cell_33 = document.querySelector('#cell-3-3');

let turn = 1;

gameBoard.addEventListener('click', function(event) {
  if (event.target.innerText === '') {
    drawLogic(event.target);
  }
});

function drawLogic (targetCell) {

  if (turn%2 === 0) {
  targetCell.innerText = 'O';
  } else {
  targetCell.innerText = 'X';
  }
  turn++;

}
