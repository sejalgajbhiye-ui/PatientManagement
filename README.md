# PatientManagement

Patient management starter built with a React frontend, an Express API, and PostgreSQL persistence.

## Stack

- React + Vite for the frontend
- Express for the API
- PostgreSQL for the database

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a PostgreSQL database named `patient_management`.

3. Copy `backend/.env.example` to `backend/.env` if you want to override the local defaults.

4. Copy `frontend/.env.example` to `frontend/.env` if your API will run on a different URL.

5. Run the SQL setup:

   ```sql
   \i db/schema.sql
   \i db/seed.sql
   ```

6. Start the app:

   ```bash
   npm run dev
   ```

Frontend runs on `http://localhost:5173` and the API runs on `http://localhost:4000`.
