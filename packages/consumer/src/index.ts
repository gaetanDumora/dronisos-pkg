import RabbitMQ from "@repo/rabbitmq";
import config from "@repo/config";
import { persistMessages } from "./services/consumer";
import { prismaSingleton } from "@repo/prisma";

const main = async () => {
  const messageQueue = RabbitMQ.getInstance();
  const messageHandler = await persistMessages(prismaSingleton);

  try {
    await messageQueue.connect(config.RABBIT_MQ_URL);
    await messageQueue.consumeFromQueue(messageHandler);
  } catch (error) {
    console.log(error);
    await messageQueue.close();
  }
};

main();
