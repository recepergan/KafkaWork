const { Kafka } = require("kafkajs");

// node consumer.js Logs || Logs2
const topic_name = process.argv[2] || "Logs2";

createConsumer();

async function createConsumer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_ornek_1",
      brokers: ["172.29.192.1:9092"]
    });

    const consumer = kafka.consumer({
      groupId: "ornek_1_cg_1"
    });

    console.log("Consumer'a bağlanılıyor..");
    await consumer.connect();
    console.log("Bağlantı başarılı.");

    // Consumer Subscribe
    await consumer.subscribe({
      topic: "Logs",
      fromBeginning: true  //Başlangıçtan başla
    });

    await consumer.run({  //Okuma işlemine başla
      eachMessage: async result => {  
        console.log(
          `Gelen Mesaj ${result.message.value}, Par => ${result.partition}`
        );
      }
    });
  } catch (error) {
    console.log("Bir Hata Oluştu", error);
  }
}