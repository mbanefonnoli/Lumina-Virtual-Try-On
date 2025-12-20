import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UploadIcon, SparklesIcon, UserIcon, ShirtIcon } from './Icons';
import { fileToBase64 } from '../services/geminiService';

interface StartScreenProps {
  onGenerate: (modelBase64: string, garmentBase64: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onGenerate }) => {
  const modelInputRef = useRef<HTMLInputElement>(null);
  const garmentInputRef = useRef<HTMLInputElement>(null);

  const [modelImage, setModelImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);

  const handleModelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setModelImage(base64);
    }
  };

  const handleGarmentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setGarmentImage(base64);
    }
  };

  const handleStart = () => {
    if (modelImage && garmentImage) {
      onGenerate(modelImage, garmentImage);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[100px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-40" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full flex flex-col items-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-medium tracking-wide text-gray-600 mb-8">
          <SparklesIcon className="w-3 h-3" /> POWERED BY GEMINI 2.5
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 leading-[1.1] mb-4 text-center">
          Mix & Match<br/> Instant Try-On
        </h1>
        
        <p className="text-lg text-gray-500 max-w-lg text-center mb-12 font-light">
          Upload a photo of yourself and a photo of any clothing item. We'll instantly combine them into a new look.
        </p>

        {/* Dual Upload Area */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mb-12">
          
          {/* Card 1: Model */}
          <div className="flex-1">
            <div 
              onClick={() => modelInputRef.current?.click()}
              className={`relative aspect-[3/4] rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md group ${modelImage ? 'border-transparent' : 'border-gray-300 hover:border-gray-800'}`}
            >
              {modelImage ? (
                <>
                  <img src={modelImage} alt="Model" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Change Photo</div>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <UserIcon className="w-8 h-8 text-gray-400" />
                   </div>
                   <h3 className="text-lg font-medium text-gray-900">Upload Person</h3>
                   <p className="text-sm text-gray-500 mt-1">The model for the try-on</p>
                </div>
              )}
              <input type="file" ref={modelInputRef} className="hidden" accept="image/*" onChange={handleModelUpload} />
            </div>
          </div>

          {/* Plus Sign */}
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
          </div>

          {/* Card 2: Garment */}
          <div className="flex-1">
            <div 
              onClick={() => garmentInputRef.current?.click()}
              className={`relative aspect-[3/4] rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md group ${garmentImage ? 'border-transparent' : 'border-gray-300 hover:border-gray-800'}`}
            >
              {garmentImage ? (
                <>
                  <img src={garmentImage} alt="Garment" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Change Photo</div>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                   <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                     <ShirtIcon className="w-8 h-8 text-gray-400" />
                   </div>
                   <h3 className="text-lg font-medium text-gray-900">Upload Garment</h3>
                   <p className="text-sm text-gray-500 mt-1">The outfit to wear</p>
                </div>
              )}
              <input type="file" ref={garmentInputRef} className="hidden" accept="image/*" onChange={handleGarmentUpload} />
            </div>
          </div>

        </div>

        {/* Action Button */}
        <button 
          onClick={handleStart}
          disabled={!modelImage || !garmentImage}
          className={`group relative px-10 py-5 bg-black text-white text-xl font-medium rounded-full overflow-hidden shadow-2xl transition-all duration-300 transform 
            ${!modelImage || !garmentImage ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:shadow-3xl hover:-translate-y-1'}
          `}
        >
          <span className="relative z-10 flex items-center gap-3">
            <SparklesIcon className="w-6 h-6" /> Generate New Look
          </span>
          <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </button>

      </motion.div>
    </div>
  );
};

export default StartScreen;