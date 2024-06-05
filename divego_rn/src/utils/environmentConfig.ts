import Config from "react-native-config";

export interface EnvironmentConfig {
  HOST?: string;
  GOOGLE_MAPS_API_KEY?: string;
}

const { HOST, GOOGLE_MAPS_API_KEY } = Config;

const environmentConfig: EnvironmentConfig = {
  HOST,
  GOOGLE_MAPS_API_KEY,
};

export default environmentConfig;
