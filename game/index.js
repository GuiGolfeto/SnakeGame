import { SNAKE_SPEED, draw as snakeDraw, update as snakeUpdate, getSnakeHead, snakeBody, hasSelfCollision as hasSnakeSelfCollision } from './Snake/index.js'
import { gameboard, isOutsideBoard } from './Board/index.js'
import { draw as foodDraw, update as foodUpdate } from './Food/index.js';
import { points } from './Points/index.js'

let lastTimeRender = 0;

// currentTime -> milisegundos
function main(currentTime){

    if (checkGameOver()){
        if (confirm(`Você perdeu o jogo com ${(snakeBody.length - 1)} pontos`)){
            window.location.reload();
        }else { 
            window.requestAnimationFrame(main);
        }

        return;
    }


    window.requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastTimeRender) / 1000;

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastTimeRender = currentTime;

    update();

    draw();
}


function update(){
    points.innerHTML = snakeBody.length - 1;
    gameboard.innerHTML = ''
    snakeUpdate();
    foodUpdate();
}

function draw(){
    snakeDraw();
    foodDraw();
}

function checkGameOver(){
    return isOutsideBoard(getSnakeHead()) || hasSnakeSelfCollision()
}

window.requestAnimationFrame(main);