/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext, useContext } from 'react';
import { authAPI } from '../services/api';

// ── Auth Context ────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = authAPI.isAuthenticated();
      if (!isValid) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        return;
      }
      try {
        await authAPI.getUser();
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);