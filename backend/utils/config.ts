import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const agentModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.8,
  model: "gemini-2.0-flash",
});

const agentTools = [
  new TavilySearchResults({
    apiKey: process.env.TAVILY_API_KEY,
    maxResults: 3,
  }),
];

const agentCheckpointer = new MemorySaver();

export const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointer: agentCheckpointer,
});
