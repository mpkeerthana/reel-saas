// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/95 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-4 rounded-full bg-white/5 p-6 shadow-2xl shadow-purple-500/20 backdrop-blur-xl">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ y: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } }}
            className="h-4 w-4 rounded-full bg-purple-400"
          />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { repeat: Infinity, duration: 1.1, ease: 'easeInOut', delay: 0.2 } }}
            className="h-4 w-4 rounded-full bg-blue-400"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ y: { repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.4 } }}
            className="h-4 w-4 rounded-full bg-cyan-300"
          />
        </div>
        <p className="text-sm text-slate-400">Loading ReelCraft...</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
