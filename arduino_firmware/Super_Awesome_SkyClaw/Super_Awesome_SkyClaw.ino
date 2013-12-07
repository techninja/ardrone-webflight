#include <Adafruit_NeoPixel.h>

#define PIN 0

Adafruit_NeoPixel strip = Adafruit_NeoPixel(32, PIN, NEO_GRB + NEO_KHZ800);

#define BackgroundOff 0
#define BackgroundHand 1
#define BackgroundClaw 2
#define BackgroundEStop 3

int command = 0;
int mode = BackgroundOff;

void setup() {
  Serial.begin(9600);
  while(!Serial) { delay(1); }
  
  while (Serial.available() <= 0) {
    Serial.println("waiting");   // send an initial string
    delay(300);
  }
  
  strip.begin();
  
  neutral();
  
  strip.show(); // Initialize all pixels to 'off'
}

void neutral() {
  if (mode == BackgroundOff) {
    strip.setBrightness(5);
      for (uint16_t i = 0; i < strip.numPixels(); i++) {
        strip.setPixelColor(i, strip.Color(0, 0, 0));
      }
  } else if (mode == BackgroundHand) {
    strip.setBrightness(5);
    for (uint16_t i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, strip.Color(0, 0, 64));
    }
  } else if (mode == BackgroundClaw) {
      strip.setBrightness(10);
      for (uint16_t i = 0; i < strip.numPixels(); i++) {
        strip.setPixelColor(i, strip.Color(48, 24, 0));
      }
  } else if (mode == BackgroundEStop) {
      strip.setBrightness(20);
      for (uint16_t i = 0; i < strip.numPixels(); i++) {
        strip.setPixelColor(i, strip.Color(255, 0, 0));
      }
  }
}

void loop() {
  if (Serial.available() > 0) {
    command = Serial.read();
    if (command == 119) { // w - forward
      Serial.print('w');
      neutral();
      strip.setPixelColor(15, strip.Color(0, 255, 0));
      strip.setPixelColor(0, strip.Color(0, 255, 0));
      strip.setPixelColor(1, strip.Color(0, 255, 0));
    } else if (command == 115) { // s - back
      Serial.print('s');
      neutral();
      strip.setPixelColor(7, strip.Color(0, 255, 0));
      strip.setPixelColor(8, strip.Color(0, 255, 0));
      strip.setPixelColor(9, strip.Color(0, 255, 0));
    } else if (command == 97) { // a - left
      Serial.print('a');
      neutral();
      strip.setPixelColor(3, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 255, 0));
      strip.setPixelColor(5, strip.Color(0, 255, 0));
    } else if (command == 100) { // d - right
      Serial.print('d');
      neutral();
      strip.setPixelColor(11, strip.Color(0, 255, 0));
      strip.setPixelColor(12, strip.Color(0, 255, 0));
      strip.setPixelColor(13, strip.Color(0, 255, 0));
    } else if (command == 117) { // up
      Serial.print('u');
      neutral();
      strip.setPixelColor(0, strip.Color(0, 255, 0));
      strip.setPixelColor(4, strip.Color(0, 255, 0));
      strip.setPixelColor(8, strip.Color(0, 255, 0));
      strip.setPixelColor(12, strip.Color(0, 255, 0));
    } else if (command == 108) { // l - down
      Serial.print('l');
      neutral();
      strip.setPixelColor(0, strip.Color(128, 0, 255));
      strip.setPixelColor(4, strip.Color(128, 0, 255));
      strip.setPixelColor(8, strip.Color(128, 0, 255));
      strip.setPixelColor(12, strip.Color(128, 0, 255));
    } else if (command == 113) { // q - rotate left
      Serial.print('q');
      neutral();
      strip.setPixelColor(1, strip.Color(0, 255, 0));
      strip.setPixelColor(2, strip.Color(0, 255, 0));
      strip.setPixelColor(3, strip.Color(0, 255, 0));
    } else if (command == 101) { // e - rotate right
      Serial.print('e');
      neutral();
      strip.setPixelColor(13, strip.Color(0, 255, 0));
      strip.setPixelColor(14, strip.Color(0, 255, 0));
      strip.setPixelColor(15, strip.Color(0, 255, 0));
    } else if (command == 104) { // h - Hand Detected
      Serial.print('h');
      mode = BackgroundHand;
      neutral();
    } else if (command == 111) { // o - Off
      Serial.print('o');
      mode = BackgroundOff;
      neutral();
    } else if (command == 122) { // z - EStop
      Serial.print('z');
      mode = BackgroundEStop;
      neutral();
    } else if (command == 99) { // c - Claw
      Serial.print('c');
      mode = BackgroundClaw;
      neutral();
    }
    else {
      Serial.print(command);
      Serial.println("What?");
    }
    strip.show();
  }
}
