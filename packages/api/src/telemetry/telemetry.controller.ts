import { FastifyReply, FastifyRequest } from "fastify";
import { TelemetryQuerySchema } from "./telemetry.schema";
import { listDevices } from "./telemetry.service";

export const getDevices = async (
  request: FastifyRequest<{ Params: TelemetryQuerySchema }>,
  reply: FastifyReply
) => {
  const name = request.params.name;

  try {
    const results = await listDevices(name);
    return reply.code(200).send(results);
  } catch (error) {
    return reply.code(500).send(error);
  }

  return reply.code(200).send([
    {
      name: 123,
      position: [123, 123, 123],
      versions: { firmware: "Az&", pcb: "123" },
      config: { gps: true, imu: true, magnetometer: false },
    },
  ]);
};
