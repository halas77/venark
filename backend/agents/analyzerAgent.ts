import { HumanMessage } from "@langchain/core/messages";
import { agent } from "../utils/config";
import { getTrendingTopics } from "./creatorAgent";

export const analyzeTweets = async (tweets: any) => {
  const trends = await getTrendingTopics();

  const tweetTexts = tweets?.data
    .map(
      (tweet: any) =>
        `Tweet: "${tweet.text}" Engagement: ${JSON.stringify(
          tweet.public_metrics
        )}`
    )
    .join("\n");


  const response = await agent.invoke(
    {
      messages: [
        new HumanMessage(
        `
        Analyze the following tweets based on engagement (likes, retweets, replies).
        Suggest improvements for future tweets. Highlight better wording, call-to-actions, or trending topics to use.

        Tweets: ${tweetTexts}

        Incorporate the latest social media trends: ${trends}.  
      `
        ),
      ],
    },
    { configurable: { thread_id: "42" } }
  );

  return response.messages[response.messages.length - 1].content;
};
