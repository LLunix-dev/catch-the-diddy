let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

let diddy_img = new Image();
diddy_img.src = './assets/diddy22.png';

let DIDDY = {x: 500,y: 500, width: 256, height: 256};

let speed = 15;
let side = "none";
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let angleInDegrees = 0;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(diddy_img,DIDDY.x, DIDDY.y, DIDDY.width, DIDDY.height);


    requestAnimationFrame(gameLoop);
}

function getMousePositionX(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    return x;
}
function getMousePositionY(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let y = event.clientY - rect.top;
    return y;
}

function getDegrees(radiant){
    return radiant / (Math.PI * 2) * 360;
}

window.addEventListener("mousemove", function(e) {
    let X = getMousePositionX(canvas, e);
    let Y = getMousePositionY(canvas, e);

    if (X > DIDDY.x && X < DIDDY.x + DIDDY.width && Y > DIDDY.y && Y < DIDDY.y + DIDDY.height) {
        if(Y < DIDDY.y + DIDDY.height / 2) {
            side = "up";

            let targetY = (DIDDY.y + DIDDY.height /2) - Y ;
            targetY -= targetY * 2;

            let targetX = (DIDDY.x + DIDDY.width / 2) - X ;

            let angleInRadians = Math.atan2(targetY, targetX);
            angleInDegrees = getDegrees(angleInRadians);
            console.log("angle in degrees:", angleInDegrees, "°");

            let vx = Math.cos((2* Math.PI) - angleInRadians) * speed;
            let vy = Math.sin((2* Math.PI) - angleInRadians) * speed;

            DIDDY.x += vx;
            DIDDY.y += vy;


        }else {
            side = "down";
            let targetY = Y - (DIDDY.y + DIDDY.height /2) ;
            let targetX = X - (DIDDY.x + DIDDY.width / 2);
            let angleInRadians = Math.atan2(targetY, targetX);

            let vx = Math.cos(angleInRadians) * speed;
            let vy = Math.sin(angleInRadians) * speed;

            DIDDY.x -= vx;
            DIDDY.y -= vy;
        }
        console.log(side);
    }
});
gameLoop();
