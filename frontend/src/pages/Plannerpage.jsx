import { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, Play, Menu, Trash2, Edit3, X, Save } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const emptyReel = { title: '', time: '10:00', niche: 'General', tone: 'Casual', status: 'planned' };

const NICHES = ['General', 'Motivation', 'Fitness', 'Cooking', 'Lifestyle', 'Comedy', 'Tech', 'Fashion', 'Travel', 'Education'];
const TONES  = ['Casual', 'Inspirational', 'Energetic', 'Fun', 'Professional', 'Emotional', 'Humorous', 'Informative'];

const Plannerpage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [plannedReels, setPlannedReels] = useState([
    { id: 1, date: '2024-04-17', title: 'Morning Routine Hack', time: '08:00', status: 'planned',   niche: 'Motivation', tone: 'Inspirational' },
    { id: 2, date: '2024-04-18', title: 'Quick Workout Tips',   time: '12:00', status: 'completed', niche: 'Fitness',    tone: 'Energetic'    },
    { id: 3, date: '2024-04-19', title: 'Recipe Transformation',time: '18:00', status: 'planned',   niche: 'Cooking',    tone: 'Fun'          },
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingReel, setEditingReel] = useState(null); // null = add new
  const [formData, setFormData] = useState(emptyReel);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // id to confirm delete

  // ── Helpers ──────────────────────────────────────────────────────────────
  const currentReels = plannedReels.filter(r => r.date === selectedDate);

  const openAddModal = () => {
    setEditingReel(null);
    setFormData({ ...emptyReel, date: selectedDate });
    setShowModal(true);
  };

  const openEditModal = (reel) => {
    setEditingReel(reel.id);
    setFormData({ ...reel });
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingReel(null); };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;
    if (editingReel) {
      setPlannedReels(prev => prev.map(r => r.id === editingReel ? { ...formData, id: editingReel } : r));
    } else {
      setPlannedReels(prev => [...prev, { ...formData, id: Date.now(), date: selectedDate }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setPlannedReels(prev => prev.filter(r => r.id !== id));
    setDeleteConfirm(null);
  };

  const toggleStatus = (id) => {
    setPlannedReels(prev => prev.map(r =>
      r.id === id ? { ...r, status: r.status === 'completed' ? 'planned' : 'completed' } : r
    ));
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto w-full">

          {/* Mobile header */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-white">Content Planner</h1>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center space-x-3">
                  <Calendar className="w-8 h-8 text-purple-400" />
                  <span>Content Planner</span>
                </h1>
                <p className="text-gray-400 mt-2">Plan and schedule your reel content</p>
              </div>
              <button onClick={openAddModal}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Reel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Date picker */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h2 className="text-xl font-semibold text-white mb-4">Select Date</h2>
                  <input type="date" value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>

                {/* Reels for selected date */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">
                      Reels for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
                      {currentReels.length} reel{currentReels.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {currentReels.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">No reels planned for this date</p>
                      <button onClick={openAddModal}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105">
                        Add Your First Reel
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentReels.map(reel => (
                        <div key={reel.id}
                          className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 transition-all duration-300 hover:border-white/20">
                          <div className="flex items-start justify-between gap-4">
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-white mb-2 truncate">{reel.title}</h4>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{reel.time}</span>
                                </div>
                                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-xs rounded-full">{reel.niche}</span>
                                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">{reel.tone}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {/* Status toggle */}
                              <button onClick={() => toggleStatus(reel.id)}
                                title={reel.status === 'completed' ? 'Mark as planned' : 'Mark as completed'}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 ${
                                  reel.status === 'completed'
                                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                    : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                                }`}>
                                {reel.status === 'completed'
                                  ? <><CheckCircle className="w-3 h-3" /><span>Done</span></>
                                  : <><Clock className="w-3 h-3" /><span>Planned</span></>}
                              </button>

                              {/* Edit */}
                              <button onClick={() => openEditModal(reel)}
                                title="Edit reel"
                                className="p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/20 rounded-xl text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-105">
                                <Edit3 className="w-4 h-4" />
                              </button>

                              {/* Delete */}
                              {deleteConfirm === reel.id ? (
                                <div className="flex items-center gap-1">
                                  <button onClick={() => handleDelete(reel.id)}
                                    className="px-2 py-1.5 bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 rounded-xl text-red-400 text-xs font-medium transition-all duration-300">
                                    Confirm
                                  </button>
                                  <button onClick={() => setDeleteConfirm(null)}
                                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-all duration-300">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button onClick={() => setDeleteConfirm(reel.id)}
                                  title="Delete reel"
                                  className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-400/20 rounded-xl text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-105">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar stats */}
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Overview</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Total Planned', value: plannedReels.filter(r => r.status === 'planned').length,   color: 'text-yellow-400' },
                      { label: 'Completed',     value: plannedReels.filter(r => r.status === 'completed').length, color: 'text-green-400'  },
                      { label: 'Total Reels',   value: plannedReels.length,                                       color: 'text-purple-400' },
                    ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center">
                        <span className="text-gray-400">{stat.label}</span>
                        <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button onClick={openAddModal}
                      className="w-full p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 text-left flex items-center gap-2">
                      <Plus className="w-4 h-4 text-purple-400" /> Add New Reel
                    </button>
                    <button
                      onClick={() => setPlannedReels(prev => prev.map(r => r.date === selectedDate ? { ...r, status: 'completed' } : r))}
                      className="w-full p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 text-left flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" /> Mark All Done
                    </button>
                    <button
                      onClick={() => { if(window.confirm('Delete all reels for this date?')) setPlannedReels(prev => prev.filter(r => r.date !== selectedDate)); }}
                      className="w-full p-3 bg-gradient-to-r from-red-500/20 to-rose-500/20 hover:from-red-500/30 hover:to-rose-500/30 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 text-left flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-red-400" /> Clear This Day
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Best Posting Times</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { time: 'Morning (8–10 AM)', level: 'High',   color: 'text-green-400'  },
                      { time: 'Afternoon (12–2 PM)', level: 'Medium', color: 'text-yellow-400' },
                      { time: 'Evening (6–8 PM)',  level: 'High',   color: 'text-green-400'  },
                    ].map(t => (
                      <div key={t.time} className="flex justify-between">
                        <span className="text-gray-400">{t.time}</span>
                        <span className={t.color}>{t.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Add / Edit Modal ─────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingReel ? 'Edit Reel' : 'Add New Reel'}
              </h2>
              <button onClick={closeModal}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
                <input type="text" name="title" value={formData.title}
                  onChange={handleFormChange} placeholder="Enter reel title"
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Posting Time</label>
                <input type="time" name="time" value={formData.time}
                  onChange={handleFormChange}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>

              {/* Niche */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Niche</label>
                <select name="niche" value={formData.niche} onChange={handleFormChange}
                  className="w-full p-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tone</label>
                <select name="tone" value={formData.tone} onChange={handleFormChange}
                  className="w-full p-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleFormChange}
                  className="w-full p-3 bg-slate-800 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="planned">Planned</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal}
                className="flex-1 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 font-medium transition-all duration-300">
                Cancel
              </button>
              <button onClick={handleSave} disabled={!formData.title.trim()}
                className="flex-1 p-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                {editingReel ? 'Save Changes' : 'Add Reel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plannerpage;