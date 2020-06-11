let canvas;
let context;
let gameBoardArrayHeight = 20;
let gameBoardArrayWidth = 12;
let startX = 4;
let startY = 0;

let score = 0;
let level = 1;
let winOrLose = "Playing";

let tetrisLogo;

let coordinateArray = [...Array(gameBoardArrayHeight)].map(e =>
  Array(gameBoardArrayWidth).fill(0)
);
let currentTetromino = [[1, 0], [0, 1], [1, 1], [2, 1]];

class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let tetrominos = [];
let tetrominoColors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "teal"
];
let currentTetrominoColor;

let gameBoardArray = [...Array(gameBoardArrayHeight)].map(e =>
  Array(gameBoardArrayWidth).fill(0)
);

let stoppedShapeArray = [...Array(gameBoardArrayHeight)].map(e =>
  Array(gameBoardArrayWidth).fill(0)
);

let DIRECTION = {
  IDLE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
};
let direction;

// $("DOMContentLoaded").ready(SetupCanvas);
document.addEventListener("DOMContentLoaded", SetupCanvas);

function CreateCoordinateArray() {
  let i = 0,
    j = 0;
  for (let y = 9; y <= 446; y++) {
    for (let x = 11; x <= 264; x += 23) {
      coordinateArray[i][j] = new Coordinates(x, y);
      i++;
    }
    j++;
    i = 0;
  }
}

function SetupCanvas() {
  canvas = document.getElementById("my-canvas");
  context = canvas.getContext("2d");
  canvas.width = 936;
  canvas.height = 956;

  context.scale(2, 2);

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "black";
  context.strokeRect(8, 8, 280, 462);

  tetrisLogo = new Image(161, 54);
  tetrisLogo.onload = DrawTetrisLogo;
  tetrisLogo.src = "assets/img/tetrislogo.png";

  context.fillStyle = "black";
  context.font = "21px Arial";
  context.fillText("SCORE", 300, 98);

  context.strokeRect(300, 107, 161, 24);
  context.fillText(score.toString(), 310, 127);
  context.fillText("LEVEL", 300, 157);
  context.strokeRect(300, 171, 161, 24);
  context.fillText(level.toString(), 310, 190);
  context.fillText("WIN / LOSE", 300, 221);
  context.fillText(winOrLose, 310, 261);
  context.strokeRect(300, 232, 161, 95);
  context.fillText("CONTROLS", 300, 354);
  context.strokeRect(300, 366, 166, 104);
  context.font = "19px Arial";
  context.fillText("A : Move Left", 310, 388);
  context.fillText("D : Move RIGHT", 310, 413);
  context.fillText("S : Move DOWN", 310, 438);
  context.fillText("E : Rotate Right", 310, 463);

  document.addEventListener("keydown", HandleKeyPress);
  CreateTetrominos();
  CreateTetromino();

  CreateCoordinateArray();
  DrawTetromino();
}

function DrawTetrisLogo() {
  context.drawImage(tetrisLogo, 300, 8, 161, 54);
}

function DrawTetromino() {
  for (let i = 0; i < currentTetromino.length; i++) {
    let x = currentTetromino[i][0] + startX;
    let y = currentTetromino[i][1] + startY;
    gameBoardArray[x][y] = 1;
    let coordinateX = coordinateArray[x][y].x;
    let coordinateY = coordinateArray[x][y].y;

    context.fillStyle = currentTetrominoColor;
    context.fillRect(coordinateX, coordinateY, 21, 21);
  }
}

