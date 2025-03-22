import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { HumanMessage } from "@langchain/core/messages";
import { agent } from "../utils/config";
import { analyzeTweets } from "./analyzerAgent";

export const getTrendingTopics = async () => {
  const search = new TavilySearchResults({
    apiKey: process.env.TAVILY_API_KEY,
    maxResults: 3,
  });
  const result = await search.invoke(
    "Latest twitter trends for marketing in twitter platform"
  );

  return result.length > 0 ? result : "No trends found.";
};

export const generateContent = async (
  companyDesc: string,
  companyLink: string,
  companyName: string,
  feedback?: any
) => {
  const trends = await getTrendingTopics();
  const response = await agent.invoke(
    {
      messages: [
        new HumanMessage(
          `Generate 1 high-quality, engaging Twitter post for the following marketing campaign,If there is any feed back here generate a better tweet based on feedback
          
          Feedback: ${feedback}

          Company Name: ${companyName}  
          Company Website: ${companyLink}  
          Description: ${companyDesc}  

          Incorporate the latest social media trends: ${trends}.  

          The post should be concise, creative, optimized for engagement and must have a website link at the bottom.

          Return only the final tweet text, with no explanations or introductions.`
        ),
      ],
    },
    { configurable: { thread_id: "42" } }
  );

  return response.messages[response.messages.length - 1].content;
};
