import { Request, Response } from "express";
import { generateText } from "../agents/openai";

export const opneaiController = (req: Request, res: Response) => {
  const aiRes = generateText();

  res.json({ message: aiRes });
};
