// scripts/deploy.js
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  // Get the deployer (signer)
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the balance of the deployer (optional, for info)
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Define the initial prediction fee from environment variable or use a default
  // Defaulting to 0.001 Ether. Ensure this is handled as a string for parseEther.
  const initialFeeInEther = process.env.INITIAL_PREDICTION_FEE || "0.001";
  const initialFeeInWei = hre.ethers.parseEther(initialFeeInEther);
  console.log(`Initial prediction fee set to: ${initialFeeInEther} ETH (${initialFeeInWei.toString()} Wei)`);

  // Get the Contract Factory for GreenHashData
  const GreenHashData = await hre.ethers.getContractFactory("GreenHashData");

  // Deploy the contract with the initial fee
  console.log("Deploying GreenHashData contract...");
  const greenHashData = await GreenHashData.deploy(initialFeeInWei);

  // Wait for the deployment to be confirmed
  await greenHashData.waitForDeployment();
  const contractAddress = await greenHashData.getAddress();
  console.log("GreenHashData contract deployed to:", contractAddress);

  // Save the contract address and ABI to a file for other services to use
  const artifactsPath = path.join(hre.config.paths.artifacts, "contracts", "GreenHashData.sol", "GreenHashData.json");
  const abi = JSON.parse(fs.readFileSync(artifactsPath, "utf8")).abi;

  const deploymentInfo = {
    address: contractAddress,
    abi: abi,
    network: hre.network.name,
    timestamp: new Date().toISOString()
  };

  // Define the path for the shared deployment information
  const sharedConfigDir = path.join(__dirname, "..", "shared_config"); // Points to root/shared_config
  if (!fs.existsSync(sharedConfigDir)) {
    fs.mkdirSync(sharedConfigDir, { recursive: true });
  }
  const deploymentInfoPath = path.join(sharedConfigDir, "deployed_contract_info.json");

  fs.writeFileSync(
    deploymentInfoPath,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`Contract address and ABI saved to ${deploymentInfoPath}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
