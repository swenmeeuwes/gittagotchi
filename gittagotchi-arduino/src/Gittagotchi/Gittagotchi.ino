#include <Arduino.h>
#include <U8g2lib.h>

#include "Images.h"
#include "Secret/arduino_secrets.h"

// #ifdef U8X8_HAVE_HW_SPI
// #include <SPI.h>
// #endif
#ifdef U8X8_HAVE_HW_I2C
#include <Wire.h>
#endif

#include <SPI.h>
#include <WiFiNINA.h>

U8G2_SSD1306_128X64_NONAME_1_HW_I2C u8g2(U8G2_R0, /* reset=*/U8X8_PIN_NONE, /* clock(SCL)=*/12, /* data (SDA)=*/11);

uint8_t sprite_index = 0;

int wifi_status = WL_IDLE_STATUS;
char ssid[] = SECRET_SSID; // Secrets should be defined in Secret/arduino_secrets.h
char pass[] = SECRET_PASS;

void setup()
{
  wait_for_serial();

  wifi_check();

  connect_to_network();

  u8g2.begin();
}

void loop()
{
  // picture loop
  u8g2.firstPage();
  do
  {
    draw();
  } while (u8g2.nextPage());

  sprite_index++;
  if (sprite_index >= 14 * 8)
    sprite_index = 0;

  delay(950);
}

void draw()
{
  u8g2_prepare();

  draw_egg(sprite_index);
}

void draw_egg(int frame)
{
  switch (frame % 2)
  {
  case 0:
    u8g2.drawXBMP(0, 0, egg_idle1_width, egg_idle1_height, egg_idle1_bits);
    break;
  case 1:
    u8g2.drawXBMP(0, 0, egg_idle2_width, egg_idle2_height, egg_idle2_bits);
    break;
  }
}

void u8g2_prepare()
{
  u8g2.setFont(u8g2_font_6x10_tf);
  u8g2.setFontRefHeightExtendedText();
  u8g2.setDrawColor(1);
  u8g2.setFontPosTop();
  u8g2.setFontDirection(0);
}

void wait_for_serial()
{
  Serial.begin(9600);
  while (!Serial)
  {
    ; // wait for serial port to connect. Needed for native USB port only
  }
}

void wifi_check()
{
  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE)
  {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true)
      ;
  }

  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0")
  {
    Serial.println("Please upgrade the firmware");
  }
}

void connect_to_network()
{
  while (wifi_status != WL_CONNECTED)
  {
    Serial.print("Attempting to connect to WPA SSID.");
    // Connect to WPA/WPA2 network:
    wifi_status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }

  Serial.println("Connected to network!");

  print_ip_address();
}

void print_ip_address()
{
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}