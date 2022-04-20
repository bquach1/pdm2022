let serialPDM; // Variable to hold instance of serialport library
let portName = "/dev/tty.usbmodem14201"; // Fill in your serial port name here
///dev/cu.usbmodem14701
let sensors;

// In this example we are receiving:
// .a0  // the analogRead value of pin a0 0-1023
// .float0  // the analogRead value of a0 divided by 1023 giving us a normalized range of 0.0-1.0
// .pressure  // the analogRead value of pin a1 (probably with a pressure sensor attached)
// p7  // the digitalRead state of pin 7

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
  serialPDM = new PDMSerial("/dev/tty.usbmodem14201");

  // Alias for the sensor Data . You can also just use serialPDM.sensorData...
  sensors = serialPDM.sensorData;

  createCanvas(displayWidth, displayHeight);
  brushColor = (0, 0, 0);
  strokeWeight(5);
  background(255, 255, 255);

  //reset button
  button = createButton('Reset');
  button.position(windowWidth - 55, 0);
  //button.mousePressed(reset);

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

  let strokeSize = sensors.a0 / 50;
  let pitch = slider.value();
  
  console.log(sensors.p7);
  // console.log(sensors.a0);
  // console.log(sensors.pressure);
  // console.log(sensors.pressure2);
  
  if (sensors.a0 >= 0) {
    Tone.start();
    //drawSynth.triggerAttackRelease('256n');
    if (sensors.a0 > 0) {
      if (sensors.a0 < 100) {
        brushColor = color(255, 0, 0);
      } else if (sensors.a0 < 200) {
        brushColor = color(255, 165, 0);
      } else if (sensors.a0 < 300) {
        brushColor = color(255, 255, 0);
      } else if (sensors.a0 < 400) {
        brushColor = color(0, 255, 0);
      } else if (sensors.a0 < 500) {
        brushColor = color(0, 255, 255);
      } else if (sensors.a0 < 600) {
        brushColor = color(0, 0, 255);
      } else if (sensors.a0 < 700) {
        brushColor = color(255, 0, 255);
      } else if (sensors.a0 < 800) {
        brushColor = color(112, 66, 20);
      } else if (sensors.a0 < 900) {
        brushColor = color(255, 255, 255);
      } else if (sensors.a0 < 1000) {
        brushColor = color(0, 0, 0);
      }
    }
    stroke(brushColor);
    strokeWeight(strokeSize);
    line(sensors.pressure, sensors.pressure2, sensors.pressure, sensors.pressure2);

  }
  if (sensors.a0 > 1000) {
    reset();
  }
}

function keyPressed() {
  serialPDM.transmit("led", 1);
  serialPDM.transmit(sensors.p12, 1);
  
}

function mousePressed() {
  serialPDM.transmit("led", 1);
}

function mouseReleased() {
  serialPDM.transmit("led", 0);
}

function keyReleased() {
  serialPDM.transmit("led", 0);
}

// function mouseDragged() {
//   let fade = Math.floor(map(mouseY, 0, height, 0, 255, true));

//   serialPDM.transmit("fade", fade);

//   // prevent default
//   return false;
// }

function reset() {
  background(255, 255, 255);
  Tone.start();
  resetAmpEnv.triggerAttackRelease('4n');
}