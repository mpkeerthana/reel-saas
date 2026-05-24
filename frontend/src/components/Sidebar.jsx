import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Lightbulb, Calendar, X, Sparkles, LogOut } from 'lucide-react';
import { authAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  };

  const menuItems = [
    { path: '/dashboard',      icon: Home,      label: 'Dashboard' },
    { path: '/idea-generator', icon: Lightbulb, label: 'Idea Generator' },
    { path: '/planner',        icon: Calendar,  label: 'Planner' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white/5 backdrop-blur-md border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">ReelCraft</span>
          </div>
          <button onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 lg:hidden">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.path;
            return (
              <Link key={item.path} to={item.path}
                onClick={() => { setActiveItem(item.path); onClose(); }}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                  hover:scale-105 hover:shadow-lg group
                  ${isActive
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 shadow-lg shadow-purple-500/20'
                    : 'hover:bg-white/10'}
                `}>
                <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'}`} />
                <span className={`font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {item.label}
                </span>
                {isActive && <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4 space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/20 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Pro Tip</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Generate viral reel ideas with AI-powered insights and trending topics.
            </p>
          </div>

          <button onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-red-500/10 border border-red-400/20 text-red-400 hover:text-red-300">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;