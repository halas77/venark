import { Request, Response } from "express";
import { generateContent } from "../agents/creativeAgent";
import { tweetContent } from "../agents/tweet";

export const creativeController = async (req: Request, res: Response) => {
  const { companyDesc, companyLink, companyName } = req.body;
  const result = await generateContent(companyDesc, companyLink, companyName);

  const tweetResponse = await tweetContent(result);
  res.json({ message: tweetResponse });
};
