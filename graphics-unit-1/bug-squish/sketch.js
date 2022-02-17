let bugs = [];
let count = 20;
let timer = 30;
let score = 0;
let dead;

function preload() {
  bugSheet = loadImage("BugSheet.png");
  deadBug = loadImage("deadbug.png");
  empty = loadImage("disappearedBug.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  imageMode(CENTER);
  
  for (i = 0; i < count; i++) {
    bugs[i] = new Character(bugSheet, random(80, windowWidth - 80), random(80, windowHeight - 80), random([-1, 1]), 2);
  }
}

function mousePressed() {
  for (i = 0; i < count; i++) {
    bugs[i].squish();
  }
}

function draw() {
  background(255, 255, 255);

  for (i = 0; i < count; i++) {
    bugs[i].draw();
  }

  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
  }
  textAlign(LEFT);
  textSize(25);
  text("Timer: " + timer, 2, 20);
  text("Score: " + score, 2, 50);
  if (timer == 0) {
    textAlign(CENTER);
    textSize(50);
    text("Time's Up!", windowWidth / 2, windowHeight / 2 - 50);
    text("Final score is: " + score, windowWidth / 2, windowHeight / 2);
    text("Refresh to restart! ", windowWidth / 2, windowHeight / 2 + 50);
    abort();
  }
}

class Character {
  constructor(spriteSheet, x, y, move, speed) {
      this.spriteSheet = spriteSheet;
      this.sx = 0;
      this.x = x;
      this.y = y;
      this.move = 0;
      this.facing = 1;
      this.move = move;
      this.facing = move;
      this.speed = speed;
  }

  draw() {
    push();

    translate(this.x, this.y);
    scale(this.facing, 1);

    if (this.move == 0) {
      image(deadBug, 0, 0, 153, 120, 0, 0, 153, 153);
    }
    else {
      image(this.spriteSheet, 0, 0, 153, 80, 160 * (this.sx + 1), 0, 153, 153);
    }
    
    if (frameCount % 10 == 0) {
      this.sx = (this.sx + 1) % 5;
    } 
    this.x += this.speed * this.move;

    if (this.x < 30) {
      this.move = 1;
      this.facing = 1;
    }
    else if (this.x > width - 30) {
      this.move = -1;
      this.facing = -1;
    }
    pop();
  }
  go(direction) {
    this.move = direction;
    this.facing = direction;
    this.sx = 1;
  }
  stop() {
    this.move = 0;
  }
  squish() {
    if(mouseX > this.x - 45 && mouseX < this.x + 45 &&
       mouseY > this.y - 45 && mouseY < this.y + 45) {  
        this.stop(); 
        score++;  
    }
    this.speed += 0.1;
  }
} 