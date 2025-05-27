// src/utils/ethers.js
import { ethers } from "ethers";
import GreenHashABI from "../contracts/GreenHashABI.json";

const CONTRACT_ADDRESS = "0xCDd147Ca172C1E159E42ddd14b6dF82821370C08";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");

  const provider = new ethers.BrowserProvider(window.ethereum); // Correct for ethers v6
  const signer = await provider.getSigner();                    // Must be awaited
  return new ethers.Contract(CONTRACT_ADDRESS, GreenHashABI, signer); // Contract runner fixed
};

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("Install MetaMask");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
};

// const contract = await getContract();
// const user = await connectWallet();

// const activities = await contract.getUserActivities(user); // ✅ now this returns an array

// activities.forEach((a, i) => {
//   console.log(`Prediction #${i + 1}`);
//   console.log("Type:", a.predictionType);
//   console.log("CID:", a.ipfsCID);
//   console.log("Time:", new Date(Number(a.timestamp) * 1000).toLocaleString());
// });


// const data = await contract.getUserActivities(userAddress);
// console.log(data);