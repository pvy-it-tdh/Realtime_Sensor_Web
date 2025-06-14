#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <Arduino.h>
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const char *ssid = "Vành Thỏ";
const char *password = "Thanh0908";
const char *serverUrl = "http://192.168.111.204:3000/api/sensor";

// Khai báo handle cho task
TaskHandle_t SensorTaskHandle;

void sendSensorData(void *parameter)
{
  while (1)
  {
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (WiFi.status() == WL_CONNECTED)
    {
      HTTPClient http;
      http.begin(serverUrl);
      http.addHeader("Content-Type", "application/json");

      String json = "{\"temperature\": " + String(temperature) +
                    ", \"humidity\": " + String(humidity) + "}";
      Serial.println("Sending data: " + json);

      int httpCode = http.POST(json); // Gửi HTTP POST request

      if (httpCode > 0)
      {
        String response = http.getString(); // Nhận phản hồi từ server
        Serial.print("Server response: ");
        Serial.println(response); // In ra phản hồi của server
      }
      else
      {
        Serial.print("loi server: ");
        Serial.println(httpCode); // In ra mã lỗi nếu có sự cố
      }

      http.end(); // Kết thúc HTTP request
    }

    vTaskDelay(300000 / portTICK_PERIOD_MS); // Delay 5 phút (300.000 ms)
  }
}

void setup()
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("Dang ket noi WiFi...");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nDa ket noi WiFi!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());

  dht.begin();

  // Tạo task gửi dữ liệu
  xTaskCreatePinnedToCore(
      sendSensorData,    // Hàm task
      "Sensor Task",     // Tên task
      4096,              // Stack size (bytes)
      NULL,              // Tham số truyền vào task
      1,                 // Mức ưu tiên
      &SensorTaskHandle, // Handle task
      1                  // Chạy trên core 1
  );
}

void loop()
{
  // loop() trống vì FreeRTOS đang xử lý rồi
}
