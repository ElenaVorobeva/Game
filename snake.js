/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');


// creat box
const box = 32;

// add background
const ground = new Image();
ground.src = 'img/ground.png';

//add the head
const body1 = new Image();
body1.src = 'img/purpleVirus.png';
const body2 = new Image();
body2.src = 'img/greenVirus.png';
const head = new Image();
head.src = 'img/redVirus.png';

//add food img
const foodImg = new Image();
foodImg.src = 'img/food.png';

//audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";


// create snake
let snake = [];

snake[0] = {
  x : 9 * box,
  y : 10 * box
}

//creat the food
let food = {
  x : Math.floor(Math.random()*17+1) * box,
  y : Math.floor(Math.random()*15+3) * box,
}

//create the score let
let score = 0;

//snake control
let d;
document.addEventListener('keydown', direction);

function direction(event) {
  let key = event.keyCode;

  if (key == 37 && d != 'RIGHT') {
    d = 'LEFT';
    left.play()
  } else if (key == 38 && d != 'DOWN') {
    d = 'UP';
    up.play()

  } else if (key == 39 && d != 'LEFT') {
    d = 'RIGHT';
    right.play()

  } else if (key == 40 && d != 'UP') {
    d = 'DOWN';
    down.play()

  }
}

// draw everything to the canvas
function draw() {
  ctx.drawImage(ground, 0, 0);

  for(let i = 0; i < snake.length; i++) {

    // ctx.fillStyle = (i == 0) ? 'green' : 'white';
    if ( i == 0) {
      ctx.drawImage(head, snake[0].x, snake[0].y, box, box);
    }
    if (i % 2 == 0 && i !== 0) {
      ctx.drawImage(body1, snake[i].x, snake[i].y, box, box);
    }
    if (i % 2 !== 0) {
      ctx.drawImage(body2, snake[i].x, snake[i].y, box, box);
    }

    // ctx.strokeStyle = 'red';
    // ctx.strokeRect(snake[i].x, snake[i].y, box, box)

  }

  //draw the food
  ctx.drawImage(foodImg, food.x, food.y);

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //which direction
  if (d == 'LEFT') snakeX -= box;
  if (d == 'UP') snakeY -= box;
  if (d == 'RIGHT') snakeX += box;
  if (d == 'DOWN') snakeY += box;

  function collision (head, array) {
    for (let i = 0; i < array.length; i++) {
      if(head.x == array[i].x && head.y == array[i].y) {
        return true;
      }
    }
    return false;
  }

  //if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x : Math.floor(Math.random() * 17 + 1) * box,
      y : Math.floor(Math.random() * 15 + 3) * box,
    }
  } else {
    // remove the tail
    snake.pop();
  }

  //add new Head
  let newHead = {
    x : snakeX,
    y : snakeY
  }

  // game over
  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
    clearInterval(game);
    dead.play();
  }

  snake.unshift(newHead);

  //draw the score
  ctx.fillStyle = "white";
  ctx.font = '45px Canga one';
  ctx.fillText(score, 2*box, 1.6 * box);
}

// call draw function every 100ms
let game = setInterval(draw, 100);

