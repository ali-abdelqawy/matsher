import { Algorithm } from "jsonwebtoken";
import { NodeEnv } from "../types";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnv;
      PORT: string;
      DB_HOST: string;
      JWT_SECRET: string;
      JWT_ALGORITHM: Algorithm;
      TOKEN_EXPIRES_IN: string;
    }
  }
}

export {};
