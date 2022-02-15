function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 255, 255); 
  
  noStroke();
  //red (top) circle
  let color1 = color(255, 0, 0, 90);
  fill(color1);
  circle(200, 150, 150, 100);
  
  //blue (left) circle
  let color2 = color(0, 0, 255, 90);
  fill(color2);
  circle(150, 225, 150, 50);

  //green (right) circle
  let color3 = color(0, 255, 0, 90)
  fill(color3);
  circle(250, 225, 150, 25);
  
}