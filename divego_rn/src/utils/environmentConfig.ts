import Config from "react-native-config";

export interface EnvironmentConfig {
  HOST?: string;
}

const { HOST } = Config;

const environmentConfig: EnvironmentConfig = {
  HOST,
};

export default environmentConfig;
