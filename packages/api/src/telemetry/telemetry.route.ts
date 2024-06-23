import { FastifyInstance } from "fastify";
import { $ref } from "./telemetry.schema";
import { getDevices } from "./telemetry.controller";

async function telemetryRoutes(server: FastifyInstance) {
  server.get(
    "/:name?",
    {
      schema: {
        params: $ref("telemetryQuerySchema"),
        response: {
          200: $ref("telemetryResponseDTO"),
        },
      },
    },
    getDevices
  );
}

export default telemetryRoutes;
