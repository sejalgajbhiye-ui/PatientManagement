import { Link } from "react-router-dom";

function formatDate(value) {
  if (!value) {
    return "Not recorded";
  }

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function getAge(dateOfBirth) {
  if (!dateOfBirth) {
    return "N/A";
  }

  const birthDate = new Date(dateOfBirth);

  if (Number.isNaN(birthDate.getTime())) {
    return "N/A";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

export function PatientListPage({ patients, loading, error, onRefresh, onDelete }) {
  async function handleDelete(patient) {
    const confirmed = window.confirm(
      `Delete ${patient.first_name} ${patient.last_name}? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    await onDelete(patient.id);
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <h1>Patient Management</h1>
        <div className="header-actions">
          <button className="button-secondary" type="button" onClick={onRefresh}>
            Refresh
          </button>
          <Link className="button-primary" to="/patients/new">
            Add Patient
          </Link>
        </div>
      </header>

      <section className="table-card">
        {loading ? <p className="state-text">Loading patients...</p> : null}
        {error ? <p className="state-text state-error">{error}</p> : null}
        {!loading && !error && patients.length === 0 ? (
          <p className="state-text">No patient records yet. Add the first patient to get started.</p>
        ) : null}

        <div className="table-wrapper">
          <table className="patient-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Condition</th>
                <th>Last Visit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td data-label="Name">
                    {patient.first_name} {patient.last_name}
                  </td>
                  <td data-label="Age">{getAge(patient.date_of_birth)}</td>
                  <td data-label="Gender">{patient.gender || "N/A"}</td>
                  <td data-label="Contact">{patient.phone || patient.email || "N/A"}</td>
                  <td data-label="Condition">{patient.condition || "N/A"}</td>
                  <td data-label="Last Visit">{formatDate(patient.last_visit)}</td>
                  <td data-label="Status">{patient.status || "N/A"}</td>
                  <td data-label="Actions">
                    <div className="patient-actions">
                      <Link className="button-secondary" to={`/patients/${patient.id}/edit`}>
                        Edit
                      </Link>
                      <button
                        className="button-danger"
                        type="button"
                        onClick={() => handleDelete(patient)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
