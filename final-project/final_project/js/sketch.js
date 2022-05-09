let serialPDM; // Variable to hold instance of serialport library
let portName = "/dev/tty.usbmodem14201"; // Fill in your serial port name here
// /dev/cu.usbmodem14701
let sensors;

let robot;

let gameState = 1;
let timer = 15;
let score = 0;
let highScore = 0;
let currentNumber = 0;
let previousNumber = 0;

//Chords and scales creation

let synth = new Tone.PolySynth().toDestination();
let synth2 = new Tone.PolySynth().toDestination();

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
  synth.triggerAttackRelease(notes.note, "8n", time);
}, chords )
chord.loop = 8;
chord.loopEnd = '2m';

const synthA = new Tone.PolySynth().toDestination();
const loopA = new Tone.Loop(time => {
  synthA.triggerAttackRelease("G3", "8n", time);
}, '4n');

Tone.Transport.bpm.value = 100;

//Other constant variables/synths/instruments.

let pitch = 200;
let time = 20;

const vol = new Tone.Volume(-500).toDestination();

const reverb = new Tone.JCReverb(0.4).toDestination();
const tremolo = new Tone.Tremolo(1, 0.75).toDestination().start();

//const synth = new Tone.MembraneSynth().chain(reverb,tremolo).toDestination();

let resetOsc = new Tone.PWMOscillator(300, 50).start();
let resetGain = new Tone.Gain().toDestination();
let resetPan = new Tone.Panner().connect(resetGain);
let resetAmpEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 1,
  sustain: 0.01,
  release: 1
}).connect(resetPan);
resetOsc.connect(resetAmpEnv);

let successOsc = new Tone.PulseOscillator(600, 0.1).start();
let successGain = new Tone.Gain().toDestination();
let successPan = new Tone.Panner().connect(successGain);
let successAmpEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 1,
  sustain: 0.01,
  release: 1
}).connect(successPan);
successOsc.connect(successAmpEnv);

function preload() {
  robotSheet = loadImage("media/robot.png");
}

function setup() {
  serialPDM = new PDMSerial("/dev/tty.usbmodem14201");

  sensors = serialPDM.sensorData;

  robot = new Character(robotSheet, windowWidth / 2 - 50, windowHeight / 2);
  currentNumber = round(random(1,99));

  serialPDM.transmit("led", 0);
  serialPDM.transmit("led2", 0);

  if (gameState == 1) {
    createCanvas(windowWidth, windowHeight);

    Tone.start(); 
    Tone.Transport.start();
    chord.start('0:0');    

    difficultySlider = createSlider(1, 30, 15, 1);
    difficultySlider.position(0, windowHeight - 20);
    difficultySlider.style('width', '100px');
    difficultySlider.hide();
  
    timer = int(sensors.a0);
    console.log(sensors.a0);

    // difficultySlider.mouseReleased(()=>{
    //   timer = difficultySlider.value();
    //   pitch = difficultySlider.value();
    // });

    startButton = createButton('Start');
    startButton.position(windowWidth / 2 - 100, windowHeight / 2 - 20);
    startButton.mousePressed(start);

    restartButton = createButton('Restart');
    restartButton.position(windowWidth / 2 - 100, windowHeight / 2 + 20);
    restartButton.mousePressed(restart);
    restartButton.hide();
    
  }
  
}

function draw() {
  
  if (gameState == 1) {
    background(255, 200, 200);
    timer = int(sensors.a0 / 33.333333333333);

    Tone.start();
  }
  else if (gameState == 2) { 
    background(200, 255, 200);

    robot.draw();
    
    // Tone.Transport.pause();

    if (frameCount % 60 == 0 && timer > 0) {    
      timer--;
    }
    
    stroke(255, 0, 0);
    line(120, 13, 120 + (timer * 20), 13);

    noStroke();
    textAlign(LEFT);
    textSize(25);
    text("Timer: " + timer, 2, 20);
    text("Score: " + score, 2, 50);
    text("Current Number: " + currentNumber, windowWidth / 2 - 125, 100);

    if (timer == 0) {      
      gameState = 3;
    }
    
    // console.log(sensors.p7);
    // console.log(sensors.a0);
    // console.log(sensors.pressure);
    // console.log(sensors.pressure2);


  }

  else if (gameState == 3) {
    background(200, 200, 255);
    textAlign(CENTER);

    Tone.Transport.start();
    if(score > highScore){
      highScore = score;
    }

    text("Time's Up!", windowWidth / 2, windowHeight / 2 - 50);
    text("Final score is: " + score, windowWidth / 2, windowHeight / 2);
    text("High Score is: " + highScore, windowWidth / 2, windowHeight / 2 + 200);
    loopA.stop();

    melody.start("1m");

    restartButton.show();
  }

}

