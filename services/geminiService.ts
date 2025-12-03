import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getPlantCareAdvice = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "Connection error. Please check API Key configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are "Cloud Master", a hip, knowledgeable, and responsible vape expert for "Neon Clouds Vape". 
      The user is asking: "${query}". 
      
      Guidelines:
      1. Be cool, energetic, and concise (under 80 words).
      2. Use emojis like 💨, ⚡, 🔋.
      3. Recommend flavors or device types based on their question.
      4. If they ask about quitting smoking, be supportive but compliant (mention vaping is an alternative).
      5. Strictly NO sales to minors advice.
      `,
    });
    return response.text || "Just keep vaping! 💨";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My circuits are a bit foggy. Ask me again in a sec! ⚡";
  }
};

export const generateEditedImage = async (imageBase64: string, prompt: string): Promise<string | null> => {
  if (!apiKey) {
    console.error("API Key missing");
    return null;
  }

  try {
    // The model requires the base64 string without the data URI prefix (e.g., "data:image/png;base64,")
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png', // Assuming PNG or standard format
              data: cleanBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Iterate through parts to find the image
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};