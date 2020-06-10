let canvas;
let context;
let gameBoardArrayHeight = 20;
let gameBoardArrayWidth = 12;
let startX = 4;
let startY = 0;
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
let tetrominoColor = ["teal", "yellow", "navy", "grey", "brown", "pink", "red"];
let currentTetrominoColor;

let gameBoardArray = [...Array(gameBoardArrayHeight)].map(e =>
  Array(gameBoardArrayWidth).fill(0)
);

let DIRECTION = {
  IDLE: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
};
let direction;

// $("DOMcontentLoaded").ready(SetupCanvas);
document.addEventListener("DOMcontentLoaded", SetupCanvas);

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
  canvas = document.getElementById("#my-canvas");
  context = canvas.getContext("2d");
  canvas.width = 936;
  canvas.height = 956;

  context.scale(2, 2);

  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "black";
  context.strokeRect(8, 8, 280, 462);

  document.addEventListener("keydown", HandleKeyPress);
  CreateTetrominos();
  CreateTetromino();

  CreateCoordinateArray();
  DrawTetromino();
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
  // clicked on the A key to move to the left
  if (key.keyCode === 65) {
    direction = DIRECTION.LEFT;
    DeleteTetromino();
    startX--;
    DrawTetromino();
  } else if (key.keyCode === 68) {
    // clicked on the D key to move to the right
    direction = DIRECTION.RIGHT;
    DeleteTetromino();
    startX++;
    DrawTetromino();
  } else if (key.keyCode === 83) {
    // clicked on the S key to move to the down
    direction = DIRECTION.DOWN;
    DeleteTetromino();
    startY++;
    DrawTetromino();
  }
}

// cycle through values to delete
function DeleteTetromino() {
  for (let i = 0; i < currentTetromino.length; i++) {
    let x = currentTetromino[i][0] + startX;
    let x = currentTetromino[i][1] + startY;

    gameBoardArray[x][y] = 0;
    let coordinateX = coordinateArray[x][y].x;
    let coordinateY = coordinateArray[x][y].y;

    context.fillStyle = "white";
    context.fillRect(coordinateX, coordinateY, 21, 21);
  }
}
