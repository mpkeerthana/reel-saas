import { TrendingUp, TrendingDown } from 'lucide-react';

const Statscard = ({ title, value, icon, trend, color }) => {
  const Icon = icon;
  const isPositive = trend?.startsWith('+');

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-r ${color} rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
          {value}
        </p>
      </div>
    </div>
  );
};

export default Statscard;