// pass the key that was pressed
function HandleKeyPress(key) {
  if (winOrLose != "Game Over") {
    if (key.keyCode === 65) {
      direction = DIRECTION.LEFT;
      if (!HittingTheWall() && !CheckHorzCollision()) {
        DeleteTetromino();
        startX--;
        DrawTetromino();
      }
    } else if (key.keyCode === 68) {
      direction = DIRECTION.RIGHT;
      if (!HittingTheWall() && !CheckHorzCollision()) {
        DeleteTetromino();
        startX++;
        DrawTetromino();
      }
    } else if (key.keyCode === 83) {
      MoveTetrominoDown();
    } else if (key.keyCode === 69) [Rotate()];
  }

  // clicked on the A key to move to the left
  if (key.keyCode === 65) {
    direction = DIRECTION.LEFT;
    if (!HittingTheWall()) {
      DeleteTetromino();
      startX--;
      DrawTetromino();
    }
  } else if (key.keyCode === 68) {
    // clicked on the D key to move to the right
    direction = DIRECTION.RIGHT;
    if (!HittingTheWall()) {
      DeleteTetromino();
      startX++;
      DrawTetromino();
    }
  } else if (key.keyCode === 83) {
    MoveTetrominoDown();
  }
}

function MoveTetrominoDown() {
  direction = DIRECTION.DOWN;
  // clicked on the S key to move to the down
  if (!CheckForVertCollision()) {
    DeleteTetromino();
    startY++;
    DrawTetromino();
  }
}

window.setInterval(function() {
  if (winOrLose != "Game Over") {
    MoveTetrominoDown();
  }
}, 1000);

// cycle through values to delete
function DeleteTetromino() {
  for (let i = 0; i < currentTetromino.length; i++) {
    let x = currentTetromino[i][0] + startX;
    let y = currentTetromino[i][1] + startY;

    gameBoardArray[x][y] = 0;
    let coordinateX = coordinateArray[x][y].x;
    let coordinateY = coordinateArray[x][y].y;

    context.fillStyle = "white";
    context.fillRect(coordinateX, coordinateY, 21, 21);
  }
}

// store shapes
function CreateTetrominos() {
  //  T
  tetrominos.push([[1, 0], [0, 1], [1, 1], [2, 1]]);
  //  I
  tetrominos.push([[0, 0], [1, 0], [2, 0], [3, 0]]);
  //  J
  tetrominos.push([[0, 0], [0, 1], [1, 1], [2, 1]]);
  //  Square
  tetrominos.push([[0, 0], [1, 0], [0, 1], [1, 1]]);
  //  L
  tetrominos.push([[2, 0], [0, 1], [1, 1], [2, 1]]);
  //  S
  tetrominos.push([[1, 0], [2, 0], [0, 1], [1, 1]]);
  //  Z
  tetrominos.push([[0, 0], [1, 0], [1, 1], [2, 1]]);
}

function CreateTetromino() {
  let randomTetromino = Math.floor(Math.random() * tetrominos.length);
  currentTetromino = tetrominos[randomTetromino];
  currentTetrominoColor = tetrominoColors[randomTetromino];
}

function HittingTheWall() {
  for (let i = 0; i < currentTetromino.length; i++) {
    let newX = currentTetromino[i][0] + startX;
    if (newX <= 0 && direction === DIRECTION.LEFT) {
      return true;
    } else if (newX >= 11 && direction === DIRECTION.RIGHT) {
      return true;
    }
  }
  return false;
}

function CheckForVertCollision() {
  let tetrominoCopy = currentTetromino;
  let collision = false;
  for (let i = 0; i < tetrominoCopy; i++) {
    let square = tetrominoCopy[i];
    let x = square[0] + startX;
    let y = square[1] + startY;
    if (direction === DIRECTION) {
      y++;
    }
    if (gameBoardArray[x][y + 1] === 1) {
      if (typeof stoppedShapeArray[x][y + 1] === "string") {
        DeleteTetromino();
        startY++;
        DrawTetromino();
        collision = true;
        break;
      }
      if (y >= 20) {
        collision = true;
        break;
      }
    }
    if (collision) {
      if (startY <= 2) {
        winOrLose = "Game Over";
        context.fillStyle = "white";
        context.fillRect(310, 242, 140, 30);
        context.fillStyle = "black";
        context.fillText(winOrLose, 310, 261);
      } else {
        for (let i = 0; i < tetrominoCopy.length; i++) {
          let square = tetrominoCopy[i];
          let x = square[0] + startX;
          let y = square[1] + startY;
          stoppedShapeArray[x][y] = currentTetrominoColor;
        }
        CheckForCompletedRows();
        CreateTetromino();
        direction = DIRECTION.IDLE;
        startX = 4;
        startY = 0;
        DrawTetromino();
      }
    }
  }
}

