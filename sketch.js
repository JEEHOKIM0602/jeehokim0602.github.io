let kim;
let obstacles = [];
let volume = 0;
let score = 0;
let mic;

function setup() {
  createCanvas(windowWidth, 600);
  kim = new Kim();
  obstacles.push(new Obstacle());
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(248, 243, 212);
  let vol = mic.getLevel();
  volume = map(vol, 0, 1, 0, 100);
  if (volume > 4.5) {
    kim.up();
  }
  kim.update();
  kim.show();


  //---------Obstacle--------------
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    o.update();
    o.show();

    if (o.hits(kim)) {
      console.log("HIT");
      life--;
      if (life == 0) {
        kim.splice(i, 1);
      }
    } 
    if (o.isBig && volume > 40) {
      obstacles.splice(i, 1);
    }
  }
  if (frameCount % 200 == 0) {
    obstacles.push(new Obstacle());
  }


  //---------Volume Level--------
  fill(20, 47, 62);
  textStyle(BOLDITALIC);
  textSize(30);
  text("Volume", 10, 30);
  text(floor(volume), 125, 30);

}


class Obstacle {
  //----------Obstacle Adjustments---------------
  constructor() {
    let freq = random(15, 18);
    this.w = random(60, 120);
    this.height = freq * freq;
    this.x = width;
    this.isBig = false;
    let chance = random();
    if (chance < 0.05) {
      // big
      this.y = 0;
      this.height = height;
      this.w = 70;
      this.isBig = true;
    } else if (chance < 0.5) {
      // top
      this.y = 0;
    } else {
      // bottom
      this.y = height - this.height;
    }
    this.speed = 3;
    this.highlight = false;
  }

  
  hits(kim) {
    if (kim.y >= this.y && kim.y < this.y + this.height) {
    }
    
  }

  show() {
    //color
    fill(0, 130, 0);
    //bottom
    rect(this.x, this.y, this.w, this.height);
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



//-------About Character---------------
class Kim {

  //Character_Shape
  show() {

    //sound_detection
    let dia = map(volume, 0, 100, 20, 150);
    fill(80, 190, 220);
    circle(this.x, this.y, dia);

    //head_Shapte
    fill(0, 0, 0);
    ellipse(this.x, this.y, 25, 25);

    //body_Shapte
    line(this.x, this.y + 15, this.x, this.y + 50);
    line(this.x, this.y + 35, this.x - 20, this.y + 25);
    line(this.x, this.y + 35, this.x + 20, this.y + 25);
    line(this.x, this.y + 50, this.x - 10, this.y + 70);
    line(this.x, this.y + 50, this.x + 10, this.y + 70);
  }

//---------Movements Adjustment----------
    constructor() {
      this.x = 80;
      this.y = height / 2;
      this.gravity = 0.08;
      this.lift = 0.5;
      this.velocity = 0;
    }
  //-----Jump Range-----
  up(amount) {
    this.velocity -= (this.lift)*0.5;
  }
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    //-----Ground Limit----
    if (this.y > height - 70) {
      this.y = height - 70;
      this.velocity = 0;
    }
    //-----Sky Limit------
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }  
}
  