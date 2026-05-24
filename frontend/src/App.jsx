import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Ideagenerator from './pages/Ideagenerator';
import Plannerpage from './pages/Plannerpage';
import Ideas from "./pages/Ideas";
import { AuthProvider, useAuth } from './contexts/AuthContext';

const Spinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === null) return <Spinner />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === null) return <Spinner />;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/"       element={<PublicRoute><Landing /></PublicRoute>} />
          <Route path="/login"  element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

          {/* Protected */}
          <Route path="/dashboard"      element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/idea-generator" element={<ProtectedRoute><Ideagenerator /></ProtectedRoute>} />
          <Route path="/ideagenerator"  element={<ProtectedRoute><Ideagenerator /></ProtectedRoute>} />
          <Route path="/planner"        element={<ProtectedRoute><Plannerpage /></ProtectedRoute>} />
          <Route path="/plannerpage"    element={<ProtectedRoute><Plannerpage /></ProtectedRoute>} />
          <Route path="/ideas" element={<Ideas />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;