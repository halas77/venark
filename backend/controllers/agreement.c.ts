import { Request, Response } from "express";
import { uploadToIPFS } from "../utils/manageIPFS";
import { sendToContract } from "../utils/sendToContract";

export const createAgreementController = async (
  req: Request,
  res: Response
) => {
  try {
    const { companyDesc, companyLink, companyName, account } = req.body;

    const formattedData = {
      account: account,
      [companyName]: {
        name: companyName,
        desc: companyDesc,
        link: companyLink,
        tweets: [],
        memes: [],
      },
    };

    const newIpfsHash = await uploadToIPFS(formattedData);
    const receipt = await sendToContract(companyName, newIpfsHash);

    res.json({ message: newIpfsHash, receipt: receipt });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "Failed to process the request" });
  }
};
