// src/components/UploadSensorData.jsx
import React, { useState } from "react";
import { getContract } from "../utils/ethers";

const UploadSensorData = () => {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/json") {
      setFile(selected);
      setStatus("");
    } else {
      alert("Please select a JSON file.");
    }
  };

  const handleUpload = async () => {
    try {
      setStatus("Uploading to IPFS...");

      const content = await file.text();
      const jsonData = JSON.parse(content);

      const response = await fetch("http://localhost:8000/upload_to_ipfs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      if (!result.IpfsHash) throw new Error("Upload failed");
      setCid(result.IpfsHash);
      setStatus("📦 Uploaded! CID: " + result.IpfsHash);

      const contract = await getContract();
      const tx = await contract.uploadCID(result.IpfsHash);
      await tx.wait();

      setStatus((prev) => prev + "\n✅ CID stored on blockchain!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold text-green-800 mb-4">📤 Upload Sensor Data to IPFS</h2>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        disabled={!file}
      >
        Upload & Record CID
      </button>
      {status && <p className="mt-4 text-sm text-slate-700 whitespace-pre-line">{status}</p>}
    </div>
  );
};

export default UploadSensorData;
