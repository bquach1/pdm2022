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

  fill("green");
  rect(0,90,30);

  stroke(0);
  strokeWeight(5);
  line(pmouseX, pmouseY, mouseX, mouseY);
}