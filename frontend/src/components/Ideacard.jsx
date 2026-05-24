import { Heart, Share2, Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';

const Ideacard = ({ idea }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      `${idea.title}\n\n${idea.description}\n\n${idea.hashtags?.join(' ')}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {idea.title}
          </h3>
          <div className="flex items-center flex-wrap gap-2 mb-3">
            {idea.niche && (
              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                {idea.niche}
              </span>
            )}
            {idea.tone && (
              <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                {idea.tone}
              </span>
            )}
          </div>
          {idea.description && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
              {idea.description}
            </p>
          )}
        </div>
        <button onClick={copyToClipboard}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110 ml-2 flex-shrink-0">
          {copied
            ? <CheckCheck className="w-4 h-4 text-green-400" />
            : <Copy className="w-4 h-4 text-gray-400 hover:text-white" />}
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-3">
          {idea.estimatedEngagement && (
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400 font-medium">{idea.estimatedEngagement}%</span>
            </div>
          )}
        </div>

        <button onClick={copyToClipboard}
          className="flex items-center space-x-1 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110">
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hashtags */}
      {idea.hashtags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {idea.hashtags.slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs text-purple-400/70">{tag}</span>
          ))}
          {idea.hashtags.length > 3 && (
            <span className="text-xs text-gray-500">+{idea.hashtags.length - 3} more</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Ideacard;