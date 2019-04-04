#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include "./DNSServer.h"
#include <EEPROM.h>

String Datagram[20][3] = {
  { "1-3:0.2.8", "version" },
  {"0-0:96.1.1", "equipmentId", ""},
  {"1-0:1.8.1", "electricityTo1", "*kwh"},
  {"1-0:1.8.2", "electricityTo2", "*kwh"},
  {"1-0:2.8.1", "electricityBy1", "*kwh"},
  {"1-0:2.8.2", "electricityBy2", "*kwh"},
  {"0-0:96.14.0", "tariffId", ""},
  {"1-0:1.7.0", "electricityPowerDeliverd", "*kW"},
  {"1-0:2.7.0", "electricityPowerReceived", "*kW"},
  {"0-0:96.7.21", "nrOfPowerFailures", ""},
  //power failures    value: Serial.println("1-0:99.97.0(5)(0-0:96.7.19)(170727123833S)(0000001124*s)(170727112647S)(0000000323*s)(170726164024S)(0000002427*s)(170726100547S)(0000000628*s)(000101000001W)(2147483647*s)");
  {"1-0:32.32.0", "nrOfVoltageSags", ""},
  {"1-0:32.36.0", "nrOfVoltageSwells", ""},
  {"0-0:96.13.1", "textMessage1", ""},
  {"0-0:96.13.0", "textMessage2", ""},
  {"1-0:31.7.0", "current", "*A"},
  {"1-0:21.7.0", "activePowerPlus", "*kW"},
  {"1-0:22.7.0", "activePowerMin", "*kW"},
  {"0-1:24.1.0", "deviceType", ""},
  {"0-1:96.1.0", "equipmentId2", ""}
  //gas or water  value: 0-1:24.2.1(180309210000W)(03118.623*m3)
};

int redPin = 14;
int greenPin = 12;
int bluePin = 13;
int resetPin =  5;

String Data;
DynamicJsonBuffer jsonBuffer;
ESP8266WebServer server(80);
DNSServer dnsServer;
IPAddress IP(10, 10, 10, 1);
boolean wifiConnected = false;
boolean isSensorSetup = false;
boolean linking = false;
int debugIndex = 0;

//LA134-2016
//MAD2016TI
String ssid     = "";
String password = "";
String username = "";
String loginPassword = "";
const char* APssid = "slimmemeter";
const char* APpassword = "password";

// wifiClient
WiFiClient wifiClient;

// Only with some dummy values seems to work ... instead of mqttClient();
PubSubClient mqttClient("", 0, wifiClient);

const char *host = "165.227.180.251";
uint16_t port = 1234;
const char *debugTopic = "debugSensor_school";
const char *topic = "measurement_school";
String html = "<h1>werkt lekker kinker</h1>";
String html2 = "<!DOCTYPE html>\n<html>\n<body>\n<h2> WIFI</h2>\nssid: <input type=\"text\" id=\"ssid\" value=\"\"><br>\npassword: <input type=\"text\" id=\"password\" value=\"\">\n<h2>LOGIN</h2>\nusername <input type=\"text\" id=\"username\" value=\"\"><br>\npassword <input type=\"text\" id=\"loginPassword\" value=\"\">\n<p><button onclick=\"login()\">Login</button></p>\n<script>\n\u0009var ssid; \n\u0009var password; \n\u0009var username; \n\u0009var loginPassword;\n\u0009var url = \"\"; \n\u0009\n\u0009function login()\n\u0009{\n\u0009url = \"\";\n\u0009ssid = document.getElementById('ssid').value;\n\u0009password = document.getElementById('password').value;\n\u0009username = document.getElementById('username').value;\n\u0009loginPassword = document.getElementById('loginPassword').value;\n\u0009\n\u0009insertParam(\"ssid\",ssid);\n\u0009insertParam(\"password\",password);\n\u0009insertParam(\"username\",username);\n\u0009insertParam(\"loginPassword\",loginPassword);\n\u0009\n\u0009document.location.search = url;\n\u0009}\n\u0009function insertParam(key, value)\n\u0009{\n\n    key = encodeURI(key); value = encodeURI(value);\n\n    var kvp = document.location.search.substr(1).split('&');\n\u0009console.log(kvp);\n    var i=kvp.length; var x; while(i--) \n    {\n        x = kvp[i].split('=');\n\n        if (x[0]==key)\n        {\n            x[1] = value;\n            kvp[i] = x.join('=');\n            break;\n        }\n    }\n\n    if(i<0) {kvp[kvp.length] = [key,value].join('=');}\n\u0009\n    //this will reload the page, it's likely better to store this until finished\n\u0009url = url + kvp.join('&');\n\u0009console.log(url);\n}\n</script>\n</body>\n</html>";
uint userDataAddress = 42;
struct {
  uint valid = 0;
  char ssid[25] = "";
  char password[25] = "";
  char username[25] = "";
  char userPassword[25] = "";
} userStruct;

