function setup() {
  createCanvas(windowWidth,windowHeight);
  background(255,255,255);
}

function draw() {
  background(220);

  noStroke();
  fill(255, 0, 0);
  rect(0,0,30);

  fill("orange");
  rect(0,30,30);

  fill("yellow");
  rect(0,60,30);

  fill(0, 255, 0);
  rect(0,90,30);

  fill("cyan");
  rect(0,120,30);

  fill(0,0,255);
  rect(0,150,30);

  fill("magenta");
  rect(0,180,30);

  fill(112, 66, 20);
  rect(0,210,30);
  
  fill(255, 255, 255);
  rect(0,240,30);

  fill(0, 0, 0);
  rect(0,270,30);

  stroke(0);
  strokeWeight(5);
  line(pmouseX, pmouseY, mouseX, mouseY);
}