// DHT humidity / temperature sensor AM2302

#include "DHT.h"
#include <Process.h>


#define DHTPIN 2     // what pin we're connected to
#define DHTTYPE DHT22   // DHT22  (AM2302), DHT21 (AM2301), DHT 11

// Connect pin 1 (on the left) of the sensor to +5V
// NOTE: If using a board with 3.3V logic like an Arduino Due connect pin 1
// to 3.3V instead of 5V!
// Connect pin 2 of the sensor to whatever your DHTPIN is
// Connect pin 4 (on the right) of the sensor to GROUND
// Connect a 10K resistor from pin 2 (data) to pin 1 (power) of the sensor

// Initialize DHT sensor for normal 16mhz Arduino
DHT dht(DHTPIN, DHTTYPE);
// NOTE: For working with a faster chip, like an Arduino Due or Teensy, you
// might need to increase the threshold for cycle counts considered a 1 or 0.
// You can do this by passing a 3rd parameter for this threshold.  It's a bit
// of fiddling to find the right value, but in general the faster the CPU the
// higher the value.  The default for a 16mhz AVR is a value of 6.  For an
// Arduino Due that runs at 84mhz a value of 30 works.
// Example to initialize DHT sensor for Arduino Due:
//DHT dht(DHTPIN, DHTTYPE, 30);

void setup() {
    Bridge.begin();
    Serial.begin(9600);
    dht.begin();
}

void loop() {
    // Wait a few seconds between measurements.
    delay(10000);

    // Reading temperature or humidity takes about 250 milliseconds!
    // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
    float h = dht.readHumidity();
    // Read temperature as Celsius
    float t = dht.readTemperature();
    // Read temperature as Fahrenheit
    float f = dht.readTemperature(true);

    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t) || isnan(f)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

    // Compute heat index
    // Must send in temp in Fahrenheit!
    float hi = dht.computeHeatIndex(f, h);

    String url = "https://luminous-fire-393.firebaseio.com/humiditytemperature.json";

    Serial.println("Debug: before getTimeStamp() call");
    String time = "\"time\":\"" + getTimeStamp() + "\"";
    //String time = "\"time\":\"test\"";
    String metrics = "\"humidity\":" + String(h) + ", \"temperature\":" + String(t);

    String json = "{" + time + "," + metrics + "}";
    
    Serial.println(json);

    Process p;
    p.runShellCommand("curl -k -X POST " + url + " -d '" + json + "'");
    while(p.running());
}



//Black magic with Process
String getTimeStamp() {
  Serial.println("Within the getTimeStamp() function");
  String result;
  Process time;
  time.begin("date");
  time.addParameter("+%d/%m/%y-%T");
  time.run();
  
  while(time.available()>0) {
    char c = time.read();
    if (c != '\n')
      result += c;
  }
  return result;
}

