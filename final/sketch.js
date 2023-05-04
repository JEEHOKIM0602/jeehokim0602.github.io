let jeeho;
let obstacles = [];
let volume = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  jeeho = new Jeeho();
  obstacles.push(new Obstacle());
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(150, 230, 240);
  let vol = mic.getLevel();
  volume = map(vol, 0, 1, 0, 100);
  if (volume > 2) {
    jeeho.up();
  }
  jeeho.update();
  jeeho.show();

  //Obstacle Maker
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let o = obstacles[i];
    o.update();
    o.show();
  }

  //Obstacle distance
  if (frameCount % 200 == 0) {
    obstacles.push(new Obstacle());
  }

  // Detector
  fill(20, 47, 67);
  textStyle(BOLDITALIC);
  textSize(30);
  text("Volume", 10, 30);
  text(floor(volume), 125, 30);
}

//Obstacles
class Obstacle {
  constructor() {
    let rnd = random(20);
    this.w = random(20, 70);
    this.height = rnd * rnd;
    this.x = width;
    this.isBig = false;
    let chance = random();
    if (chance < 0.4) {
      // top
      this.y = 0;
    } else {
      // bottom
      this.y = height - this.height;
    }
    this.speed = 3;
    this.highlight = false;
  }

  // Collision Test
  show() {
    fill(0, 184, 169);
    rect(this.x, this.y, this.w, this.height);
  }
  update() {
    this.x -= this.speed;
  }
}

//Jeeho Position
class Jeeho {
  constructor() {
    this.x = 80;
    this.y = height / 2;
    this.gravity = 0.2;
    this.lift = 1.3;
    this.velocity = 0;
  }

  //Jeeho Appearance
  show() {
    let red = map(volume, 0, 100, 0, 255);
    let dia = map(volume, 0, 100, 50, 500);
    fill(0, 0, 0);
    ellipse(this.x, this.y, 30, 30);
    stroke(0);


  
    //body
    line(this.x, this.y + 15, this.x, this.y + 50);
    line(this.x, this.y + 35, this.x - 20, this.y + 25);
    line(this.x, this.y + 35, this.x + 20, this.y + 25);
    line(this.x, this.y + 50, this.x - 10, this.y + 70);
    line(this.x, this.y + 50, this.x + 10, this.y + 70);
  }

  up(amount) {
    this.velocity -= this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height - 70) {
      this.y = height - 70;
      this.velocity = 0;
    }
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}
