import { useState, useEffect } from 'react';
import { Play, Share2, Menu, Lightbulb, Plus, User, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Ideacard from '../components/Ideacard';
import Sidebar from '../components/Sidebar';
import { ideasAPI, authAPI } from '../services/api';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentIdeas, setRecentIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // ✅ ADDED

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authAPI.getUser();
        setUser(userData);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }

      try {
        const ideas = await ideasAPI.getIdeas();
        setRecentIdeas(ideas.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch ideas:', err);
        setRecentIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-auto">

        {/* ── Top Navbar ── */}
        <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>

              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ReelCraft
              </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full" />
              </button>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-white text-sm font-semibold">
                    {user ? user.username : '...'}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {user ? user.email : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Page Content ── */}
        <div className="p-6 max-w-7xl mx-auto w-full">
          <div className="space-y-8">

            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Welcome back{user ? `, ${user.username}` : ''}! Here's your reel performance overview.
              </p>
            </div>

            {/* 🔥 Recent Ideas Section */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              
              {/* HEADER WITH VIEW ALL */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Reel Ideas</h2>

                <div className="flex gap-3">

                  {/* 🔥 VIEW ALL BUTTON */}
                  <button
                    onClick={() => navigate("/ideas")}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all"
                  >
                    View All
                  </button>

                  {/* EXISTING BUTTON */}
                  <Link
                    to="/idea-generator"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium hover:scale-105 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Generate New
                  </Link>

                </div>
              </div>

              {/* CONTENT */}
              {loading ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500" />
                </div>
              ) : recentIdeas.length === 0 ? (
                <div className="text-center py-16">
                  <Lightbulb className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                  <p className="text-gray-400">No ideas yet</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {recentIdeas.map((idea) => (
                    <Ideacard key={idea._id} idea={idea} />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/idea-generator"
                className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:scale-105 transition-all">
                <h3 className="text-white font-semibold">Idea Generator</h3>
                <p className="text-gray-400 text-sm">Create viral ideas</p>
              </Link>

              <Link to="/planner"
                className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:scale-105 transition-all">
                <h3 className="text-white font-semibold">Planner</h3>
                <p className="text-gray-400 text-sm">Schedule content</p>
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;