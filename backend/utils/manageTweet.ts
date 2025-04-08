import { TwitterApi } from "twitter-api-v2";

const twitterClient = new TwitterApi({
  appKey: "bR6PdBPj0SI5ZlbQcpfZYd1ho",
  appSecret: "7xvb3YzFL6yv3rMgIXeTNIhybhqN0qqPuhzYi2zciTfPvwqYWm",
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
    const tweets = await twitterClient.v2.userTimeline("1898359240709840896", {
      max_results: 3,
      "tweet.fields": "public_metrics",
    });

    return tweets.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return error;
  }
};
