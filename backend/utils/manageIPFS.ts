import axios from "axios";

const PINATA_API_KEY = "630867093a919625554c";
const PINATA_SECRET_API_KEY =
  "86bab7c0d7b1f75c23a56a0f6c076fe455baf32811206907e2966398c27ba7a4";

/**
 * Fetch stored JSON from IPFS using its hash
 */
export const fetchFromIPFS = async (ipfsHash: string): Promise<any> => {
  try {
    const response = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data from IPFS:", error);
    return null;
  }
};

/**
 * Upload JSON data to IPFS using Pinata
 */
export const uploadToIPFS = async (data: any): Promise<string> => {
  try {
    const pinataResponse = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      {
        pinataContent: data,
        pinataMetadata: { name: "venark data" },
      },
      {
        headers: {
          "Content-Type": "application/json",
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );

    return pinataResponse.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Failed to upload to IPFS");
  }
};
