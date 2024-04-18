#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN         9        // Pino de reset, configurável
#define SS_PIN          10       // Pino do leitor RFID, configurável

MFRC522 mfrc522(SS_PIN, RST_PIN);  // Crie um objeto MFRC522

void setup() {
  Serial.begin(9600);
  SPI.begin();      // Inicializa a comunicação SPI
  mfrc522.PCD_Init(); // Inicializa o leitor RFID
}

void loop() {
  // Verifica se uma tag RFID está presente
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    // Leu uma tag RFID
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      Serial.print(mfrc522.uid.uidByte[i], HEX);
    }
    Serial.println();
    mfrc522.PICC_HaltA();
  }
}