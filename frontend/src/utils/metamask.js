import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not found. Please install it.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balance);

    return {
      address,
      balance: balanceInEth,
      signer,
      provider,
    };
  } catch (err) {
    console.error("MetaMask connection failed", err);
    return null;
  }
}
