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

let direction = {
  idle: 0,
  down: 1,
  left: 2,
  right: 3
};
let direction;

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

  CreateCoordinateArray();
  DrawTetromino();
}

function DrawTetromino() {
  for (let i = 0; i < currentTetromino.length; i++) {
    let x = currentTetromino[i][0] + startX;
    let y = currentTetromino[i][1] + startY;
  }
}
