import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const agentTools = [
  new TavilySearchResults({
    apiKey: "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",
    maxResults: 3,
  }),
];

const agentModel = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyDvIt9oaY0jtJgcc2OnUsBf0eNRDAAAJ8k",
  temperature: 0.8,
  model: "gemini-2.0-flash",
});

const agentCheckpointer = new MemorySaver();
const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointer: agentCheckpointer,
});

const getTrendingTopics = async () => {
  const search = new TavilySearchResults({
    apiKey: "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",
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
  companyName: string
) => {
  const trends = await getTrendingTopics();

  const response = await agent.invoke(
    {
      messages: [
        new HumanMessage(
          `Generate 1 high-quality, engaging Twitter post for the following marketing campaign.

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
