import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const telemetryQuerySchema = z.object({
  name: z.string().optional(),
});
export type TelemetryQuerySchema = z.infer<typeof telemetryQuerySchema>;

const telemetry = z.object({
  name: z.string(),
  position: z.array(z.number()),
  versions: z
    .object({
      firmware: z.string(),
      pcb: z.string(),
    })
    .optional(),
  config: z
    .object({
      gps: z.boolean(),
      imu: z.boolean(),
      magnetometer: z.boolean(),
    })
    .optional(),
  created_at: z.string(),
});

const telemetryResponseDTO = z.array(telemetry).optional();

export type TelemetryResponseDTO = z.infer<typeof telemetryResponseDTO>;

export const { schemas: telemetrySchemas, $ref } = buildJsonSchemas(
  {
    telemetryResponseDTO,
    telemetryQuerySchema,
  },
  { $id: "telemetrySchemas" }
);
