const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.status === 204 ? null : response.json();
}

export function fetchPatients() {
  return request("/patients");
}

export function fetchPatient(id) {
  return request(`/patients/${id}`);
}

export function createPatient(payload) {
  return request("/patients", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updatePatient(id, payload) {
  return request(`/patients/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

export function deletePatient(id) {
  return request(`/patients/${id}`, {
    method: "DELETE"
  });
}
