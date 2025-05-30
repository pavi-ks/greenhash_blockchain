require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // For environment variables

const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL || "http://ganache:8545";
// It's good practice to use environment variables for private keys, 
// but Hardhat can use default accounts from Ganache if no private key is provided.
// const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY || ""; 

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "ganache_local", // Can be overridden by --network flag
  networks: {
    ganache_local: {
      url: GANACHE_RPC_URL,
      // accounts: GANACHE_PRIVATE_KEY ? [GANACHE_PRIVATE_KEY] : [], // Or let Hardhat use default Ganache accounts
    },
    // You can add other networks like sepolia, mainnet here
    // localhost: { // Often used for a local hardhat node `npx hardhat node`
    //   url: "http://127.0.0.1:8545",
    // },
  },
  paths: {
    sources: "./contracts",    // Directory where .sol files are
    tests: "./test",           // Directory for test files
    cache: "./cache",          // Hardhat cache directory
    artifacts: "./artifacts"   // Directory for compiled contract artifacts (ABIs, bytecode)
  },
};
