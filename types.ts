import React from 'react';

export type AppPhase = 'landing' | 'processing_model' | 'dressing_room';

export interface OutfitLayer {
  id: string;
  image: string; // Base64
  description: string;
  timestamp: number;
}

export interface Garment {
  id: string;
  name: string;
  thumbnail: string; // URL or Base64
  category: 'top' | 'bottom' | 'full' | 'shoes' | 'accessory';
}

export interface AppState {
  phase: AppPhase;
  userOriginalImage: string | null;
  generatedModelImage: string | null;
  currentLookImage: string | null;
  history: OutfitLayer[];
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
}

export interface PoseOption {
  id: string;
  label: string;
  prompt: string;
  icon?: React.ReactNode;
}