import { Request, Response } from "express";
import { generateContent } from "../agents/creatorAgent";
import { generateMeme } from "../agents/memeGeneratorAgent";
import { tweetContent } from "../utils/manageTweet";
import { fetchFromIPFS, uploadToIPFS } from "../utils/manageIPFS";
import { sendToContract } from "../utils/sendToContract";

interface CompanyData {
  tweets: any[];
  memes: any[];
}

export const creativeController = async (req: Request, res: Response) => {
  try {
    const { previousIpfsHash, companyDesc, companyLink, companyName, account } =
      req.body;

    // Generate content
    const generatedContent = await generateContent(
      companyDesc,
      companyLink,
      companyName
    );
    const formattedGeneratedContent = JSON.stringify(generatedContent);

    // Generate Meme
    const memeResponse = await generateMeme(formattedGeneratedContent);

    // Post Tweet
    await tweetContent(generatedContent, memeResponse);

    // Upload to IPFS
    let storedData: { [key: string]: CompanyData } = {};
    let updatedData;

    if (previousIpfsHash) {
      storedData = await fetchFromIPFS(previousIpfsHash);
    }

    if (storedData && storedData[companyName]) {
      storedData[companyName].tweets.push(formattedGeneratedContent);
      storedData[companyName].memes.push(memeResponse);
      updatedData = storedData;
    } else {
      updatedData = {
        ...storedData,
        account: account,
        [companyName]: {
          tweets: [formattedGeneratedContent],
          memes: [memeResponse],
        },
      };
    }

    // Upload updated data to IPFS
    const newIpfsHash = await uploadToIPFS(updatedData);
    await sendToContract(companyName, newIpfsHash);

    res.json({
      message: formattedGeneratedContent,
      meme: memeResponse,
      hash: newIpfsHash,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
