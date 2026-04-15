# Patient Management

A simple full-stack patient management app with a React frontend, an Express API, and PostgreSQL storage.

## Overview

This project lets you:

- View a list of patients in a clean, minimal UI
- Add a new patient
- Edit an existing patient
- Delete a patient with confirmation
- Persist patient records in PostgreSQL

## Tech Stack

- Frontend: React 19, React Router, Vite
- Backend: Node.js, Express 5
- Database: PostgreSQL

## Project Structure

```text
PatientManagement/
|-- frontend/   # React + Vite client
|-- backend/    # Express API
|-- db/         # PostgreSQL schema and seed data
|-- package.json
```

## Prerequisites

- Node.js and npm
- PostgreSQL

## Setup

1. Install dependencies from the project root:

```bash
npm install
```

2. Create a PostgreSQL database named `patient_management`.

3. Apply the database schema and optional seed data:

```sql
\i db/schema.sql
\i db/seed.sql
```

4. Configure environment files if needed:

- Backend: copy `backend/.env.example` to `backend/.env`
- Frontend: copy `frontend/.env.example` to `frontend/.env`

Default backend values:

```env
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/patient_management
CORS_ORIGIN=http://localhost:5173
```

Default frontend value:

```env
VITE_API_URL=http://localhost:4000/api
```

## Running the App

Start frontend and backend together from the root:

```bash
npm run dev
```

Apps will run at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

## Available Scripts

From the root:

- `npm run dev` - start frontend and backend together
- `npm run build` - build the frontend
- `npm run start` - start the backend in production mode

From `frontend/`:

- `npm run dev`
- `npm run build`
- `npm run preview`

From `backend/`:

- `npm run dev`
- `npm run start`

## API Endpoints

Base URL: `http://localhost:4000/api`

- `GET /health` - health check
- `GET /patients` - list all patients
- `GET /patients/:id` - get one patient
- `POST /patients` - create a patient
- `PUT /patients/:id` - update a patient
- `DELETE /patients/:id` - delete a patient

## Patient Fields

The `patients` table includes:

- `first_name`
- `last_name`
- `date_of_birth`
- `gender`
- `phone`
- `email`
- `address`
- `condition`
- `status`
- `last_visit`
- `notes`

Required API fields:

- `first_name`
- `last_name`
- `date_of_birth`
- `condition`
- `status`

## Notes

- The frontend uses the existing backend API at `/api/patients`.
- The current backend is Express-based and not a Spring Boot application.
