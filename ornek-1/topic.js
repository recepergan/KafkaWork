const { Kafka }  = require("kafkajs");

createTopic();

async function createTopic(){ // await kullanıyorsan fonk.asenkron olması gerekir
    try {
        //Admin Stuff ..
    const kafka = new Kafka({
        clientId: "kafka_ornek_1",
        brokers : ["172.29.192.1:9092"]  //topiclerin bulunduğu yer
    });

    const admin = kafka.admin();
    console.log("Kafka Brokera bağlanılıyor..");
    await admin.connect();
    console.log("Kafka Brokera bağlantı başarılı,Topic üretielecek");
    await admin.createTopics({
        topics : [  //Birden fazla topic üretiyoruz
            {
                topic : "Logs",
                numPartitions :1
            },
            {
                topic :"Logs2",
                numPartitions :2
            },
        ]
    });
    console.log("Topic başarılı bir şekilde oluşturulmuştur...");
    await admin.disconnect();

        
    } catch (error) {
        console.log("Bir Hata Oluştu", error);
    }finally{
        process.exit(0);
    }

}
