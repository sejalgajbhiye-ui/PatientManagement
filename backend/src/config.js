import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/patient_management",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173"
};
