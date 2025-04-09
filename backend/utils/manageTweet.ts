import { TwitterApi } from "twitter-api-v2";

const twitterClient = new TwitterApi({
  appKey: process.env.X_APP_KEY,
  appSecret: process.env.X_APP_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

export const tweetContent = async (tweetText: any, mediaPath: string) => {
  try {
    const mediaId = await twitterClient.v1.uploadMedia(mediaPath);
    const tweetResponse = await twitterClient.v2.tweet({
      text: tweetText,
      media: {
        media_ids: [mediaId],
      },
    });
    return tweetResponse;
  } catch (error) {
    console.error("Error posting tweet:", error);
    throw error;
  }
};

export const fetchRecentTweets = async () => {
  try {
    if (!process.env.X_USER_ID) {
      throw new Error("Environment variable X_USER_ID is not defined");
    }
    const tweets = await twitterClient.v2.userTimeline(process.env.X_USER_ID, {
      max_results: 3,
      "tweet.fields": "public_metrics",
    });

    return tweets.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return error;
  }
};
