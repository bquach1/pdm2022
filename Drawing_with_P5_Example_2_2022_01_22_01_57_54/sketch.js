function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('white'); 
  
  blendMode(LIGHTEST);
  strokeWeight(30);
  circle(200, 150, 100);
  circle(150, 200, 100);
  circle(250, 200, 100);
}