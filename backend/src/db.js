import pg from "pg";
import { config } from "./config.js";

const { Pool } = pg;

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is required. Add it to backend/.env before starting the API.");
}

export const pool = new Pool({
  connectionString: config.databaseUrl
});
