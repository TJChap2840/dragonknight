'use strict';

var canvas = document.getElementById('bingo-board');
var context = canvas.getContext('2d');

var mirror = document.getElementById('mirror');

var canvasSize = 600;
var squaresPerRow = 5;
var squareSize = canvasSize / squaresPerRow;
canvas.width = canvasSize;
canvas.height = canvasSize +50;

var filled = [];
var phrases = [];
phrases[0] = "Free Space";
for (var i = 1; i < squaresPerRow * squaresPerRow; i++) {
  filled[i] = false;
  phrases[i] = i;
}
phrases = shuffle(phrases);

var font = "12px Georgia";
var textAlign = "center";
var textBaseLine = "middle";
var fillStyle = "#000";

var newGameButton = {
  x: 0,
  y: canvasSize,
  width: canvasSize,
  height: 50
}

drawBoard();

function drawBoard() {
  fillSquares();
  drawLines();
  populateBoard();

  context.fillStyle="#aaa";
  context.fillRect(newGameButton.x, newGameButton.y, newGameButton.width, newGameButton.height);
  addPhrase("Reset Game", (canvasSize/2), canvasSize+30);
}

function drawLines() {
  context.lineWidth = 4;
  context.lineCap = 'round';
  context.strokeStyle = "#ddd";
  context.beginPath();

  for(var x = 1; x < squaresPerRow; x++) {
    context.moveTo(0, x * squareSize);
    context.lineTo(canvasSize, x * squareSize);
  }

  for(var x = 1; x < squaresPerRow; x++) {
    context.moveTo(x * squareSize, 0);
    context.lineTo(x * squareSize, canvasSize);
  }

  context.stroke();
}

function fillSquares() {
  for(var x = 0; x < squaresPerRow; x++) {
    for(var y = 0; y < squaresPerRow; y++) {
      var currentSquare = (x*squaresPerRow)+y;
      var color = "#fff";
      if (filled[currentSquare]) color = "#8cd98c";
      drawSquare(color, x*squareSize, y*squareSize, squareSize, squareSize);
    }
  }
}

function populateBoard() {
  for(var x = 0; x < squaresPerRow; x++) {
    for(var y = 0; y < squaresPerRow; y++) {
      var currentSquare = (x*squaresPerRow)+y;
      addPhrase(phrases[currentSquare], (x*squareSize)+(squareSize/2), (y*squareSize)+(squareSize/2));
    }
  }
}

function addPhrase(phrase, x, y) {
  context.font = "12px Georgia";
  context.textAlign = "center";
  context.textBaseLine = "middle";
  context.fillStyle = "#000";
  context.fillText(phrase, x, y);
}

function drawSquare(color, x, y, width, height) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function getMousePosition(event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}

function fillSquare(mousePosition) {
  var x = Math.floor(mousePosition.x / squareSize);
  if (mousePosition.y > canvasSize) return;
  var y = Math.floor(mousePosition.y / squareSize);
  var clickedSquare = (x*squaresPerRow)+y;

  if (filled[clickedSquare] == true) filled[clickedSquare] = false;
  else filled[clickedSquare] = true;

  drawBoard();
  if (checkCol(clickedSquare) || checkRow(clickedSquare) || checkDiagonal()) {
    var result = confirm("Upload this to imgur to prove you victory?");
    if (result == true) uploadToImgur();
    // window.open(canvas.toDataURL());
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  var freeSpace = array.indexOf("Free Space");
  var middleSpace = Math.ceil(squaresPerRow*squaresPerRow/2)-1;
  var temp = array[middleSpace];
  array[middleSpace] = array[freeSpace];
  array[freeSpace] = temp;

  return array;
}


function checkCol(clickedIndex) {
  var currentCol = Math.floor(clickedIndex/squaresPerRow);
  var min = currentCol * squaresPerRow;
  var max = (currentCol+1) * squaresPerRow;

  var count = 0;
  for (var i = min; i < max; i++) {
    if (filled[i]) count++;
  }

  if (count == 5) return true;
  return false;
}

function checkRow(clickedIndex) {
  var currentRow = clickedIndex % squaresPerRow;

  var count = 0;
  for (var i = 0; i < squaresPerRow; i++) {
    if (filled[currentRow+(squaresPerRow*i)]) count++;
  }

  if (count == 5) return true;
  return false;
}

function checkDiagonal() {
  var topLeft = 0;
  for (var i = 0; i < 5; i++) {
    if (filled[i+(5*i)]) topLeft++;
  }

  var topRight = 0
  for (var i = 1; i < 6; i++) {
    if (filled[i*4]) topRight++;
  }

  if (topLeft == 5 || topRight == 5) return true;
  return false;
}

function uploadToImgur() {
  try {
    var img = canvas.toDataURL('image/jpeg', 0.9).split(',')[1];
  } catch(e) {
      var img = canvas.toDataURL().split(',')[1];
  }

  $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'post',
      headers: {
          Authorization: 'Client-ID 0d910ce3bc896c0'
      },
      data: {
          image: img
      },
      dataType: 'json',
      success: function(response) {
          if(response.success) {
              window.location = response.data.link;
              // console.log(response.data.link);
          }
      }
  });
}

canvas.addEventListener('mouseup', function(event) {
  var mousePosition = getMousePosition(event);
  fillSquare(mousePosition);
  if (isInside(mousePosition, newGameButton)) {
    newGame();
  }
});

function newGame() {
  filled = [];
  phrases = [];
  phrases[0] = "Free Space";
  for (var i = 1; i < squaresPerRow * squaresPerRow; i++) {
    filled[i] = false;
    phrases[i] = i;
  }
  phrases = shuffle(phrases);

  drawBoard();
}




