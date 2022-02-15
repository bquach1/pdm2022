function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0,0,150);

  //creating green background circle
  fill(0, 135, 0);
  strokeWeight(5);
  stroke(255,255,255);
  arc(200, 200, 200, 200, 0, 2 * PI);
  
  fill(255, 0, 0);
  strokeWeight(5);
  stroke(255,255,255);
  beginShape();
  vertex(200, 95);
  vertex(175, 170);
  vertex(100, 170);
  vertex(165, 220);
  vertex(150, 290);
  vertex(200, 255);
  vertex(250, 290);
  vertex(235, 220);
  vertex(300, 170);
  vertex(225, 170);
  vertex(200, 95);
  endShape();
}