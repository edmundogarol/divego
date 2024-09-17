//@ts-ignore
import { HOST, GOOGLE_MAPS_API_KEY } from "@env";

export interface EnvironmentConfig {
  HOST?: string;
  GOOGLE_MAPS_API_KEY?: string;
}

console.log({ HOST, GOOGLE_MAPS_API_KEY });
const environmentConfig: EnvironmentConfig = {
  HOST,
  GOOGLE_MAPS_API_KEY,
};

export default environmentConfig;
