import { TwitterApi } from "twitter-api-v2";

const twitterClient = new TwitterApi({
  appKey: process.env.X_APP_KEY,
  appSecret: process.env.X_APP_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});


export const tweetContent = async (tweetText: any) => {
  try {
    const tweetResponse = await twitterClient.v2.tweet(
      tweetText);
    return tweetResponse;
  } catch (error) {
    console.error("Error posting tweet:", error);
    throw error;
  }
};
