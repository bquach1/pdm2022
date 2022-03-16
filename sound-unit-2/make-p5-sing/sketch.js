let pitch = 800;

const reverb = new Tone.JCReverb(0.4).toDestination();
const tremolo = new Tone.Tremolo(1, 0.75).toDestination().start();

const synth = new Tone.MembraneSynth().chain(reverb,tremolo).toDestination();

let osc = new Tone.PulseOscillator(50, 0.2).start();
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 1,
  sustain: 0.1,
  release: 1
}).connect(pan);
osc.connect(ampEnv);

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
    ampEnv.triggerAttackRelease('4n','+1');
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