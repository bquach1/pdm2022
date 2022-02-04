let spelunker;
let yang;
let cyan;
let ninja;

function preload() {
  spelunkerSheet = loadImage("SpelunkyGuy.png");
  yangSheet = loadImage("YangGuy.png");
  cyanSheet = loadImage("CyanGuy.png");
  ninjaSheet = loadImage("NinjaGuy.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  imageMode(CENTER);

  spelunker = new Character(spelunkerSheet, windowWidth * random(), windowHeight * random());
  yang = new Character(yangSheet, windowWidth * random(), windowHeight * random());
  cyan = new Character(cyanSheet, windowWidth * random(), windowHeight * random());
  ninja = new Character(ninjaSheet, windowWidth * random(), windowHeight * random());
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    spelunker.go(1);
    yang.go(1);
    cyan.go(1);
    ninja.go(1);
  }
  else if (keyCode == LEFT_ARROW) {
    spelunker.go(-1);
    yang.go(-1);
    cyan.go(-1);
    ninja.go(-1);
  }
}

function keyReleased() {
  spelunker.stop();
  yang.stop();
  cyan.stop();
  ninja.stop();
}

function draw() {
  background(255, 255, 255);
  spelunker.draw();
  yang.draw();
  cyan.draw();
  ninja.draw();
}

class Character {
  constructor(spriteSheet, x, y) {
    this.spriteSheet = spriteSheet;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.move = 0;
    this.facing = 1;
  }

  draw() {
    push();

    translate(this.x, this.y);
    scale(this.facing, 1);

    if (this.move == 0) {
      image(this.spriteSheet, 0, 0, 200, 200, 0, 0, 80, 80);
    }
    else {
      image(this.spriteSheet, 0, 0, 200, 200, 80 * (this.sx + 1), 0, 80, 80);
    }
    
    if (frameCount % 5 == 0) {
      this.sx = (this.sx + 1) % 8;
    } 
    this.x += 2 * this.move;
    pop();
  }
  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.sx = 3;
  }
  stop() {
    this.move = 0;
  }
}