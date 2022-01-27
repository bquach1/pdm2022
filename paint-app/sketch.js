function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255,255,255);
}

function draw() {
  background(220);

  let rectSize = 30;

  noStroke();
  fill(255, 0, 0);
  rect(0,0,rectSize);

  fill("orange");
  rect(0,30,rectSize);

  fill("yellow");
  rect(0,60,rectSize);

  fill(0, 255, 0);
  rect(0,90,rectSize);

  fill("cyan");
  rect(0,120,rectSize);

  fill(0,0,255);
  rect(0,150,rectSize);

  fill("magenta");
  rect(0,180,rectSize);

  fill(112, 66, 20);
  rect(0,210,rectSize);
  
  fill(255, 255, 255);
  rect(0,240,rectSize);

  fill(0, 0, 0);
  rect(0,270,rectSize);

  stroke(0);
  strokeWeight(5);
  line(pmouseX, pmouseY, mouseX, mouseY);
}