let kim;
let obstacles = [];
let coins = [];
let volume = 0;
let life = 100;
let score = 0;
let mic;
let img;

function preload(){
  img=loadImage('me.jpg');
}

function setup() {
  createCanvas(1000, 600);
  kim = new Kim();
  mic = new p5.AudioIn();
  mic.start();
  obstacles.push(new Obstacle());
  coins.push(new Coin());
}


function draw() {
  background(200, 240, 255);

  // Ground
  fill(100,200,75);
  rect(0, 550, width, 100);

  // Mic Input = Character Jump
  let vol = mic.getLevel();
  volume = map(vol, 0, 1, 0, 100);
  if (volume > 4) {
    kim.up();
  }
  kim.update();
  kim.show();

  //Coin Generator
  for (let i = coins.length - 1; i >= 0; i--) {
    let o2 = coins[i];
    o2.show();
    o2.update();

  // Coin Collision = Score
    if (o2.hits(kim)) {
      console.log("points");
      ++score;
      coins.splice(i, 1);
    }
    
  }
  // Coin Distance
  if (frameCount % 200 == 0) {
    coins.push(new Coin());
  }

  // Obstacle Generator
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    o.update();
    o.show();
  
  // Obstacle Collision = HP decrease
    if (o.hits(kim)) {
      console.log("HIT");
      life--;
    
    // Dying Message
      if (life == 0) {
        fill(20, 47, 67);
        textStyle(BOLDITALIC);
        textSize(60);
        text("GAME", 400, 250);
        text("OVER", 400, 300);
        textSize(40);
        text("Score:", 400, 400);
        text(score, 530, 400);
        kim.splice(i, 1);
      }
    
    // Collision Effect
      if (this.highlight) {
        fill(255, 0, 0);
      }
    }
    // If volume is above 25 Big Wall disappear
    if (o.isBig && volume > 25) {
      obstacles.splice(i, 1);
    }
    if (o.offscreen()) {
      obstacles.splice(i, 1);
    }
  }
  // Obstacle Distance
  if (frameCount % 130 == 0) {
    obstacles.push(new Obstacle());
  }

  // Score Board
  fill(20, 47, 67);
  textStyle(BOLDITALIC);
  textSize(30);

  text("Volume", 10, 30);
  text(floor(volume), 125, 30);

  text("Score", 10, 70);
  text(score, 105, 70);

  text("HP", 10, 110);
  text(life, 70, 110);
}

//coin or score
class Coin {
  constructor() {
    let rnd = random(10);
    this.x = width;
    this.w = random(100, 350);
    this.speed = 2.5;
    this.highlight = false;
    this.height = rnd * rnd; 
  }

  // Coin Collision
  hits(kim) {
    if (kim.y > this.w && kim.y < this.w + this.height) {
      if (kim.x > this.x) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  show() {
    // Coin Design
    fill(255, 215, 0);
    noStroke();
    circle(this.x, this.w, random(40,55));
    fill(126, 55, 12);
    square(this.x - 13, this.w - 13, 25, 5);
  }
  
  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}





//Obstacle Setting
class Obstacle {
  constructor() {
    let rnd = random(10, 15);
    this.w = random(50, 90);
    this.height = rnd * rnd; //제곱
    this.x = width;
    this.isBig = false;
    let chance = random();
    if (chance < 0.01) {
      // big
      this.y = 0;
      this.w = 180;
      this.height = height;      
      this.isBig = true;

    } else if (chance < 0.5) {
      // top
      this.y = 1;
    } else {
      // bottom
      this.y = height - this.height;
    }
    // Obstacle Speed Ajustment
    this.speed = 3;
    this.highlight = false;
  }

  show(){
    // Normal Color
    fill(0, 184, 169);
    // Collision Color
    if (this.highlight) {
      fill(255, 0, 0);
    } // Obstacle Appearnce
    rect(this.x, this.y, this.w, this.height);
  }

  // Obstacle Collision
  hits(kim) {
    if (kim.y >= this.y && kim.y < this.y + this.height) {
      if (kim.x > this.x) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}


class Kim {
  // Character Movement Adjustment
  constructor() {
    this.x = 80;
    this.y = height / 2;
    this.gravity = 0.2;
    this.lift = 1.3;
    this.velocity = 0;
  }

  //Kim Appearance
  show() {
    let red = map(volume, 0, 100, 0, 255);
    let dia = map(volume, 0, 100, 50, 500);
    // Head
    image(img, this.x-15, this.y-10, dia, dia, 50, 50);
    noStroke

    //body
    stroke(0,0,0);
    strokeWeight(10);
    line(this.x, this.y + 35, this.x, this.y + 50);
    line(this.x, this.y + 35, this.x - 20, this.y + 25);
    line(this.x, this.y + 35, this.x + 20, this.y + 25);
    line(this.x, this.y + 50, this.x - 10, this.y + 70);
    line(this.x, this.y + 50, this.x + 10, this.y + 70);
  }

  
  up(amount) {
    this.velocity -= this.lift;

  }

  //
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height - 120) {
      this.y = height - 120;
      this.velocity = 0;
    }
    if (this.y < 30) {
      this.y = 30;
      this.velocity = 0;
    }
  }
}


