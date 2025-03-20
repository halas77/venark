import sharp from "sharp";
import axios from "axios";
import { Request, Response } from "express";
import { generateMeme } from "../agents/meme";

export const memeController = async (req: Request, res: Response) => {
  try {
    const { imageUrl, topText, bottomText } = req.body;
    console.log("req.body", req.body);
    const meme = await generateMeme(imageUrl, topText, bottomText);
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(meme, "base64"));
  } catch (error) {
    res.status(500).json({ error: "Failed to generate meme" });
  }
};
