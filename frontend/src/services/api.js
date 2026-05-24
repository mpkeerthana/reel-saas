const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://reel-saas-backend.onrender.com/api";

const clearAuth = () => {
  localStorage.removeItem('token');
  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
};

const parseResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    if (res.status === 401) {
      clearAuth();
    }
    const rawMessage = data?.message || data?.errors?.map((err) => err.msg).join(', ') || 'Request failed';
    const message = typeof rawMessage === 'string' ? rawMessage : JSON.stringify(rawMessage);
    throw new Error(message);
  }
  return data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
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
    const res = await fetch(`${BASE_URL}/auth/user`, {
      headers: {
        ...getAuthHeaders(),
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
    const res = await fetch(`${BASE_URL}/ideas`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    const data = await parseResponse(res);
    return data.ideas || [];
  },

  generateIdea: async (payload) => {
    const res = await fetch(`${BASE_URL}/ideas/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });
    const data = await parseResponse(res);
    return data.idea;
  },

  deleteIdea: async (id) => {
    const res = await fetch(`${BASE_URL}/ideas/${id}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      },
    });
    return parseResponse(res);
  },
};