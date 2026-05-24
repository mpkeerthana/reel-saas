const BASE_URL = "http://localhost:5000/api";

const parseResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    const rawMessage = data?.message || data?.errors?.map((err) => err.msg).join(', ') || 'Request failed';
    const message = typeof rawMessage === 'string' ? rawMessage : JSON.stringify(rawMessage);
    throw new Error(message);
  }
  return data;
};

// 🔐 AUTH API
export const authAPI = {
  isAuthenticated: () => !!localStorage.getItem('token'),

  register: async (payload) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await parseResponse(res);
    localStorage.setItem('token', data.token);
    return data;
  },

  login: async (payload) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await parseResponse(res);
    localStorage.setItem('token', data.token);
    return data;
  },

  getUser: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return parseResponse(res);
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  resetPassword: async (payload) => {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return parseResponse(res);
  },
};

// IDEAS API
export const ideasAPI = {
  getIdeas: async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/ideas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await parseResponse(res);
    return data.ideas || [];
  },

  generateIdea: async (payload) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/ideas/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await parseResponse(res);
    return data.idea;
  },

  deleteIdea: async (id) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/ideas/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return parseResponse(res);
  },
};