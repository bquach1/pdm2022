const synth = new Tone.AMSynth().toDestination();
const drum = new Tone.FMSynth().toDestination();

const phaser = new Tone.Phaser({
  frequency: 15,
  octaves:5,
  baseFrequency: 1000
}).toDestination();
synth.connect(phaser);
drum.connect(phaser);

var distortionValue = new Tone.Distortion(0).toDestination();
synth.connect(distortionValue);
drum.connect(distortionValue);

var delay = new Tone.PingPongDelay("8n", 0).toDestination();
synth.connect(delay);
drum.connect(delay);

const tremolo = new Tone.Tremolo(9, 0.75).toDestination().start();
synth.connect(tremolo);
drum.connect(tremolo);

let distSlider;
let delaySlider;
let phaserSlider;
let tremoloSlider;

let notes = {
  '1': 'C5',
  '2': 'D5',
  '3': 'E5',
  '4': 'F5',
  '5': 'G5',
  '6': 'A5',
  '7': 'B5',
  '8': 'C6'
}

let afterNotes = {
  '1': 'C4',
  '2': 'D4',
  '3': 'E4',
  '4': 'F4',
  '5': 'G4',
  '6': 'A4',
  '7': 'B4',
  '8': 'C5'
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  synth.harmonicity.value = 10;

  distSlider = createSlider(0, 1, 0, 0.1);
  distSlider.position(width / 2 + 300, height / 4);
  distSlider.mouseReleased(()=> {
    let distortion = distSlider.value();

    distortionValue.distortion.value = distortion;
    console.log(distortion);
  });

  delaySlider = createSlider(0, 1, 0, 0.1);
  delaySlider.position(width / 4, height / 4);
  delaySlider.mouseReleased(()=>{
    let delayTime = delaySlider.value();

    delay.delayTime.value = delayTime;
    console.log(delayTime);
  });

  phaserSlider = createSlider(0, 1000, 0, 50);
  phaserSlider.position(width / 4, height / 2 + 150);
  phaserSlider.mouseReleased(()=>{
    let frequency = phaserSlider.value();

    phaser.frequency.value = frequency;
    console.log(frequency);
  });

  tremoloSlider = createSlider(0, 500, 0, 1);
  tremoloSlider.position(width / 2 + 300, height / 2 + 150);
  tremoloSlider.mouseReleased(()=>{
    let frequency = tremoloSlider.value();

    tremolo.frequency.value = frequency;
    console.log(frequency);
  });
  
}

function draw() {
  background(255);

  textAlign(CENTER);
  text("Use the number keys (1-8) to play an octave of notes!", 
       width / 2, height / 2);
       
  text("This slider controls the ping pong delay.", width / 4 + 70, height / 4 - 5);
  text("This slider controls the distortion value.", width / 2 + 370, height / 4);
  text("This slider controls the phaser value.", width / 4 + 70, height / 2 + 150);
  text("This slider controls the tremolo value.", width / 2 + 370, height / 2 + 150);
}

function keyPressed() {
  let toPlay = notes[key];
  console.log(toPlay);
  let toPlayAfter = afterNotes[key];
  synth.triggerAttackRelease(toPlay, "8n", '+0.5');

  drum.triggerAttackRelease(toPlayAfter, "16n", '+.75');
}