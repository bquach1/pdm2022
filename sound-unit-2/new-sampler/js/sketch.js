const sounds = new Tone.Players({
  chicken: "media/chicken.mp3",
  dogSqueak: "media/dog-squeak.mp3",
  flute: "media/flute.mp3",
  parrotCall: "media/parrot-call.mp3"
})

var delay = new Tone.FeedbackDelay("8n", 0.5);
var gain = new Tone.Gain().toDestination();
// notice that we connect the sound player source to the delay _after_ it was created.
sounds.connect(delay);
delay.connect(gain);
sounds.connect(gain); // to have the direct sound as well as the delayed sound. Could also adjust the delay dry/wet parameter

sounds.toDestination();

// UI elements
let button1;
let button2;
let button3;
let button4;

let slider1;

function setup() {
  createCanvas(400, 400);

  button1 = createButton("Chicken", 'chicken');
  button1.position(100, 300);
  button1.mousePressed(buttonSound);
  
  button2 = createButton("Dog Squeak");
  button2.position(100, 340);
  button2.mousePressed( () => buttonSound('dogSqueak') );

  button3 = createButton("Flute");
  button3.position(200, 300);
  button3.mousePressed( () => buttonSound('flute') );

  button4 = createButton("Parrot Call");
  button4.position(200, 340);
  button4.mousePressed( () => buttonSound('parrotCall') );

  slider1 = createSlider(0,1,0,0.1);

  slider1.mouseReleased(()=>{
    let delayTime = slider1.value();

    delay.delayTime.value = delayTime; // set the delay time immediately
  });
}

function draw() {
  background(220);
  text("Delay Slider", 0, 395);
}

function buttonSound(sound='dogSqueak') {
  sounds.player(sound).start();
}

function buttonSound(sound='chicken') {
  sounds.player(sound).start();
}