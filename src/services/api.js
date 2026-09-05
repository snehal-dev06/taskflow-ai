// This file will be used for API requests in Phase 2.
// Keeping API code separate means the UI will not need to be rebuilt
// when the real backend is connected.

const API_URL = import.meta.env.VITE_API_URL || "";

export async function getProjects() {
  const response = await fetch(`${API_URL}/api/projects`);

  if (!response.ok) {
    throw new Error("Could not load projects");
  }

  return response.json();
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/api/tasks`);

  if (!response.ok) {
    throw new Error("Could not load tasks");
  }

  return response.json();
}
