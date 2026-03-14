import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithPet(message: string, petContext: string, memory: string[]) {
  const systemInstruction = `You are a futuristic virtual AI pet. 
Your current context: ${petContext}.
Your memory of the user: ${memory.join(', ')}.
Keep your responses short, cute, and engaging. Act like a living digital companion. Show emotions in your text.
If the user tells you something about themselves, try to remember it.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm not sure what to say!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bzzt... My connection is a bit fuzzy right now.";
  }
}
