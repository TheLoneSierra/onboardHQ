const API_URL = import.meta.env.VITE_API_URL;

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/api/projects`);
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
};

export const createProject = async (data) => {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create project");
  return response.json();
};

export const updateProject = async (id, data) => {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update project");
  return response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete project");
  return response.json();
};
