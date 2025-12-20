import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash-image';

// System prompt strictly as requested by the user, now including strict adherence rule
const SYSTEM_INSTRUCTION = `STRICT ADHERENCE: Do not add any elements, backgrounds, or changes not explicitly requested. Focus solely on the provided task with zero creative deviation or "suggestions".

Face Consistency: Keep the person’s facial features exactly the same as the upload person, but change their expression to look excited.

Virtual Try-On (General):
"Create a stunning fashion shot as if it's from an award-winning fashion editorial. Image 1 is the person (model). Image 2 is the garment (clothing). Action: Dress the model in Input 1 with the garment from Input 2. Face Consistency: Keep the person's facial features EXACTLY the same as Input 1. Expression: Change their expression to look excited and surprised. Style: Add nuance and variety to convey a professional design touch."

Pose Variations:
"Regenerate this image with the person in a new pose: [Pose Description]. Keep the person's identity consistent. Keep the CURRENT OUTFIT they are wearing in this image. Do not change the clothes."

Stylistic Remixes:
"Apply a stylistic remix to this fashion image. Remix Instruction: [Remix Prompt]. IDENTITY PRESERVATION: Keep the person's face and body features identical. CLOTHING PRESERVATION: Do not change the existing clothing items unless specifically asked to add an accessory."`;

// Helper to clean base64 string
const cleanBase64 = (data: string) => {
  return data.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
};

// Convert Blob/File to Base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const generateModelImage = async (userImageBase64: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(userImageBase64),
            },
          },
          {
            text: `Face Consistency: Keep the person’s facial features exactly the same as the upload person, but change their expression to look excited. Change their pose to a standing model pose. Return ONLY the generated image.`
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated.");
  } catch (error) {
    console.error("Gemini Generate Model Error:", error);
    throw error;
  }
};

export const generateVirtualTryOnImage = async (currentModelBase64: string, garmentBase64: string, category: 'top' | 'bottom' | 'general' = 'general'): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(currentModelBase64),
            },
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(garmentBase64),
            },
          },
          {
            text: `Virtual Try-On (General):
"Create a stunning fashion shot as if it's from an award-winning fashion editorial. Image 1 is the person (model). Image 2 is the garment (clothing). Action: Dress the model in Input 1 with the garment from Input 2. Face Consistency: Keep the person's facial features EXACTLY the same as Input 1. Expression: Change their expression to look excited and surprised. Style: Add nuance and variety to convey a professional design touch."
Return ONLY the generated image.`
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No try-on image generated.");
  } catch (error) {
    console.error("Gemini Try-On Error:", error);
    throw error;
  }
};

export const generatePoseVariation = async (currentModelBase64: string, poseDescription: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(currentModelBase64),
            },
          },
          {
            text: `Pose Variations:
"Regenerate this image with the person in a new pose: ${poseDescription}. Keep the person's identity consistent. Keep the CURRENT OUTFIT they are wearing in this image. Do not change the clothes."
Return ONLY the generated image.`
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No pose variation generated.");
  } catch (error) {
    console.error("Gemini Pose Error:", error);
    throw error;
  }
};

export const generateRemix = async (currentModelBase64: string, remixPrompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(currentModelBase64),
            },
          },
          {
            text: `Stylistic Remixes:
"Apply a stylistic remix to this fashion image. Remix Instruction: ${remixPrompt}. IDENTITY PRESERVATION: Keep the person's face and body features identical. CLOTHING PRESERVATION: Do not change the existing clothing items unless specifically asked to add an accessory."
Return ONLY the generated image.`
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No remix image generated.");
  } catch (error) {
    console.error("Gemini Remix Error:", error);
    throw error;
  }
};