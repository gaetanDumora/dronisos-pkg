import RabbitMQ from "@repo/rabbitmq";
import { createSocket } from "node:dgram";

export class UDPSocket {
  private readonly socket = createSocket({ type: "udp4" });

  constructor(private readonly messageQueue: RabbitMQ) {
    this.socket.on("error", (err) => {
      console.log(`server error: ${err.stack}`);
      this.stop();
    });

    this.socket.on("message", (msg, info) => {
      this.messageQueue.publishToQueue(`${msg}`);
    });
  }
  start(port: number, address: string) {
    this.socket.bind(port, address);
    this.socket.on("listening", () => {
      const address = this.socket.address();
      console.log(`server listening on: ${address.address}:${address.port}`);
    });
  }

  stop() {
    const address = this.socket.address();
    this.socket.close(() =>
      console.log(`server stop running on: ${address.address}:${address.port}`)
    );
  }
}
