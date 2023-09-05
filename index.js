
// define variables for gameboard and cells and info text division
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
const info = document.querySelector('#gameinfo');

let turn = 1;
info.textContent = `turn ${turn}`

// add event listener to gameboard
const clickListener = gameBoard.addEventListener ('click', clickHandler)

/**
 * Handles the click event on the gameboard.
 * Check the board for a winner and if there is one, display the winner and remove the event listener.
 *
 * @param {event} event - the click event object.
 */
function clickHandler (event){
  info.textContent = `turn ${turn}`
  if (event.target.innerText === '') {
    drawSymbol(event.target);
    const id = event.target.attributes.id.nodeValue;
    const row = id.split('-')[1];
    const column = id.split('-')[2];
    gameLogic(row, column);
    console.log(returnCellContent(row, column))
  }
};

/**
 * Draws the symbol in the target cell depending on the turn.
 *
 * @param {element} targetCell - the cell that was clicked.
 */
function drawSymbol (targetCell) {
  if (turn%2 === 0) {
  targetCell.innerText = 'O';
  } else {
  targetCell.innerText = 'X';
  }
  turn++;
}

/**
 * Checks for winner and displays the winner or draw.
 *
 */
function gameLogic () {
  checkHorizonWins();
  checkVerticalWins();
  checkDiagonalWins();

  if (turn === 10) {
    info.textContent = `Draw`
    gameBoard.removeEventListener('click', clickHandler)
  }
}

// check for winner on horizontal rows
function checkHorizonWins () {
  for (let i = 1; i < 4; i++){
    if (checkHorizontal(i)) {
      info.textContent = `Winner ${checkHorizontal(i)}`
      gameBoard.removeEventListener('click', clickHandler)
      return
    }
  }
}

// check for winner on vertical columns
function checkVerticalWins () {
  for (let i = 1; i < 4; i++) {
    if (checkVertical(i)) {
      info.textContent = `Winner ${checkVertical(i)}`
      gameBoard.removeEventListener('click', clickHandler)
      return
    }
  }
}

// check for winner on diagonals
function checkDiagonalWins() {
  if (checkDiagonal()) {
    info.textContent = `Winner ${checkDiagonal()}`
    gameBoard.removeEventListener('click', clickHandler)
    return
  }
}

// check for winner on A column
function checkHorizontal (column) {
  if(returnCellContent(1, column) === returnCellContent(2, column) && returnCellContent(2, column) === returnCellContent(3, column)) {
    if(returnCellContent(1, column) !== ''){
      highlightWinningColumn(column);
      return returnCellContent(1, column)
    }
  }

  return false
}

// check for winner on A row
function checkVertical (row) {
  if(returnCellContent(row, 1) === returnCellContent(row, 2) && returnCellContent(row, 2) === returnCellContent(row, 3)) {
    if(returnCellContent(row, 1) !== ''){
      highlightWinningRow(row);
      return returnCellContent(row, 1)
    }
  }

  return false
}

// check for winner on diagonals
function checkDiagonal () {
  if(returnCellContent(1, 1) === returnCellContent(2, 2) && returnCellContent(2, 2) === returnCellContent(3, 3)) {
    if(returnCellContent(1, 1) !== ''){
      highlightWinningDiagonalTopLeftBottomRight();
      return returnCellContent(1, 1)
    }
  } else if (returnCellContent(1, 3) === returnCellContent(2, 2) && returnCellContent(2, 2) === returnCellContent(3, 1)) {
    if(returnCellContent(1, 3) !== ''){
      highlightWinningDiagonalTopRightBottomLeft();
      return returnCellContent(1, 3)
    }
  }

  return false
}

// return the content of a cell
function returnCellContent(row, column) {
  const cellId = "#cell-" + row + "-" + column;
  const cell = document.querySelector(cellId);
  return cell.innerText;
}

function highlightWinningRow (row) {
  for (let i = 1; i < 4; i++) {
    highlightWinningCell(row, i);
  }
}

function highlightWinningColumn (column) {
  for (let i = 1; i < 4; i++) {
    highlightWinningCell(i, column);
  }
}

function highlightWinningDiagonalTopLeftBottomRight () {
  for (let i = 1; i < 4; i++) {
    highlightWinningCell(i, i);
  }
}

function highlightWinningDiagonalTopRightBottomLeft () {
  for (let i = 1; i < 4; i++) {
    highlightWinningCell(i, 4-i);
  }
}

function highlightWinningCell (row, column) {
  const cellId = "#cell-" + row + "-" + column;
  const cell = document.querySelector(cellId);
  cell.style.backgroundColor = 'green';
}