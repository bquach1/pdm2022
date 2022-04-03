int sensorPin = A0; //input pin for potentiometer
int ledPin = 9;    // LED connected to digital pin 9
int sensorValue = 0;
int targetValue = 0;
int boundValue = 0;

void setup() {
  Serial.begin(9600); //for checking serial values
  //pinMode(ledPin, OUTPUT);
}

void loop() {
  targetValue = random(255); //analogwrite brightness value threshold

  do {
    sensorValue = analogRead(sensorPin); //read sensor pin

    boundValue = map(sensorValue, 0, 1023, 0, 255);
    //map sensorValue to brightness values
    analogWrite(ledPin, 255);
    //light up if under threshold
    //serial write for value thresholds
    Serial.print("boundValue = ");
    Serial.print(boundValue);
    Serial.print("\t targetValue = ");
    Serial.println(targetValue);
    
  } while (boundValue <= targetValue);

  delay(500);

  //turn off and show error message if you pass the threshold
  analogWrite(ledPin, 0);
  Serial.print("You passed the threshold! Reset potentiometer to 0 and give control to next player.");

  //10 second delay to reset potentiometer and switch players
  delay(10000);

}
