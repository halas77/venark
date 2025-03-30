import { ethers } from "ethers";

const aiAgentWallet = ethers.Wallet.createRandom();
const provider = new ethers.JsonRpcProvider();
const wallet = new ethers.Wallet(aiAgentWallet.privateKey, provider);

export const getFromOnchain = async () => {
    
};

