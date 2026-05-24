import { useState, useRef } from 'react';
import { Sparkles, Wand2, Copy, RefreshCw, Heart, Eye, Share2, Menu, CheckCheck } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { ideasAPI } from '../services/api';

const Ideagenerator = () => {
  const [selectedNiche, setSelectedNiche] = useState('');
  const [selectedTone,  setSelectedTone]  = useState('');
  const [generatedIdea, setGeneratedIdea] = useState(null);
  const [isGenerating,  setIsGenerating]  = useState(false);
  const [error,         setError]         = useState('');
  const [copied,        setCopied]        = useState('');
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  // Track previously generated titles to avoid repetition
  const previousTitles = useRef([]);

  const niches = [
    { id: 'Motivation', label: 'Motivation', emoji: '💪' },
    { id: 'Love',       label: 'Love',       emoji: '❤️' },
    { id: 'Comedy',     label: 'Comedy',     emoji: '😂' },
    { id: 'Lifestyle',  label: 'Lifestyle',  emoji: '✨' },
    { id: 'Food',       label: 'Food',       emoji: '🍕' },
    { id: 'Fitness',    label: 'Fitness',    emoji: '🏃' },
    { id: 'Tech',       label: 'Tech',       emoji: '💻' },
    { id: 'Fashion',    label: 'Fashion',    emoji: '👗' },
    { id: 'Travel',     label: 'Travel',     emoji: '✈️' },
    { id: 'Education',  label: 'Education',  emoji: '📚' },
  ];

  const tones = [
    { id: 'Inspirational', label: 'Inspirational', color: 'from-yellow-400 to-orange-500' },
    { id: 'Savage',        label: 'Savage',        color: 'from-red-400 to-pink-500'      },
    { id: 'Sad',           label: 'Sad',           color: 'from-blue-400 to-indigo-500'   },
    { id: 'Funny',         label: 'Funny',         color: 'from-green-400 to-emerald-500' },
    { id: 'Mysterious',    label: 'Mysterious',    color: 'from-purple-400 to-violet-500' },
    { id: 'Empowering',    label: 'Empowering',    color: 'from-pink-400 to-rose-500'     },
  ];

  const copyToClipboard = async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleGenerate = async () => {
    if (!selectedNiche || !selectedTone) return;
    setIsGenerating(true);
    setError('');

    try {
      // Pass previous titles so backend avoids repeats
        const idea = await ideasAPI.generateIdea({
        niche: selectedNiche,
        mood: selectedTone,
        previousTitles: previousTitles.current,
      });

      const titleToRemember = idea.title || idea.content || '';
      if (titleToRemember) {
        previousTitles.current = [...previousTitles.current.slice(-9), titleToRemember];
      }

      setGeneratedIdea(idea);
    } catch (err) {
      setError(err.message || 'Failed to generate idea. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto w-full">

          {/* Mobile header */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-white">Idea Generator</h1>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI Idea Generator
                </h1>
              </div>
              <p className="text-gray-400 text-lg">Generate unique viral reel ideas powered by AI</p>
            </div>

            {/* Niche + Tone */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Niche */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span>🎯</span><span>Choose Your Niche</span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {niches.map(niche => (
                    <button key={niche.id} onClick={() => setSelectedNiche(niche.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        selectedNiche === niche.id
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400 shadow-lg shadow-purple-500/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}>
                      <div className="text-2xl mb-2">{niche.emoji}</div>
                      <div className={`text-sm font-medium ${selectedNiche === niche.id ? 'text-purple-300' : 'text-gray-300'}`}>
                        {niche.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <span>🎭</span><span>Choose Your Tone</span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {tones.map(tone => (
                    <button key={tone.id} onClick={() => setSelectedTone(tone.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                        selectedTone === tone.id
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400 shadow-lg shadow-purple-500/20'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}>
                      <div className={`w-full h-2 bg-gradient-to-r ${tone.color} rounded-full mb-2`} />
                      <div className={`text-sm font-medium ${selectedTone === tone.id ? 'text-purple-300' : 'text-gray-300'}`}>
                        {tone.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <div className="text-center">
              <button onClick={handleGenerate}
                disabled={!selectedNiche || !selectedTone || isGenerating}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-3 mx-auto">
                {isGenerating
                  ? <><RefreshCw className="w-6 h-6 animate-spin" /><span>Generating...</span></>
                  : <><Wand2 className="w-6 h-6" /><span>{generatedIdea ? 'Generate Another' : 'Generate Idea'}</span></>
                }
              </button>
              {generatedIdea && !isGenerating && (
                <p className="text-gray-500 text-sm mt-2">Each click generates a completely different idea</p>
              )}
            </div>

            {/* Result */}
            {generatedIdea && (
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <span>Your Reel Idea</span>
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 text-green-400">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm font-medium">{generatedIdea.estimatedEngagement ?? 'N/A'}</span>
                    </div>
                    <button onClick={() => copyToClipboard(generatedIdea.title || generatedIdea.content, 'title')}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110"
                      title="Copy title">
                      {copied === 'title' ? <CheckCheck className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Title & description */}
                  <div>
                    <h3 className="text-xl font-semibold text-purple-300 mb-2">{generatedIdea.title || 'Generated Reel Idea'}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {generatedIdea.description || generatedIdea.content || 'No idea was generated. Try again.'}
                    </p>
                  </div>

                  {/* Hook */}
                  {generatedIdea.hook && (
                    <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-purple-300">Opening Hook</h4>
                        <button onClick={() => copyToClipboard(generatedIdea.hook, 'hook')}
                          className="p-1 hover:bg-white/10 rounded-lg transition-all">
                          {copied === 'hook' ? <CheckCheck className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
                        </button>
                      </div>
                      <p className="text-white text-sm italic">"{generatedIdea.hook}"</p>
                    </div>
                  )}

                  {/* Hashtags */}
                  {generatedIdea.hashtags?.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-white">Recommended Hashtags</h4>
                        <button onClick={() => copyToClipboard(generatedIdea.hashtags.join(' '), 'hashtags')}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-all px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg">
                          {copied === 'hashtags' ? <CheckCheck className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                          Copy all
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {generatedIdea.hashtags.map((tag, i) => (
                          <button key={i} onClick={() => copyToClipboard(tag, `tag-${i}`)}
                            className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full text-sm hover:bg-purple-500/30 transition-all duration-300 hover:scale-105">
                            {copied === `tag-${i}` ? '✓ Copied' : tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>Est. 15K+ views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>High engagement potential</span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        `${generatedIdea.title || ''}\n\n${generatedIdea.description || generatedIdea.content || ''}\n\n${generatedIdea.hashtags?.join(' ') || ''}`,
                        'all'
                      )}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2">
                      {copied === 'all' ? <CheckCheck className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                      <span>{copied === 'all' ? 'Copied!' : 'Copy All'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ideagenerator;