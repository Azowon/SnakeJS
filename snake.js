const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const RIGHT = "right";
const LEFT = "left;"
const UP = "up";
const DOWN = "down"

let game = setInterval(draw,100);

//player position
//Point position = new Point(x,y)
var x = [40];
var y = [40];
var direction = RIGHT;

document.addEventListener("keydown",changeDirection)

function changeDirection(event) {
    var key = event.keyCode;
    
    switch(key) {
        case 32: eat(); break;
        case 37: direction = LEFT; break;
        case 38: direction = UP; break;
        case 39: direction = RIGHT; break;
        case 40: direction = DOWN; break;
    }
}

function move() {


    for(var i = x.length-1; i>0; i--){
        x[i] = x[i-1];
        y[i] = y[i-1];
    }


    switch(direction){
        case UP: y[0]-=20; break;
        case DOWN: y[0]+=20; break;
        case RIGHT: x[0]+=20; break;
        case LEFT: x[0]-=20; break;
    }


    if(collisionWithTail() || checkCollisionWithBorder()){
        die();
    }
}

function checkCollisionWithBorder() {

    if(x[0] < 0){
        return true;
    }
    if(x[0] > 580) {
        return true;
    }
    if(y[0] < 0) {
        return true;
    }
    if(y[0] > 580){
        return true;
    }

    return false;
}

function draw() {
    move();
    ctx.fillStyle="black";
    ctx.fillRect(0,0,cvs.width, cvs.height);
    drawSnake();    
    
    
}

function eat() {
    x.push(x[x.length-1]);
    y.push(y[y.length-1])
    
}

function drawSnake(){
    for(var i = 0; i < x.length; i++) {
        ctx.fillStyle="red";
        ctx.fillRect(x[i],y[i], 20, 20);
    }
}

function collisionWithTail() {
    
    for(var i = 1; i < x.length; i++) {
        if(x[0] == x[i] && y[0] == y[i] ) {
            return true;
        }
    }
    return false;
}

function die() {
    alert("you died!")
    location.reload();
}



