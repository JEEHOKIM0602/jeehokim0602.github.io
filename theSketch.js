console.log("hello javascript!")

var y = 0;
var speed = 3;

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(200,50,150);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(width/2, y, 100, 100);
    
  y = y + speed;
  
  if (y > windowHeight-50){
    speed = -2;
  }  
}



