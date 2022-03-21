//Chords and scales creation

let synth = new Tone.PolySynth().toDestination();
let synth2 = new Tone.MembraneSynth().toDestination();

let pattern = new Tone.Pattern((time, note)=> {
  synth.triggerAttackRelease(note,0.25,time);
}, ["C4", "D4", "E4", "G4", "A4"]);

let melody = new Tone.Sequence((time, note)=> {
  if (note != null) {
    synth.triggerAttackRelease(note, '8n', time);
  }
}, ['A4', 'B4', 'C4', 'D5', 'G4']);

let chords = [
  {"time": "0:0", "note": ["C4", "E3", "G4"]},
  {"time": "0:3", "note": ["F4", "A4", "C4"]},
  {"time": "1:1", "note": ["G4", "A3", "D4"]},
  {"time": "1:2", "note": ["G4", "B4", "F4"]}
]

let chord = new Tone.Part((time, notes)=> {
  synth.triggerAttackRelease(notes.note, "2n", time);
}, chords )
chord.loop = 8;
chord.loopEnd = '2m';

const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();

const loopA = new Tone.Loop(time => {
  synthA.triggerAttackRelease("C5", "8n", time);
}, "4n").start(0);

// const loopB = new Tone.Loop(time => {
//   synthB.triggerAttackRelease("C4", "8n", time);
// }, "4n").start('8n');

Tone.Transport.bpm.value = 100;

//Other constant variables/synths/instruments.

let pitch = 200;
let time = 20;

const vol = new Tone.Volume(-500).toDestination();

const reverb = new Tone.JCReverb(0.4).toDestination();
const tremolo = new Tone.Tremolo(1, 0.75).toDestination().start();

//const synth = new Tone.MembraneSynth().chain(reverb,tremolo).toDestination();
const drawSynth = new Tone.MonoSynth().chain(vol).toDestination();

let resetOsc = new Tone.PWMOscillator(500, 50).start();
let resetGain = new Tone.Gain().toDestination();
let resetPan = new Tone.Panner().connect(resetGain);
let resetAmpEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 1,
  sustain: 0.1,
  release: 1
}).connect(resetPan);
resetOsc.connect(resetAmpEnv);

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

  //music
  Tone.start();
  melody.start('1m');
  chord.start('0:0');
  Tone.Transport.start();
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
  let pitch = slider.value();

  if (mouseIsPressed) {
    Tone.start();
    drawSynth.triggerAttackRelease('256n', time);
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
  Tone.start();
  resetAmpEnv.triggerAttackRelease('4n');
}