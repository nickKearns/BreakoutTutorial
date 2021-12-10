/* eslint-disable import/extensions */
import Ball from './Ball.js';
import Brick from './Brick.js';
import Bricks from './Bricks.js';
import GameLabel from './GameLabel.js';
/* eslint-disable no-alert */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let rightPressed = false;
let leftPressed = false;
let lastDirection = 0;

let totalScore = 0;
let totalLives = 3;

const ball = new Ball(100, 300, 10, 'orange');
const paddle = new Brick((canvas.width - 75 / 2), canvas.height - 10, 75, 10, '#0095DD');
const score = new GameLabel(8, 20, `Score: ${totalScore}`, '16px Helvetica', 'red', 'left');
const lives = new GameLabel(canvas.width - 65, 20, `Lives: ${totalLives}`);
const bricks = new Bricks();

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
    lastDirection = 0;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
    lastDirection = 1;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
    lastDirection = 0;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
    lastDirection = 1;
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function collisionDetection() {
  for (let c = 0; c < bricks.cols; c += 1) {
    for (let r = 0; r < bricks.row; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + b.width && ball.y > b.y && ball.y < b.y + b.height) {
          ball.dy = -ball.dy;
          b.status = 0;
          totalScore += 1;
        }
        if (totalScore === bricks.rows * bricks.cols) {
          alert('YOU WIN, CONRATULATIONS!');
          document.location.reload();
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bricks.render(ctx);
  ball.render(ctx);
  paddle.render(ctx);
  score.render(ctx);
  lives.render(ctx);

  collisionDetection();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      if (lastDirection === 0) {
        if (ball.dx < 0) {
          ball.dx = -ball.dx;
        }
      } else if (ball.dx > 0) {
        ball.dx = -ball.dx;
      }

      ball.dy = -ball.dy;
    } else {
      totalLives -= 1;
      if (!totalLives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.x = (canvas.width - paddle.width) / 2;
      }
    }
  }

  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
  requestAnimationFrame(draw);
}

draw();
