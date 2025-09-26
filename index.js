let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let diddy_img = new Image();
diddy_img.src = './assets/diddy.png';

let DIDDY = {x: 0,y: 0, width: 200, height: 200,};

let speed = 20;
let side = "none";
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";

    ctx.fillRect(DIDDY.x, DIDDY.y, DIDDY.width, DIDDY.height);


    requestAnimationFrame(gameLoop);
}

function isCollision(rect1, rect2) {
        if (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        ) {
            // Collision detected!
            return true;
        } else {
            // No collision
            return false;
        }
}
function getMousePositionX(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    //console.log("Coordinate x: "+ x)
    return x;
}
function getMousePositionY(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let y = event.clientY - rect.top;
    //console.log("Coordinate y: "+ y)
    return y;
}
window.addEventListener("click", function(e) {
    let X = getMousePositionX(canvas, e);
    let Y = getMousePositionY(canvas, e);
    if (X > DIDDY.x && X < DIDDY.x + DIDDY.width && Y > DIDDY.y && Y < DIDDY.y + DIDDY.height) {
        if(Y < DIDDY.y + DIDDY.height / 2) {
            side = "up";

        }else {
            side = "down";
        }
        console.log(side);
    }
});
gameLoop();
