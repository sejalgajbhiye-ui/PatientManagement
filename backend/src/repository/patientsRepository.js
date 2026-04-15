import { pool } from "../db.js";

const patientColumns = `
  first_name,
  last_name,
  date_of_birth,
  gender,
  phone,
  email,
  address,
  condition,
  status,
  last_visit,
  notes
`;

export async function listPatients() {
  const result = await pool.query(
    `select id, ${patientColumns}, created_at, updated_at
     from patients
     order by updated_at desc, last_name asc, first_name asc`
  );

  return result.rows;
}

export async function findPatientById(id) {
  const result = await pool.query(
    `select id, ${patientColumns}, created_at, updated_at
     from patients
     where id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
}

export async function createPatient(patient) {
  const values = [
    patient.first_name,
    patient.last_name,
    patient.date_of_birth,
    patient.gender,
    patient.phone,
    patient.email,
    patient.address,
    patient.condition,
    patient.status,
    patient.last_visit || null,
    patient.notes
  ];

  const result = await pool.query(
    `insert into patients (${patientColumns})
     values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     returning id, ${patientColumns}, created_at, updated_at`,
    values
  );

  return result.rows[0];
}

export async function updatePatient(id, patient) {
  const values = [
    patient.first_name,
    patient.last_name,
    patient.date_of_birth,
    patient.gender,
    patient.phone,
    patient.email,
    patient.address,
    patient.condition,
    patient.status,
    patient.last_visit || null,
    patient.notes,
    id
  ];

  const result = await pool.query(
    `update patients
     set first_name = $1,
         last_name = $2,
         date_of_birth = $3,
         gender = $4,
         phone = $5,
         email = $6,
         address = $7,
         condition = $8,
         status = $9,
         last_visit = $10,
         notes = $11,
         updated_at = now()
     where id = $12
     returning id, ${patientColumns}, created_at, updated_at`,
    values
  );

  return result.rows[0] ?? null;
}

export async function deletePatientById(id) {
  const result = await pool.query(
    `delete from patients
     where id = $1
     returning id`,
    [id]
  );

  return result.rows[0] ?? null;
}
