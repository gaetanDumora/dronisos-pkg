import Fastify from "fastify";
import config from "@repo/config";
import { telemetrySchemas } from "./telemetry/telemetry.schema";
import telemetryRoutes from "./telemetry/telemetry.route";

const fastify = Fastify();

const start = async () => {
  try {
    for (const schema of telemetrySchemas) {
      fastify.addSchema(schema);
    }
    await fastify.register(telemetryRoutes, { prefix: "api/v1/telemetry" });
    const port = parseInt(config.TCP_PORT, 10);
    const host = config.TCP_HOST;
    await fastify.listen({ port, host });
    console.log(`Fastify server running on port: ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
