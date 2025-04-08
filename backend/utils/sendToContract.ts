import { ethers } from "ethers";
import { AgreemntABI } from "./AgreementFactory";

// AgreementFactory
export const AGREEMENT_FACTORY_CONTARCT_ADDRESS =
  "0xE0Ba419C4a1BCc4897CFA10135E5964779B072B7";
export const AGREEMENT_FACTORY_CONTRACT_ABI = AgreemntABI.abi;

const providerUrl = "https://base-sepolia-rpc.publicnode.com";

const functionName = "setIPFSHash";

export async function sendToContract(companyName: string, newIpfsHash: string) {
  try {
    // Initialize provider and wallet
    const provider = new ethers.JsonRpcProvider(providerUrl);
    if (!process.env.PRIVATE_KEY) {
      throw new Error(
        "PRIVATE_KEY is not defined in the environment variables."
      );
    }
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

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
