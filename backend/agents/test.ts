// src/agents/creative.ts
import { HuggingFaceInference } from "@langchain/community/llms/hf";
import { PromptTemplate } from "@langchain/core/prompts";

const hf = new HuggingFaceInference({
  model: "HuggingFaceH4/zephyr-7b-beta",
  apiKey: "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",
});

// Ad copy generation chain
const prompt = PromptTemplate.fromTemplate(`
Generate 3 viral ad variants for {product} targeting {audience}.
Focus on {platform} platform trends. Use emojis and hashtags.
`);

const chain = prompt.pipe(hf);

export async function generateAdCopies(campaignBrief: {
  product: string;
  audience: string;
  platform: "twitter" | "tiktok";
}): Promise<string[]> {

  const response = await chain.invoke({
    product: campaignBrief.product,
    audience: campaignBrief.audience,
    platform: campaignBrief.platform,
  });


  // Parse response into 3 variants
  return response
    .split("\n")
    .filter((v) => v.trim().length > 0)
    .slice(0, 3);
}
