// DHT humidity / temperature sensor AM2302

#include "DHT.h"
#include <Process.h>


#define DHTPIN 2     // what pin we're connected to
#define DHTTYPE DHT22   // DHT22  (AM2302), DHT21 (AM2301), DHT 11

unsigned long epoch; // UNIX timestamp for sensor readings
int sensorPin = A0; // Input pin for the potentiometer

DHT dht(DHTPIN, DHTTYPE);

void setup() {
    Bridge.begin();
    Serial.begin(9600);
    setClock();
    dht.begin();
}

void loop() {
    // Wait a few seconds between measurements.
    delay(300000);

    float h = dht.readHumidity();
    // Read temperature as Celsius
    float t = dht.readTemperature();
    
    //Read the soil moisture as integer - dry soil = 0, humid soil = 400, sensor in water = 700+
    int moistureLevel = analogRead(sensorPin); 

    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t) || isnan(moistureLevel)) {
        Serial.println("Failed to read from sensors!");
        return;
    }


    String url = "https://luminous-fire-393.firebaseio.com/humiditytemperature.json";

    epoch = timeInEpoch();
    String time = "\"time\":\"" + String(epoch) + "000" + "\"";

    String metrics = "\"humidity\":" + String(h) + ", \"temperature\":" + String(t) + ", \"soil\":" + String(moistureLevel);

    String json = "{" + time + "," + metrics + "}";
    
    Serial.println(json);

    Process p;
    p.runShellCommand("curl -k -X POST " + url + " -d '" + json + "'");
    while(p.running());
}


// Synchronize clock using NTP
void setClock() {  
  Process p;
  
  Serial.println("Setting clock.");
  
  // Sync clock with NTP
  p.runShellCommand("ntpd -nqp 0.openwrt.pool.ntp.org");
  
  // Block until clock sync is completed - 1433666585 is unix time for 7.6.2015 08:43:05 GMT
  while(timeInEpoch() < 1433666585);
}

//Returns a UNIX timestamp 
unsigned long timeInEpoch() {
  Process time;                   
  char epochCharArray[12] = "";

  // Get UNIX timestamp
  time.begin("date");
  time.addParameter("+%s");
  time.run();
  
  // When execution is completed, store in charArray
  while (time.available() > 0) {
    time.readString().toCharArray(epochCharArray, 12);
  }
  
  // Return long with timestamp
  return atol(epochCharArray);
}

