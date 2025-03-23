import { Request, Response } from "express";
import { generateContent } from "../agents/creatorAgent";
import { generateMeme } from "./meme.c";
import { tweetContent } from "../utils/manageTweet";

export const creativeController = async (req: Request, res: Response) => {
  const { companyDesc, companyLink, companyName } = req.body;
  const result = await generateContent(companyDesc, companyLink, companyName);

  const resultString = JSON.stringify(result);
  const response = await generateMeme(resultString);
  const tweetResponse = await tweetContent(result);
  res.json({ message: tweetResponse, meme: response });
};
