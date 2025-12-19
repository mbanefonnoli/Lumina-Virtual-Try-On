import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import DressingRoom from './components/DressingRoom';
import LoadingOverlay from './components/LoadingOverlay';
import { AppState } from './types';
import { generateVirtualTryOnImage } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    phase: 'landing',
    userOriginalImage: null,
    generatedModelImage: null,
    currentLookImage: null,
    history: [],
    isLoading: false,
    loadingMessage: '',
    error: null,
  });

  const setLoading = (loading: boolean, message: string = '') => {
    setState(prev => ({ ...prev, isLoading: loading, loadingMessage: message }));
  };

  const handleError = (error: unknown) => {
    console.error(error);
    setState(prev => ({ 
      ...prev, 
      isLoading: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred.' 
    }));
    alert("AI Error: " + (error instanceof Error ? error.message : 'Unknown error'));
  };

  const handleInitialGenerate = async (modelBase64: string, garmentBase64: string) => {
    setLoading(true, "Weaving fabric and fitting model...");
    setState(prev => ({ ...prev, userOriginalImage: modelBase64 }));

    try {
      const resultImage = await generateVirtualTryOnImage(modelBase64, garmentBase64, 'general');
      
      setState(prev => ({
        ...prev,
        generatedModelImage: resultImage, 
        currentLookImage: resultImage,
        isLoading: false,
        phase: 'dressing_room'
      }));
    } catch (e) {
      handleError(e);
    }
  };

  const handleUndo = () => {
    if (state.history.length === 0) return;
    
    const newHistory = [...state.history];
    newHistory.pop();
    
    const previousImage = newHistory.length > 0 
      ? newHistory[newHistory.length - 1].image 
      : state.generatedModelImage;

    setState(prev => ({
      ...prev,
      history: newHistory,
      currentLookImage: previousImage
    }));
  };

  const handleReset = () => {
    setState({
      phase: 'landing',
      userOriginalImage: null,
      generatedModelImage: null,
      currentLookImage: null,
      history: [],
      isLoading: false,
      loadingMessage: '',
      error: null,
    });
  };

  return (
    <div className="antialiased text-gray-900">
      <AnimatePresence>
        {state.isLoading && <LoadingOverlay message={state.loadingMessage} />}
      </AnimatePresence>

      <main>
        {state.phase === 'landing' && (
          <StartScreen onGenerate={handleInitialGenerate} />
        )}

        {state.phase === 'dressing_room' && state.currentLookImage && (
          <DressingRoom 
            currentLook={state.currentLookImage}
            onUndo={handleUndo}
            onReset={handleReset}
            canUndo={state.history.length > 0}
          />
        )}
      </main>
    </div>
  );
};

export default App;