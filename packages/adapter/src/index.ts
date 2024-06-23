import RabbitMQ from "@repo/rabbitmq";
import config from "@repo/config";
import { UDPSocket } from "./services/create-socket";

const main = async () => {
  const messageQueue = RabbitMQ.getInstance();
  let server;

  try {
    await messageQueue.connect(config.RABBIT_MQ_URL);
    server = new UDPSocket(messageQueue);
    server.start(parseInt(config.UDP_PORT, 10), config.UDP_HOST);
  } catch (error) {
    if (server) {
      server.stop();
    }
    messageQueue.close();
    console.log(error);
  }
};

main();
