import { ethers } from "ethers";
import { AgreemntABI } from "./AgreementFactory";

// AgreementFactory
export const AGREEMENT_FACTORY_CONTARCT_ADDRESS =
  "0xE0Ba419C4a1BCc4897CFA10135E5964779B072B7";
export const AGREEMENT_FACTORY_CONTRACT_ABI = AgreemntABI.abi;

const privateKey =
  "a3a7627290558fcdf6777182a0f925af43841e8d2a7d7a108b5176451aabc590";

const providerUrl = "https://base-sepolia-rpc.publicnode.com";

const functionName = "setIPFSHash";

export async function sendToContract(companyName: string, newIpfsHash: string) {
  try {
    // Initialize provider and wallet
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    // Connect to the contract
    const contract = new ethers.Contract(
      AGREEMENT_FACTORY_CONTARCT_ADDRESS,
      AGREEMENT_FACTORY_CONTRACT_ABI,
      wallet
    );

    // Send the transaction
    const tx = await contract[functionName](companyName, newIpfsHash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.error("Error sending to contract:", error);
    throw error;
  }
}
