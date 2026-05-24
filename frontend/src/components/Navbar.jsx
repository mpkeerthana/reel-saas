import { Menu, Bell, User } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            ReelCraft
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 relative">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;