
int i = 0;
String Data;
void setup() {

   Serial.begin(115200);
  // put your setup code here, to run once:
  //SerialMeter.begin(115200);
 

}

void loop() {

  if(Serial.available())
  {
    char c = Serial.read();

    
    if(c == '/')
    {
      Data = "";
      Serial.println("datastream started");
    }
    
    if(c == '!')
    {
      Serial.println("data received");
      Serial.print(Data);
     
    } 
    Data.concat(c);
    

  }

  
}
