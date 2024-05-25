import { NODE_ENV } from "../env";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NODE_ENV;
      PORT: string;
      DB_HOST: string;
    }
  }
}

export {};
