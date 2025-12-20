import React from 'react';
import { motion } from 'framer-motion';
import { UndoIcon, RefreshIcon } from './Icons';

interface DressingRoomProps {
  currentLook: string;
  onUndo: () => void;
  onReset: () => void;
  canUndo: boolean;
}

const DressingRoom: React.FC<DressingRoomProps> = ({ 
  currentLook, 
  onUndo, 
  onReset,
  canUndo 
}) => {
  return (
    <div className="flex w-screen h-screen bg-[#fafafa] overflow-hidden font-sans">
      
      {/* Main Canvas Area - Full Screen */}
      <div className="flex-1 relative flex flex-col p-8 items-center justify-center bg-[#f0f0f0]">
        
        {/* Top Controls Overlay */}
        <div className="absolute top-6 left-8 flex gap-3 z-50">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-gray-200 hover:bg-gray-50 transition"
          >
            <RefreshIcon className="w-4 h-4" /> Start Over
          </motion.button>
          
          <motion.button 
            whileHover={canUndo ? { scale: 1.05 } : {}}
            whileTap={canUndo ? { scale: 0.95 } : {}}
            onClick={onUndo}
            disabled={!canUndo}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border transition ${canUndo ? 'bg-white border-gray-200 text-black hover:bg-gray-50' : 'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed'}`}
          >
            <UndoIcon className="w-4 h-4" /> Undo
          </motion.button>
        </div>

        {/* The Fashion Model Canvas */}
        <motion.div 
          layoutId="model-canvas"
          className="relative w-full max-w-lg aspect-[3/4] bg-white rounded-2xl shadow-xl overflow-hidden border-[8px] border-white ring-1 ring-black/5"
        >
          <img 
            src={currentLook} 
            alt="Current Look" 
            className="w-full h-full object-cover" 
          />
        </motion.div>
        
        <p className="mt-6 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
          High Fidelity Virtual Dressing Room
        </p>
      </div>

    </div>
  );
};

export default DressingRoom;