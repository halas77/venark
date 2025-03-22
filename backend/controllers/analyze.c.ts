import { Request, Response } from "express";
import { fetchRecentTweets } from "../utils/manageTweet";
import { analyzeTweets } from "../agents/analyzerAgent";

export const anaylzeController = async (req: Request, res: Response) => {
  const tweets = await fetchRecentTweets();
  const response = await analyzeTweets(tweets);
  res.json({ message: response });
};
