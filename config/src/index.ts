import dotenv from "dotenv";
import { resolve } from "path";

const path = resolve(__dirname, "../../.env");
dotenv.config({ path });
type ENV = {
  TCP_PORT: string | undefined;
  UDP_PORT: string | undefined;
  UDP_HOST: string | undefined;
  TCP_HOST: string | undefined;
  RABBIT_MQ_URL: string | undefined;
  RABBIT_MQ_PORT: string | undefined;
  RABBIT_MQ_UI_PORT: string | undefined;
};

type Config = {
  TCP_PORT: string;
  UDP_PORT: string;
  UDP_HOST: string;
  TCP_HOST: string;
  RABBIT_MQ_URL: string;
  RABBIT_MQ_PORT: string;
  RABBIT_MQ_UI_PORT: string;
};

const getConfig = (): ENV => {
  return {
    TCP_PORT: process.env.TCP_PORT,
    TCP_HOST: process.env.TCP_HOST,
    UDP_PORT: process.env.UDP_PORT,
    UDP_HOST: process.env.UDP_HOST,
    RABBIT_MQ_URL: process.env.RABBIT_MQ_URL,
    RABBIT_MQ_PORT: process.env.RABBIT_MQ_PORT,
    RABBIT_MQ_UI_PORT: process.env.RABBIT_MQ_UI_PORT,
  };
};

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);
console.log({ config });
export default sanitizedConfig;
