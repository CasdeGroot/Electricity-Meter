//#include<Arduino.h>

struct DatagramStruct {
  int sensorId;
  int versionNumber;
  char* timestamp;
  long equipmentId;
  float electricityTo1; 
  float electricityTo2;
  float electricityBy1;
  float electricityBy2;
  int tarrifid; 
  float electricityPowerDeliverd;
  float electricityPowerReceived;
  char* nrPowerFailures;
  float nrOfVoltageSags; 
  float nrOfVoltageSwells;
  char* textMessage1;
  char* textMessage2;
  float current;
  float activePowerPlus;
  float activePowerMin;
  int deviceType;
  long equipmentId2;
  float gas;
};

