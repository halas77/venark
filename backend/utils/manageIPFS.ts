import axios from "axios";

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
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      }
    );

    return pinataResponse.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Failed to upload to IPFS");
  }
};
