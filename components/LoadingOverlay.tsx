import React from 'react';
import { motion } from 'framer-motion';
import { BabyOnesieIcon, SparklesIcon } from './Icons';

interface LoadingOverlayProps {
  message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  // Generate random bubbles
  const bubbles = Array.from({ length: 15 });

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Playful Pastel Gradient Background */}
      <motion.div 
        animate={{ 
          background: [
            "linear-gradient(135deg, #e0f2fe 0%, #fdf2f8 100%)",
            "linear-gradient(135deg, #fdf2f8 0%, #f0f9ff 100%)",
            "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)"
          ] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      />

      {/* Floating Bubbles Background Particles */}
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 100,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: -100, 
            opacity: [0, 0.4, 0.4, 0],
            x: `calc(${Math.random() * 100}vw + ${Math.sin(i) * 50}px)` 
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute w-12 h-12 rounded-full border border-white bg-white/30 backdrop-blur-[2px]"
        />
      ))}

      {/* Central Bouncing Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Bouncing Baby Onesie Icon */}
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            scaleY: [1, 0.85, 1.1, 1],
            scaleX: [1, 1.15, 0.9, 1]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative mb-12"
        >
          <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center border-4 border-white">
            <BabyOnesieIcon className="w-12 h-12 text-blue-400" />
          </div>
          
          {/* Twinkling Stars */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 90, 180]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.6,
                ease: "easeInOut"
              }}
              style={{
                top: i === 0 ? '-10px' : i === 1 ? '20px' : '60px',
                right: i === 0 ? '-10px' : i === 1 ? '-30px' : '70px',
              }}
            >
              <SparklesIcon className="w-6 h-6 text-yellow-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Message Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/60 backdrop-blur-md px-8 py-4 rounded-full shadow-lg border border-white/50"
        >
          <motion.p
            key={message}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-blue-600 font-serif tracking-wide text-center"
          >
            {message}
          </motion.p>
        </motion.div>
        
        {/* Subtle Progress Text */}
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] font-bold text-blue-300/80">
          AI Styling in progress
        </p>
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white/20 shadow-[inset_0_0_150px_rgba(255,255,255,0.5)]" />
    </div>
  );
};

export default LoadingOverlay;