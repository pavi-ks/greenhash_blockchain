// src/components/CIDUploader.jsx
import React, { useState } from "react";
import { getContract } from "../utils/ethers";

const PINATA_API_KEY = "PASTE_YOUR_KEY_HERE";
const PINATA_SECRET_API_KEY = "PASTE_YOUR_SECRET_HERE";

const CIDUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [cid, setCID] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    setStatus("📦 Uploading to IPFS...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${btoa(`${PINATA_API_KEY}:${PINATA_SECRET_API_KEY}`)}`,
        },
        body: formData
      });

      const data = await response.json();
      const ipfsHash = data.IpfsHash;
      setCID(ipfsHash);
      setStatus(`✅ CID: ${ipfsHash}`);

      const contract = await getContract();
      const tx = await contract.uploadCID(ipfsHash);
      await tx.wait();

      setStatus(`✅ CID uploaded to Blockchain: ${ipfsHash}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed: " + err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">🔗 Upload Sensor Data to IPFS</h2>
      <input
        type="file"
        accept=".json"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Upload and Save CID
      </button>
      {status && <div className="mt-4 text-sm text-slate-800">{status}</div>}
      {cid && <div className="text-xs text-blue-700 break-all mt-2">{cid}</div>}
    </div>
  );
};

export default CIDUploader;
