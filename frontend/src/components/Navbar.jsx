import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { connectWallet } from "../utils/ethers";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Advisory", path: "/advisory" },
    { name: "History", path: "/History" },
    { name: "About", path: "/about" },
  ];

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }

        window.ethereum.on("accountsChanged", (accounts) => {
          setWalletAddress(accounts[0] || "");
        });
      }
    };

    checkConnection();
  }, []);

  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (err) {
      alert("⚠️ Wallet connection failed. Please ensure MetaMask is installed and unlocked.");
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-green-600 text-white shadow-md fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide hover:text-green-200">
            GreenHash 🌿
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-6 text-lg">
            {navLinks.map((link, i) => (
              <Link key={i} to={link.path} className="hover:text-green-200 transition">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Wallet Button */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={handleConnectWallet}
              className={`px-4 py-1 rounded transition ${
                walletAddress ? "bg-green-700 text-white" : "bg-emerald-500 text-white hover:bg-emerald-600"
              }`}
            >
              {walletAddress ? "Connected" : "Connect Wallet"}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl">
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4 px-2 bg-green-700 text-white">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded hover:bg-green-800"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={handleConnectWallet}
              className="bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-600 transition w-full"
            >
              {walletAddress ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
