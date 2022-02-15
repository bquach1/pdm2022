let spelunker = [];
let count = 10;
let timer = 30;
let score = 0;

function preload() {
  spelunkerSheet = loadImage("SpelunkyGuy.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  imageMode(CENTER);
  
  for (i = 0; i < count; i++) {
    spelunker[i] = new Character(spelunkerSheet, random(80, windowWidth - 80), random(80, windowHeight - 80));
  }
}


function keyReleased() {
}

function draw() {
  background(255, 255, 255);

  for (i = 0; i < count; i++) {
    spelunker[i].draw();
  }

  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  textAlign(LEFT);
  textSize(25);
  text("Timer: " + timer, 2, 20);
  if (timer == 0) {
    textAlign(CENTER);
    textSize(50);
    text("Time's Up!", windowWidth / 2, windowHeight / 2);
    abort();
  }

  for (i = 0; i < count; i++) {
      spelunker[i].go(1);
  }
  for (i = 0; i < count; i++) {
      spelunker[i].go(-1);
  }
  
}

//for (i = 0; i < count; i++) {
//  spelunker[i].stop();
//}

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
      image(this.spriteSheet, 0, 0, 80, 80, 0, 0, 80, 80);
    }
    else {
      image(this.spriteSheet, 0, 0, 80, 80, 80 * (this.sx + 1), 0, 80, 80);
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