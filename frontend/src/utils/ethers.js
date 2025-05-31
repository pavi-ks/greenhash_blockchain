import { ethers } from "ethers";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  
  const maxRetries = 10; // Maximum number of retry attempts
  const retryDelay = 1000; // Delay between retries in milliseconds

  let contractAddress = null;
  let abi = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch("/shared_config/deployed_contract_info.json");
      if (response.ok) {
        ({ address: contractAddress, abi } = await response.json());
        break; // Exit the loop if fetch is successful
      }
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed to fetch contract info:`, error);
    }
    await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait before retrying
  }

  if (!contractAddress || !abi) {
    throw new Error("Failed to fetch contract address or ABI after multiple retries.");
  }

  const provider = new ethers.BrowserProvider(window.ethereum); // Correct for ethers v6
  const signer = await provider.getSigner();                    // Must be awaited
  console.log('Contract instance created:', contractAddress, abi);
  return new ethers.Contract(contractAddress, abi, signer); // Contract runner fixed
};

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error("Install MetaMask");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
};