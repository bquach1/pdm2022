function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(0,0,0);
  
  noStroke();

  //Pac-Man image
  fill(255, 255, 0);
  arc(100, 100, 150, 150, 0, 3 * PI  / 4);
  arc(100, 100, 150, 150, 5 * PI  / 4, 2 * PI);  

  //Red ghost image
  fill(255,0,0);
  arc(300, 100, 150, 150, PI, 2 * PI);
  rect(225, 100, 150, 70);

  fill(255, 255, 255);
  arc(265, 100, 45, 45, 0, 2 * PI);
  arc(335, 100, 45, 45, 0, 2 * PI);

  fill(0, 0, 255);
  arc(265, 100, 25, 25, 0, 2 * PI);
  arc(335, 100, 25, 25, 0, 2 * PI);
}