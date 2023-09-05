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

const clickListener = gameBoard.addEventListener ('click', clickHandler)

function clickHandler (event){
  info.textContent = `turn ${turn}`
  if (event.target.innerText === '') {
    drawLogic(event.target);
    const id = event.target.attributes.id.nodeValue;
    const row = id.split('-')[1];
    const column = id.split('-')[2];
    gameLogic(row, column);
    console.log(returnCellContent(row, column))
  }
};

function drawLogic (targetCell) {
  if (turn%2 === 0) {
  targetCell.innerText = 'O';
  } else {
  targetCell.innerText = 'X';
  }
  turn++;
}


function gameLogic () {
  checkHorizonWins();
  checkVerticalWins();
  checkDiagonalWins();

  if (turn === 10) {
    info.textContent = `Draw`
    gameBoard.removeEventListener('click', clickHandler)
    return
  }
}

function checkHorizonWins () {
  for (i = 1; i < 4; i++){
    if (checkHorizontal(i)) {
      info.textContent = `Winner ${checkHorizontal(i)}`
      gameBoard.removeEventListener('click', clickHandler)
      return
    }
  }
}

function checkVerticalWins () {
  for (i = 1; i < 4; i++) {
    if (checkVertical(i)) {
      info.textContent = `Winner ${checkVertical(i)}`
      gameBoard.removeEventListener('click', clickHandler)
      return
    }
  }
}

function checkDiagonalWins() {
  if (checkDiagonal()) {
    info.textContent = `Winner ${checkDiagonal()}`
    gameBoard.removeEventListener('click', clickHandler)
    return
  }
}

function checkHorizontal (column) {
  if(returnCellContent(1, column) === returnCellContent(2, column) && returnCellContent(2, column) === returnCellContent(3, column)) {
    if(returnCellContent(1, column) !== ''){
      return returnCellContent(1, column)
    }
  }

  return false
}

function checkVertical (row) {
  if(returnCellContent(row, 1) === returnCellContent(row, 2) && returnCellContent(row, 2) === returnCellContent(row, 3)) {
    if(returnCellContent(row, 1) !== ''){
      return returnCellContent(row, 1)
    }
  }

  return false
}

function checkDiagonal () {
  if(returnCellContent(1, 1) === returnCellContent(2, 2) && returnCellContent(2, 2) === returnCellContent(3, 3)) {
    if(returnCellContent(1, 1) !== ''){
      return returnCellContent(1, 1)
    }
  } else if (returnCellContent(1, 3) === returnCellContent(2, 2) && returnCellContent(2, 2) === returnCellContent(3, 1)) {
    if(returnCellContent(1, 3) !== ''){
      return returnCellContent(1, 3)
    }
  }

  return false
}

function returnCellContent(row, column) {
  const cellId = "#cell-" + row + "-" + column;
  const cell = document.querySelector(cellId);
  return cell.innerText;
}