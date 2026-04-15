import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fieldGroups = [
  ["first_name", "First name", "text"],
  ["last_name", "Last name", "text"],
  ["date_of_birth", "Date of birth", "date"],
  ["gender", "Gender", "select"],
  ["phone", "Phone", "tel"],
  ["email", "Email", "email"],
  ["condition", "Primary condition", "text"],
  ["status", "Status", "select"],
  ["last_visit", "Last visit", "date"]
];

export function PatientForm({
  initialValues,
  title,
  intro,
  submitLabel,
  onSubmit,
  saving
}) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!values.first_name || !values.last_name || !values.date_of_birth || !values.condition) {
      setError("Please fill in the required patient details before saving.");
      return;
    }

    setError("");

    try {
      await onSubmit(values);
      navigate("/");
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <section className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Patient intake</p>
          <h2>{title}</h2>
          <p className="page-copy">{intro}</p>
        </div>
      </header>

      <form className="form-layout" onSubmit={handleSubmit}>
        <div className="form-grid">
          {fieldGroups.map(([name, label, type]) => (
            <label key={name} className="field">
              <span>{label}</span>
              {type === "select" ? (
                <select name={name} value={values[name] ?? ""} onChange={handleChange}>
                  {(name === "gender"
                    ? ["Female", "Male", "Non-binary", "Other"]
                    : ["Active", "Monitoring", "Discharged"]).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  name={name}
                  value={values[name] ?? ""}
                  onChange={handleChange}
                />
              )}
            </label>
          ))}
        </div>

        <label className="field field-wide">
          <span>Address</span>
          <input name="address" value={values.address ?? ""} onChange={handleChange} />
        </label>

        <label className="field field-wide">
          <span>Clinical notes</span>
          <textarea
            name="notes"
            rows="5"
            value={values.notes ?? ""}
            onChange={handleChange}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="form-actions">
          <button type="button" className="button-secondary" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="button-primary" disabled={saving}>
            {saving ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}