void setup() {
  delay(1000);
  Serial.begin(115200);
  ledSetup();
  // clearUser();
  Serial.println("geting user");
  if (!getUser())
  {
    Serial.println("data not valid");
    ApSetUp();
  }
  else
  {
    Serial.println("data valid");
    connectionSetUp();
  }

}

boolean getUser()
{
  EEPROM.begin(512);
  EEPROM.get(userDataAddress, userStruct);
  Serial.println("reloaded data found" + String(userStruct.valid) + ", " + String(userStruct.ssid) + ", " + String(userStruct.password) + ", " + String(userStruct.username) + ", " + String(userStruct.userPassword));
  if (userStruct.valid == 43)
  {
    ssid = userStruct.ssid;
    password = userStruct.password;
    username = userStruct.username;
    loginPassword = userStruct.userPassword;
    return true;
  }
  else
  {
    return false;
  }
}

void saveUser(String ssid, String password, String username, String userPassword)
{
  userStruct.valid = 43;
  strncpy(userStruct.ssid, ssid.c_str(), 25);
  strncpy(userStruct.password, password.c_str(), 25);
  strncpy(userStruct.username, username.c_str(), 25);
  strncpy(userStruct.userPassword, userPassword.c_str(), 25);
  EEPROM.put(userDataAddress, userStruct);
  EEPROM.commit();

  //clear struct
  userStruct.valid = 0;
  strncpy(userStruct.ssid, "", 25);
  strncpy(userStruct.password, "", 25);
  strncpy(userStruct.username, "", 25);
  strncpy(userStruct.userPassword, "", 25);
  // reload struct for check
  EEPROM.get(userDataAddress, userStruct);
  Serial.println("reloaded data found" + String(userStruct.valid) + ", " + String(userStruct.ssid) + ", " + String(userStruct.password) + ", " + String(userStruct.username) + ", " + String(userStruct.userPassword));
  if (userStruct.valid == 43)
  {
    Serial.println("data is valid");
  }
}

void clearUser()
{
  userStruct.valid = 0;
  strncpy(userStruct.ssid, "", 25);
  strncpy(userStruct.password, "", 25);
  EEPROM.put(userDataAddress, userStruct);
  EEPROM.commit();
  userStruct.valid = 0;
  strncpy(userStruct.ssid, "", 25);
  strncpy(userStruct.password, "", 25);
  strncpy(userStruct.username, "", 25);
  strncpy(userStruct.userPassword, "", 25);
  // reload struct for check
  EEPROM.get(userDataAddress, userStruct);
  Serial.println("reloaded data found" + String(userStruct.valid) + ", " + String(userStruct.ssid) + ", " + String(userStruct.password) + ", " + String(userStruct.username) + ", " + String(userStruct.userPassword));
  if (userStruct.valid == 0)
  {
    Serial.println("clear is valid");
  }
  else
  {
    Serial.println("clearfailed");
  }

}
void ledSetup()
{
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void connectionSetUp()
{
  delay(1000);
  WiFi.mode(WIFI_STA);
  delay(1000);
  int connectionIndex = 0;
  WiFi.begin(ssid.c_str(), password.c_str());
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("connecting");
    wifiConnected = true;
    if (connectionIndex > 20)
    {
      Serial.println("Connection timed out");
      setColor(255, 1, 1);
      wifiConnected = false;
      clearUser();
      break;
    }
    connectionIndex++;
  }
}

