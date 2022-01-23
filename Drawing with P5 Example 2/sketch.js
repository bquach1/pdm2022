function setup() {
  createCanvas(400, 400);
}

function draw() {
  background('white'); 
  
  noStroke();
  //red (top) circle
  let color1 = color(255, 0, 0, 90)
  fill(color1);
  circle(200, 150, 150, 100);
  let value = alpha(color1);
  fill(value);

  
  //blue (left) circle
  fill(0,0,255, 90);
  circle(150, 225, 150, 50);

  //green (right) circle
  fill(0,255,0, 90);
  circle(250, 225, 150, 25);
  
}