const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const RIGHT = "right";
const LEFT = "left;"
const UP = "up";
const DOWN = "down"

let game = setInterval(draw,100);

//player position
//Point position = new Point(x,y)
var x = 0;
var y = 0;
var direction;

document.addEventListener("keydown",changeDirection)

function changeDirection(event) {
    var key = event.keyCode;
    
    switch(key) {
        case 37: direction = LEFT; break;
        case 38: direction = UP; break;
        case 39: direction = RIGHT; break;
        case 40: direction = DOWN; break;
    }
}

function move() {
    switch(direction){
        case UP: y -=20; break;
        case DOWN: y+=20; break;
        case RIGHT: x+=20; break;
        case LEFT: x-=20; break;
    }
    checkCollisionWithBorder();
}

function checkCollisionWithBorder() {
    if(x < 0)
        x= 0;
    if(x > 580)
        x = 580;
    if(y < 0)
        y=0;
    if(y > 580)
        y=580;
}

function draw() {
    ctx.fillStyle="black";
    ctx.fillRect(0,0,cvs.width, cvs.height);
    
        
    move();

    ctx.fillStyle="red";
    ctx.fillRect(x,y, 20, 20);
}


