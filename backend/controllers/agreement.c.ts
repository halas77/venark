import { Request, Response } from "express";
import { uploadToIPFS } from "../utils/manageIPFS";
import { sendToContract } from "../utils/sendToContract";

export const createAgreementController = async (
  req: Request,
  res: Response
) => {
  console.log("working here ....");

  try {
    const {
      companyDesc,
      companyURL,
      companyName,
      account,
      amount,
      milestones,
    } = req.body;

    const formattedData = {
      account: account,
      [companyName]: {
        name: companyName,
        desc: companyDesc,
        link: companyURL,
        amount: amount,
        milestones: milestones,
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
