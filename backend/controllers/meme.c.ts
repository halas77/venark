import { HfInference } from "@huggingface/inference";
import * as fs from "fs"; // ✅ Fix for fs

const hfInference = new HfInference("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");

export const generateMeme = async (prompt: string): Promise<string> => {
  const response = await hfInference.textToImage({
    model: "stabilityai/stable-diffusion-xl-base-1.0",
    inputs: `Viral meme format about: ${prompt}. Trending on ${new Date().getFullYear()} internet culture, Green, high quality`,
  });

  const buffer = await response.arrayBuffer();
  const filePath = `public/meme-${Date.now()}.png`;
  fs.writeFileSync(filePath, Buffer.from(buffer));
  return URL.createObjectURL(response);
};
