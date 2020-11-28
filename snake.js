
//get Canvas and context
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//moving direction
const RIGHT = "right";
const LEFT = "left;"
const UP = "up";
const DOWN = "down"

var BLOCKED = false;

//start position food
var foodX = 240;
var foodY = 280;

//start position player
var x = [20];
var y = [20];

//start direction
var direction = RIGHT;


let game = setInterval(gameClycle,100);

document.addEventListener("keydown",changeDirection)

function gameClycle() {
   console.log("blocked: " + BLOCKED);
    collideWithFood();
    move();
    draw();
    BLOCKED = false;
}


function changeDirection(event) {
    var key = event.keyCode;
    
    if(BLOCKED) {
        return;
    }
    switch(key) {
        case 37: if(direction != RIGHT) { direction = LEFT; } break;
        case 38: if(direction != DOWN) { direction = UP; } break;
        case 39: if(direction != LEFT) {direction = RIGHT; } break;
        case 40: if(direction != UP) {direction = DOWN; } break;
    }
    BLOCKED = true;
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

    if(collisionWithTail(x[0], y[0]) || checkCollisionWithBorder()){
        die();
    }
}

function generateFoodLocation() {
    
    foodX = randomNumberInCanvas();
    foodY = randomNumberInCanvas();

    if(collisionWithTail(foodX, foodY)) {
        generateFoodLocation();
    }

    console.log("new food created at: " + foodX+ " " +  foodY)

}

function draw() {

    ctx.fillStyle="black";
    ctx.fillRect(0,0,cvs.width, cvs.height);
    drawSnake(); 
    
    ctx.fillStyle="green";
    ctx.fillRect(foodX,foodY,20,20);
    
}

function drawSnake(){
    for(var i = 0; i < x.length; i++) {
        ctx.fillStyle="red";
        ctx.fillRect(x[i],y[i], 20, 20);
    }
}


function eat() {
    x.push(x[x.length-1]);
    y.push(y[y.length-1])
    
}

function die() {
    location.reload();
}

function collisionWithTail(a,b) {
    
    for(var i = 1; i < x.length; i++) {
        if(a == x[i] && b == y[i] ) {
            return true;
        }
    }
    return false;
}

function collideWithFood() {

    if(x[0] == foodX && y[0] == foodY){
        eat();
        generateFoodLocation();
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

function randomNumberInCanvas() {
    number = Math.random() * 100;
    number = Math.round(number);
    number = number % 30;
    return number * 20;
}


