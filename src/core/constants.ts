import { join } from "path";

export const NODE_ENVS = ["LOCAL", "TESTING"] as const;

export const MAX_PAYLOAD_KEYS_LIMIT = 100;

export const PUBLIC_FOLDER_PATH = join("/app", "public");