function CheckHorzCollision() {
  let tetrominoCopy = currentTetromino;
  let collision = false;
  for (let i = 0; i < tetrominoCopy; i++) {
    let square = tetrominoCopy[i];
    let x = square[0] + startX;
    let y = square[1] + startY;

    if (direction === DIRECTION.LEFT) {
      x--;
    } else if (direction === DIRECTION.RIGHT) {
      x++;
    }
    var stoppedShapeVal = stoppedShapeArray[x][y];
    if (typeof stoppedShapeVal === "string") {
      collision = true;
      break;
    }
  }
  return collision;
}

function CheckForCompletedRows() {
  let rowsToDelete = 0;
  startOfDelete = 0;
  for (let y = 0; y < gameBoardArrayHeight; y++) {
    let completed = true;
    for (let x = 0; x < gameBoardArrayWidth; x++) {
      let square = stoppedShapeArray[x][y];
      if (square === 0 || typeof square === "undefined") {
        completed = false;
        break;
      }
    }
    if (completed) {
      if (startOfDelete === 0) startOfDelete = y;
      rowsToDelete++;
      for (let i = 0; i < gameBoardArray; i++) {
        stoppedShapeArray[i][y] = 0;
        gameBoardArray[i][y] = 0;
        let coordinateX = coordinateArray[i][y].x;
        let coordinateY = coordinateArray[i][y].y;
        context.fillRect(coordinateX, coordinateY, 21, 21);
      }
    }
  }
  if (rowsToDelete > 0) {
    score += 10;
    context.fillStyle = "white";
    context.fillRect(310, 109, 140, 19);
    context.fillText(score.toString(), 310, 127);
    MoveAllRowsDown(rowsToDelete, startOfDelete);
  }
}

function MoveAllRowsDown(rowsToDelete, startOfDelete) {
  for (var i = startOfDelete - 1; i >= 0; i--) {
    for (var x = 0; x < gameBoardArray; x++) {
      var y2 = i + rowsToDelete;
      var square = stoppedShapeArray[x][i];
      var nextSquare = stoppedShapeArray[x][y2];
      if (typeof square === "string") {
        nextSquare = square;
        gameBoardArray[x][y2] = 1;
        stoppedShapeArray[x][y2] = square;
        let coordinateX = coordinateArray[x][y2].x;
        let coordinateY = coordinateArray[x][y2].y;
        context.fillRect(coordinateX, coordinateY, 21, 21);

        square = 0;
        gameBoardArray[x][i] = 0;
        stoppedShapeArray[x][i] = 0;
        coordinateX = coordinateArray[x][i].x;
        coordinateY = coordinateArray[x][i].y;
        context.fillStyle = "white";
        context.fillRect(coordinateX, coordinateY, 21, 21);
      }
    }
  }
}

function Rotate() {
  let newRotation = new Array();
  let tetrominoCopy = currentTetromino;
  let currentTetrominoBackUp;
  for (let i = 0; i < tetrominoCopy.length; i++) {
    currentTetrominoBackUp = [...currentTetromino];
    let x = tetrominoCopy[i][0];
    let y = tetrominoCopy[i][1];
    let newX = GetLastSquareX() - y;
    let newY = x;
    newRotation.push([newX, newY]);
  }
  DeleteTetromino();
  try {
    currentTetromino = newRotation;
    DrawTetromino();
  } catch (e) {
    if (e instanceof TypeError) {
      currentTetromino = currentTetrominoBackUp;
      DeleteTetromino();
      DrawTetromino();
    }
  }
}

function GetLastSquareX() {
  let lastX = 0;
  for (let i = 0; i < currentTetromino.length; i++) {
    let square = currentTetromino[i];
    if (square[0] > lastX) lastX = square[0];
  }
  return lastX;
}
