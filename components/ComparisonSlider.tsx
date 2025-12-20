import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from './Icons';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  onProceed: () => void;
}

const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage, onProceed }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pageX = 'touches' in event ? event.touches[0].pageX : (event as MouseEvent).pageX;
    const position = ((pageX - left) / width) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  useEffect(() => {
    const handleUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchend', handleUp);
      window.addEventListener('mousemove', handleMove as any);
      window.addEventListener('touchmove', handleMove as any);
    }

    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('touchmove', handleMove as any);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl w-full text-center mb-8">
        <h2 className="text-4xl font-serif text-gray-900 mb-2">Review Your Model</h2>
        <p className="text-gray-500">Drag to compare your original photo with the generated model.</p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full max-w-lg aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-white select-none cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Background) */}
        <img 
          src={afterImage} 
          alt="Generated Model" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          GENERATED
        </div>

        {/* Before Image (Foreground - Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt="Original" 
            className="absolute inset-0 w-full h-full object-cover max-w-none" 
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          />
           <div className="absolute top-4 left-4 bg-white/50 text-black px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            ORIGINAL
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
             <motion.div
               animate={{ rotate: 360, scale: [1, 1.2, 1] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             >
               <SparklesIcon className="w-5 h-5 text-purple-600" />
             </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onProceed}
        className="mt-10 px-8 py-4 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-colors shadow-lg"
      >
        Proceed to Styling
      </motion.button>
    </div>
  );
};

export default ComparisonSlider;