import cors from "cors";
import express from "express";
import { config } from "./config.js";
import { patientsRouter } from "./routes/patients.js";

const app = express();

app.use(
  cors({
    origin: config.corsOrigin
  })
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ ok: true });
});

app.use("/api/patients", patientsRouter);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).send("The server could not complete that request.");
});

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
