import express from "express";
import {
  createPatient,
  deletePatientById,
  findPatientById,
  listPatients,
  updatePatient
} from "../repository/patientsRepository.js";

const router = express.Router();

function validatePatient(patient) {
  const requiredFields = ["first_name", "last_name", "date_of_birth", "condition", "status"];
  const missing = requiredFields.filter((field) => !patient[field]);

  if (missing.length > 0) {
    return `Missing required fields: ${missing.join(", ")}`;
  }

  return "";
}

router.get("/", async (_request, response, next) => {
  try {
    response.json(await listPatients());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const patient = await findPatientById(request.params.id);

    if (!patient) {
      response.status(404).send("Patient not found");
      return;
    }

    response.json(patient);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const validationError = validatePatient(request.body);

    if (validationError) {
      response.status(400).send(validationError);
      return;
    }

    response.status(201).json(await createPatient(request.body));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (request, response, next) => {
  try {
    const validationError = validatePatient(request.body);

    if (validationError) {
      response.status(400).send(validationError);
      return;
    }

    const patient = await updatePatient(request.params.id, request.body);

    if (!patient) {
      response.status(404).send("Patient not found");
      return;
    }

    response.json(patient);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const patient = await deletePatientById(request.params.id);

    if (!patient) {
      response.status(404).send("Patient not found");
      return;
    }

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

export { router as patientsRouter };