void linkSensor()
{
  if (WiFi.status() == WL_CONNECTED) {
    saveUser(ssid, password, username, loginPassword);
    Serial.println("linking sensor");
    JsonObject& sensorJson = jsonBuffer.createObject();
    sensorJson["name"] = username;
    sensorJson["password"] = loginPassword;
    sensorJson["sensorId"] = WiFi.macAddress();

    char json[sensorJson.measureLength()];
    sensorJson.printTo((char*)json, sensorJson.measureLength() + 1);
    String jsonSTR = json;
    HTTPClient http;
    http.begin("http://165.227.180.251:2500/authenticate/sensor"); //168.227.180.251:3000/authenticate/sensor
    http.addHeader("Content-Type", "application/json");
    Serial.println(jsonSTR);
    int responseCode = http.POST(jsonSTR);
    Serial.println(responseCode);
    if (responseCode > 0) { //Check the returning code
      String payload = http.getString(); //Get the request response payload
      Serial.println(payload); //Print the response payload
      String response = http.getString();
      Serial.println(response);
      linking = true;
      isSensorSetup = true;
    }
    else
    {
      delay(250);
    }
    http.end();
  }
}

void ApSetUp()
{
  setColor(255, 95, 1);
  WiFi.mode(WIFI_AP);
  delay(1000);
  Serial.println();
  Serial.print("Configuring access point...");
  WiFi.softAPConfig(IP, IP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(APssid, APpassword);
  //dnsServer.start(53, "*", IP);
  //server.on("/", handleLogin);
  server.onNotFound([]() {
    server.send(200, "text/html", html2);
  });
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  if (isSensorSetup)
  {
    ConnectedLoop();
    buttonLoop();
    debugLoop();
  }
  else
  {
    if (wifiConnected)
    {
      if (!linking)
      {
        linkSensor();
        delay(1000);
      }
    }
    else
    {
      APLoop();
    }
  }
}
void resetNow()
{
  while (true) {};
}

void buttonLoop()
{
  if (digitalRead(resetPin) == HIGH)
  {
    clearUser();
    delay(500);
    resetNow();
  }
}

void debugLoop()
{
  if (debugIndex > 500000)
  {
    mqttClient.publish(debugTopic, "running");
    setColor(0, 255, 0);
    delay(100);
    setColor(0, 0, 0);
    debugIndex = 0;
  }
  debugIndex++;
}

void APLoop()
{
  server.handleClient();
  if (ssid == "")
  {
    if (server.args() > 1)
    {
      for (int i = 0; i < server.args(); i++)
      {
        if (server.argName(i).equals("ssid"))
        {
          ssid = server.arg(i);
          password = server.arg(i + 1);
          username = server.arg(i + 2);
          loginPassword = server.arg(i + 3);
          Serial.println(ssid);
          Serial.println(password);
          Serial.println(username);
          Serial.println(loginPassword);
          server.send(200, "text/html", html);
          closeAP();
          connectionSetUp();
          break;
        }
      }
    }
  }
}



void ConnectedLoop()
{
  if (WiFi.status() == WL_CONNECTED) {
    if (!mqttClient.connected() ) {
      mqttConnect();
      delay(250);
    } else {
      mqttClient.loop();
      if (Serial.available())
      {
        char c = Serial.read();
        if (c == '/')
        {
          Data = "";
          Serial.println("datastream started");
          mqttClient.publish(debugTopic, "datastream started");
        }
        else if (c == '!')
        {
          parseAndSendData();
        }
        Data.concat(c);
      }
    }
  }
}

void parseAndSendData()
{
  Serial.println("end data received");

  jsonBuffer.clear();
  Serial.println(sizeof(Data));
  JsonObject& object = dataToLinesStr(Data);
  char json[object.measureLength()];
  object.printTo((char*)json, object.measureLength() + 1);
  //Serial.println("stillworking");
  int error = mqttClient.publish(topic, json);
  if (error != 1)
  {
    mqttClient.disconnect();
    delay(2500);
    mqttConnect();
  }
  else
  {
    Serial.println("data send");
  }
  if (sizeof(json) > 500)
  {
    setColor(10, 10, 10);
    delay(100);
    setColor(0, 0, 0);
  }
  else
  {
    mqttClient.publish(debugTopic, "json < 500");
    mqttClient.publish(debugTopic, json);
    delay(2000);
  }
}


void closeAP()
{
  server.stop();
  WiFi.softAPdisconnect();
  delay(2000);
}

void setColor(int r, int g, int b)
{
  analogWrite(redPin, r);
  analogWrite(greenPin, g);
  analogWrite(bluePin, b);
}

void mqttConnect() {

  mqttClient.setClient(wifiClient);
  mqttClient.setServer(host, port);

  if (mqttClient.connect("esp8266", username.c_str(), loginPassword.c_str())) {
    Serial.printf("%s: MQTT connected to %s:%d\n", __FUNCTION__, host, port);
    setColor(1, 255, 1);
    delay(2000);
    setColor(0, 0, 0);
  } else {
    Serial.printf("%s: MQTT connection ERROR (%s:%d)\n", __FUNCTION__, host, port);
    setColor(255, 95, 1);
    delay(250);
    setColor(0, 0, 0);
  }
}

JsonObject& dataToLinesStr(String data)
{
  int lineIndex = 0;
  int from = 0;
  String lines[100];
  for (int i = 0; i < data.length(); i++)
  {
    if (data[i] == '\n')
    {
      lines[lineIndex] = data.substring(from, i);
      lineIndex++;
      from = i;
    }
  }
  return parseLinesStr(lines, lineIndex);
}

JsonObject& parseLinesStr(String lines[], int ArraySize)
{
  JsonObject& measurement = jsonBuffer.createObject();
  measurement["sensorId"] = WiFi.macAddress();
  for (int i = 2; i < ArraySize; i++)
  {
    findKey(lines[i], measurement);
  }
  return measurement;
}

void findKey(String line, JsonObject & measurement)
{
  int index = 0;
  String  key = "";
  String rawValue = "";
  String timeStampKey = "0-0:1.0.0";

  while (line[index] != '(')
  {
    key = line.substring(0, index + 1);
    rawValue = line.substring(index, line.length() - 1);
    index++;
  }

  for (int i = 0; i < 20; i++)
  {
    if (key.indexOf(Datagram[i][0] ) > 0)
    {
      measurement[Datagram[i][1]] = findValue(rawValue, Datagram[i][2]);
    }
    else if (key.indexOf(timeStampKey) > 0)
    {
      measurement["timestamp"] = findTimeStamp(rawValue);
      break;
    }
    else if (key.indexOf("0-1:24.2.1") > 0)
    {
      parseGas(rawValue, measurement);
      break;
    }
    else if (key.indexOf("1-0:99.97.0") > 0)
    {
    //  parsePowerFailures(rawValue, measurement);
      break;
    }
  }
}

String parsePowerFailures(String rawValue, JsonObject & measurement)
{
  JsonObject& powerFailures = jsonBuffer.createObject();
  int index = 0;
  int from = 0;
  int nmbrOfFailures = 0;
  String timestamp = "";
  String timeout = "";
  //do magic parse of the powerfailures.
}


String parseGas(String rawValue, JsonObject & measurement)
{
  //(180309210000W)(03118.623*m3)
  int index = 0;
  int from = 0;
  String timestamp = "";
  String value = "";
  for (int i = 0; i < 2; i++)
  {
    while (rawValue[index] != ')')
    {
      if (rawValue[index] == '(')
      {
        from = index;
      }
      index++;
    }
    if (i == 0)
    {
      timestamp = findTimeStamp(rawValue.substring(from, index +1));
      ///String debugtimestamp = "gas timestamp: " + timestamp;
      
      measurement["gasTime"] = timestamp;
      rawValue = rawValue.substring(index+1, rawValue.length());
      index = 0;
      //add to measurmentjson with name: gasTimestamp   
    }
    else if (i == 1)
    {
      value = findValue(rawValue.substring(from, index +1), "*m3"); 
      measurement["gas"] = value;
    }
  }
}

String findTimeStamp(String rawValue)
{
  int index = 0;
  String value = "20";
  int from = 0;
  while (rawValue[index] != ')')
  {
    if (rawValue[index] == '(')
    {
      from = index + 1;
    }
    index++;
  }
  value += rawValue.substring(from, index - 1);
  return buildTimeStamp(value);
}

String buildTimeStamp(String notFormatedTime)
{
  String formatedTimeStamp = notFormatedTime.substring(0, 4);
  formatedTimeStamp += '-';
  formatedTimeStamp += notFormatedTime.substring(4, 6);
  formatedTimeStamp += '-';
  formatedTimeStamp += notFormatedTime.substring(6, 8);
  formatedTimeStamp += ' ';
  formatedTimeStamp += notFormatedTime.substring(8, 10);
  formatedTimeStamp += ':';
  formatedTimeStamp += notFormatedTime.substring(10, 12);
  formatedTimeStamp += ':';
  formatedTimeStamp += notFormatedTime.substring(12, 14);
  return formatedTimeStamp;


}

String findValue(String rawValue, String filter)
{
  int index = 0;
  String value = "";
  int from = 0;
  while (rawValue[index] != ')')
  {
    if (rawValue[index] == '(')
    {
      from = index + 1;
    }
    index++;
  }
  value = rawValue.substring(from, index - filter.length());

  return value;
}


