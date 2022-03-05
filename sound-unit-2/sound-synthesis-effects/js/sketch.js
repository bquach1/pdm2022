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

const loop = new Tone.Loop((time) => {
  console.log(time);
}, osc).start(0);
Tone.Transport.start();

let noise = new Tone.Noise('pink').start();
let autoFilter = new Tone.Filter({
  frequency: "8n",
	baseFrequency: 200,
	octaves: 2
}).connect(gain);
noise.connect(autoFilter);

let freqLFO = new Tone.LFO(4,200,500).start();
freqLFO.connect(osc.frequency); 

function preload() {
  pokeball = loadImage("pokeball.jpg");
  chicken = loadImage("chicken-little.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (mouseIsPressed) {
    background('green');
    image(pokeball, 450, 0 , 500, 500);
    image(chicken, 450, 500, 500, 300);
  }
  else {
    textAlign(CENTER);
    text("Click and hold anywhere on the screen for a surprise!", windowWidth / 2, windowHeight / 2);
  }
}

function mousePressed() {
  Tone.start();
  ampEnv.triggerAttackRelease('4n');
  osc.frequency.linearRampToValueAtTime(pitch,'+1');
  ampEnv.triggerAttackRelease('4n','+1');
  ampEnv.triggerAttackRelease('4n','+2');
  synth.triggerAttackRelease('C7', '4n', '+3.1');
}