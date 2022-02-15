function setup() {
  createCanvas(displayWidth, displayHeight);
  brushColor = (0, 0, 0);
  strokeWeight(5);
  background(255, 255, 255);

  //reset button
  button = createButton('Reset');
  button.position(windowWidth - 55, 0);
  button.mousePressed(reset);

  //stroke size slider
  slider = createSlider(1, 10, 5, 1);
  slider.position(0, windowHeight - 20);
  slider.style('width', '100px');
}

function draw() {
  //color palette
  noStroke();
  fill(255, 0, 0);
  rect(0, 0, 30);
  fill(255, 165, 0);
  rect(0, 31, 30);
  fill(255, 255, 0);
  rect(0, 62, 30);
  fill(0, 255, 0);
  rect(0, 93, 30)
  fill(0, 255, 255);
  rect(0, 124, 30);
  fill(0, 0, 255);
  rect(0, 155, 30);
  fill(255, 0, 255);
  rect(0, 186, 30);
  fill(112, 66, 20)
  rect(0, 217, 30);
  fill(255, 255, 255)
  rect(0, 248, 30);
  fill(0, 0, 0);
  rect(0, 279, 30);

  let strokeSize = slider.value();

  if (mouseIsPressed) {
    if (mouseX <= 30) {
      if (mouseY < 31) {
        brushColor = color(255, 0, 0);
      } else if (mouseY < 62) {
        brushColor = color(255, 165, 0);
      } else if (mouseY < 93) {
        brushColor = color(255, 255, 0);
      } else if (mouseY < 124) {
        brushColor = color(0, 255, 0);
      } else if (mouseY < 155) {
        brushColor = color(0, 255, 255);
      } else if (mouseY < 186) {
        brushColor = color(0, 0, 255);
      } else if (mouseY < 217) {
        brushColor = color(255, 0, 255);
      } else if (mouseY < 248) {
        brushColor = color(112, 66, 20);
      } else if (mouseY < 279) {
        brushColor = color(255, 255, 255);
      } else if (mouseY < 310) {
        brushColor = color(0, 0, 0);
      }
    }
    stroke(brushColor);
    strokeWeight(strokeSize);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function reset() {
  background(255, 255, 255);
}