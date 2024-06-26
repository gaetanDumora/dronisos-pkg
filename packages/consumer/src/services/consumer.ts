import { type PrismaClient } from "@prisma/client";

type Message = {
  fields: Record<string, any>;
  properties: Record<string, any>;
  content: Buffer;
};

type Telemetry = {
  name: string;
  position: Array<number>;
  versions?: { firmware: string; pcb: string };
  config?: { gps: boolean; imu: boolean; magnetometer: boolean };
};

export const persistMessages = async (db: PrismaClient) => {
  return async (message: Message) => {
    const telemetry: Telemetry = JSON.parse(message.content.toString());
    await db.devices.create({
      data: {
        name: telemetry.name,
        position: telemetry.position,
        versions: telemetry?.versions,
        config: telemetry?.config,
      },
    });
  };
};
