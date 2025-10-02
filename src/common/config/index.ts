import dotenv from "dotenv";
dotenv.config();

enum ENVIRONMENT_VARIABLES {
  PORT = "PORT",
}

function getEnv(variableName: ENVIRONMENT_VARIABLES) {
  const envKey = ENVIRONMENT_VARIABLES[variableName];
  const foundEnv = process.env[envKey];
  const message = `${envKey} was not found`;
  if (!foundEnv) {
    console.log(message);
    throw Error(message);
  }
  return foundEnv;
}

export const APP_CONFIGS = {
  SERVER_PORT: getEnv(ENVIRONMENT_VARIABLES.PORT),
};
