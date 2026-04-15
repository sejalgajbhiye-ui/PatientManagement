import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { PatientListPage } from "./pages/PatientListPage";
import { PatientFormPage } from "./pages/PatientFormPage";
import {
  createPatient,
  deletePatient,
  fetchPatient,
  fetchPatients,
  updatePatient
} from "./lib/api";

const emptyForm = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "Female",
  phone: "",
  email: "",
  address: "",
  condition: "",
  status: "Active",
  last_visit: "",
  notes: ""
};

export default function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadPatients() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchPatients();
      setPatients(data);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  async function handleCreate(values) {
    setSaving(true);
    try {
      await createPatient(values);
      await loadPatients();
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate(id, values) {
    setSaving(true);
    try {
      await updatePatient(id, values);
      await loadPatients();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deletePatient(id);
      await loadPatients();
    } catch (deleteError) {
      setError(deleteError.message);
    }
  }

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <PatientListPage
              patients={patients}
              loading={loading}
              error={error}
              onRefresh={loadPatients}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="/patients/new"
          element={
            <PatientFormPage
              title="Add New Patient"
              intro="Register a new patient with the details your care team needs at hand."
              initialValues={emptyForm}
              submitLabel="Create patient"
              saving={saving}
              onSubmit={handleCreate}
            />
          }
        />
        <Route
          path="/patients/:id/edit"
          element={
            <PatientEditor
              saving={saving}
              onLoad={fetchPatient}
              onSubmit={handleUpdate}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function PatientEditor({ saving, onLoad, onSubmit }) {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function loadPatient() {
      try {
        setLoading(true);
        setError("");
        const data = await onLoad(id);
        setPatient({
          ...data,
          date_of_birth: data.date_of_birth?.slice(0, 10) ?? "",
          last_visit: data.last_visit?.slice(0, 10) ?? ""
        });
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, [id, onLoad]);

  if (loading) {
    return <section className="page-shell">Loading patient details...</section>;
  }

  if (error || !patient) {
    return <section className="page-shell">{error || "Patient not found."}</section>;
  }

  return (
    <PatientFormPage
      title="Edit Patient"
      intro="Refine patient details, update care notes, and keep the record clinically current."
      initialValues={patient}
      submitLabel="Save changes"
      saving={saving}
      onSubmit={(values) => onSubmit(id, values)}
    />
  );
}
