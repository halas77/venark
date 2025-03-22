import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const agentModel = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyDvIt9oaY0jtJgcc2OnUsBf0eNRDAAAJ8k",
  temperature: 0.8,
  model: "gemini-2.0-flash",
});

const agentTools = [
  new TavilySearchResults({
    apiKey: "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",
    maxResults: 3,
  }),
];

const agentCheckpointer = new MemorySaver();

export const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointer: agentCheckpointer,
});
