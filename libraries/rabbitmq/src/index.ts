import { type Connection, type Channel, connect, type Message } from "amqplib";

export type MQMessage = Message;

class RabbitMQ {
  private readonly QUEUE_NAME = "task_queue";
  private static instance: RabbitMQ;
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private connected: boolean = false;

  private constructor() {}

  public static getInstance(): RabbitMQ {
    if (!RabbitMQ.instance) {
      RabbitMQ.instance = new RabbitMQ();
    }
    return RabbitMQ.instance;
  }

  public async connect(url: string): Promise<void> {
    if (!this.connected) {
      try {
        this.connection = await connect(url);
        this.channel = await this.connection.createChannel();
        this.connected = true;
        console.log("RabbitMQ connected and channel created");
      } catch (error) {
        console.error("Failed to connect to RabbitMQ", error);
        throw error;
      }
    }
  }

  public async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      console.log("Channel closed");
    }
    if (this.connection) {
      await this.connection.close();
      console.log("Connection closed");
    }
    this.channel = null;
    this.connection = null;
    this.connected = false;
  }
  public async publishToQueue(message: string): Promise<boolean> {
    if (!this.channel) {
      throw new Error("Channel not initialized");
    }
    try {
      await this.channel.assertQueue(this.QUEUE_NAME, {
        durable: false,
      });
      this.channel.sendToQueue(this.QUEUE_NAME, Buffer.from(message));
      return true;
    } catch (error) {
      console.error("Failed to publish message to queue", error);
      return false;
    }
  }

  public async consumeFromQueue(
    callback: (message: Message) => Promise<void>
  ): Promise<void> {
    try {
      if (!this?.channel) {
        throw new Error("Channel not initialized.");
      }
      await this.channel.assertQueue(this.QUEUE_NAME, {
        durable: false,
      });
      this.channel.consume(this.QUEUE_NAME, async (msg) => {
        if (msg !== null) {
          await callback(msg);
          this.channel!.ack(msg);
        }
      });
    } catch (error) {
      console.error("Failed to consume messages from queue", error);
    }
  }
}

export default RabbitMQ;
