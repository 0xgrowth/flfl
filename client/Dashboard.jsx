import React, { useState } from "react";

function Dashboard() {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload a PDF</h1>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-600"
        />
        {pdfFile && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <p><strong>File:</strong> {pdfFile.name}</p>
            <p><strong>Size:</strong> {(pdfFile.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;