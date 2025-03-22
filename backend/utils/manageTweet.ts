import { TwitterApi } from "twitter-api-v2";

const twitterClient = new TwitterApi({
  appKey: "bR6PdBPj0SI5ZlbQcpfZYd1ho",
  appSecret: "7xvb3YzFL6yv3rMgIXeTNIhybhqN0qqPuhzYi2zciTfPvwqYWm",
  accessToken: "1898359240709840896-QCruicQDqJrRYcKodVAblK7rE9gF2t",
  accessSecret: "dYLd5w32u0Bh3BnrHSBn3sqo2hCbplwy769XCb1MtAVgG",
});

export const tweetContent = async (tweetText: any) => {
  try {
    const tweetResponse = await twitterClient.v2.tweet(tweetText);
    return tweetResponse;
  } catch (error) {
    console.error("Error posting tweet:", error);
    throw error;
  }
};

export const fetchRecentTweets = async () => {
  try {
    const tweets = await twitterClient.v2.userTimeline("1898359240709840896", {
      max_results: 5,
      "tweet.fields": "public_metrics",
    });

    return tweets.data;
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return error;
  }
};
