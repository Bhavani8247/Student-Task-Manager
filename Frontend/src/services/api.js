import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const getToken = () => localStorage.getItem("token");

export async function getTasks() {
  const token = getToken();
  const res = await API.get("/api/tasks", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res;
}

export async function createTask(data) {
  const token = getToken();
  const res = await API.post("/api/tasks", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return res;
}

export async function updateTask(id, data) {
  const token = getToken();
  const res = await API.put(`/api/tasks/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return res;
}

export async function deleteTask(id) {
  const token = getToken();
  const res = await API.delete(`/api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res;
}

export default API;