function start() {

  gameState = 2;
  
  Tone.Transport.start();

  if ((timer > 25) && (timer <= 30)) {
    loopA.set({
      interval: "1n"
    })
  }
  else if ((timer > 20) && (timer <= 25)) {
    loopA.set({
      interval: "2n"
    })
  }
  else if ((timer > 15) && (timer <= 20)) {
    loopA.set({
      interval: "4n"
    })
  }
  else if ((timer > 10) && (timer <= 15)) {
    loopA.set({
      interval: "8n"
    })
  }
  else if ((timer > 5) && (timer <= 10)) {
    loopA.set({
      interval: "16n"
    })
  }
  else {
    loopA.set({
      interval: "32n"
    })
  }

  loopA.start('0');

  startButton.hide();
  difficultySlider.hide();

}

function restart() {

  serialPDM.transmit("led", 0);
  serialPDM.transmit("led2", 0);
  gameState = 1;  
  Tone.Transport.start();
  Tone.start();
  chord.start('0:0');
  score = 0;
  restartButton.hide();
  startButton.show();
  // difficultySlider.show();

}

function keyPressed() {
  if (gameState == 2) {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW){
      serialPDM.transmit("led", 0);
      serialPDM.transmit("led2", 0);
      previousNumber = currentNumber; //store the previous roll just before we re-roll the die.
      //re-roll the die
      currentNumber = round(random(1,99));
      console.log(previousNumber, currentNumber);
    } else {
      
    }
    
    
    if (keyCode === UP_ARROW){
      if (currentNumber >= previousNumber){
        score += 1;
        robot.cheer();
        setTimeout(() => { robot.reset(); }, 500);
        successAmpEnv.triggerAttackRelease('4n');
        serialPDM.transmit("led", 1);
      } 
      else {   
        score = 0;
        robot.frown();
        setTimeout(() => { robot.reset(); }, 500);
        Tone.start();
        resetAmpEnv.triggerAttackRelease('4n');
        serialPDM.transmit("led2", 1);
      }
    }
    else if (keyCode === DOWN_ARROW){
      if (currentNumber <= previousNumber){     
        score += 1;
        robot.cheer();
        setTimeout(() => { robot.reset(); }, 500);
        successAmpEnv.triggerAttackRelease('4n');
        serialPDM.transmit("led", 1);
      } 
      else {
        score = 0;
        robot.frown();
        setTimeout(() => { robot.reset(); }, 500);
        Tone.start();
        resetAmpEnv.triggerAttackRelease('4n');
        serialPDM.transmit("led2", 1);
      }
    }

  }
  else {
    //do nothing
  }
  
  }

  class Character {
    constructor(spriteSheet, x, y) {
      this.spriteSheet = spriteSheet;
      this.sx = 4;
      this.sy = 8;
      this.x = x;
      this.y = y;
      this.move = 0;
      this.facing = 1;
    }
  
    draw() {
      push();
  
      translate(this.x, this.y);
      scale(this.facing, 1);
        
      image(this.spriteSheet, 0, 0, 80, 80, 80 * (this.sx), 80 * (this.sy), 80, 80);

      pop();
    }

    cheer() {
      this.sx = 2;
      this.sy = 3;
    }

    frown() {
      this.sx = 2;
      this.sy = 2;
    }

    reset() {
      this.sx = 4;
      this.sy = 8;
    }
  }