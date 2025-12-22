import { getToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken() || ''}`,
});

export const fetchTasks = async (filters) => {
  const params = new URLSearchParams();
  if (filters.status !== 'all') params.append('status', filters.status);
  if (filters.priority !== 'all') params.append('priority', filters.priority);
  if (filters.sort !== 'createdAt') params.append('sort', filters.sort);
  if (filters.search.trim()) params.append('search', filters.search.trim());

  const res = await fetch(`${API_URL}/api/tasks?${params.toString()}`, {
    headers: { Authorization: `Bearer ${getToken() || ''}` },
  });
  if (res.status === 401) throw new Error('Unauthorized');
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Create failed');
  return data;
};

export const updateTask = async (id, updates) => {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Update failed');
  return data;
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken() || ''}` },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Delete failed');
  }
};
