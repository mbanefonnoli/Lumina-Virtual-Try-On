import { Garment, PoseOption } from './types';

export const DEFAULT_WARDROBE: Garment[] = [
  {
    id: 'g1',
    name: 'Silk Blouse',
    thumbnail: 'https://picsum.photos/200/200?random=1',
    category: 'top'
  },
  {
    id: 'g2',
    name: 'Tweed Jacket',
    thumbnail: 'https://picsum.photos/200/200?random=2',
    category: 'top'
  },
  {
    id: 'g3',
    name: 'Denim Jeans',
    thumbnail: 'https://picsum.photos/200/200?random=3',
    category: 'bottom'
  },
  {
    id: 'g4',
    name: 'Floral Summer Dress',
    thumbnail: 'https://picsum.photos/200/200?random=4',
    category: 'full'
  },
  {
    id: 'g5',
    name: 'Leather Boots',
    thumbnail: 'https://picsum.photos/200/200?random=5',
    category: 'shoes'
  },
  {
    id: 'g6',
    name: 'Wool Scarf',
    thumbnail: 'https://picsum.photos/200/200?random=6',
    category: 'accessory'
  },
];

export const POSE_OPTIONS: PoseOption[] = [
  { id: 'p1', label: 'Frontal', prompt: 'standing straight, full frontal view, hands by sides, confident expression' },
  { id: 'p2', label: 'Walking', prompt: 'walking forward on a runway, movement in clothes, one leg forward' },
  { id: 'p3', label: 'Side Profile', prompt: 'standing in profile view, looking to the side, elegant posture' },
  { id: 'p4', label: 'Sitting', prompt: 'sitting on a modern stool, relaxed but high fashion pose' },
];

export interface RemixIdea {
  label: string;
  prompt: string;
}

export const REMIX_IDEAS: RemixIdea[] = [
  { 
    label: "Add a vintage leather belt", 
    prompt: "Add a high-quality vintage leather belt to the model's outfit. Ensure it drapes naturally over the clothes." 
  },
  { 
    label: "Try a futuristic neon vibe", 
    prompt: "Change the overall mood to a futuristic aesthetic. Add subtle neon lighting reflections to the clothes and skin." 
  },
  { 
    label: "Apply sunset hour lighting", 
    prompt: "Change the studio lighting to a warm, golden hour sunset light. Add soft long shadows and a warm glow." 
  },
  { 
    label: "Add gold jewelry accents", 
    prompt: "Accessorize the model with elegant gold jewelry: a necklace and subtle bracelets that match the outfit style." 
  },
  { 
    label: "Switch to a black & white editorial", 
    prompt: "Transform the entire image into a high-contrast black and white fashion editorial photograph. Maintain all details." 
  }
];
