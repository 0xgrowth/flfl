import React, { useState } from "react";
import axios from "axios";

function Second() {
  const [pdfFile, setPdfFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [fname, setFname] = useState(null);

  // Basically, I wanted to display the name of the pdf after it was selected,
  // defining fname = e.target.files[0].name directly in handlefilechange function gives an error of "fname is undefined"
  // when used in the div element, so,
  // I used useState, define fname globally for storing the pdf name and setFname for defining it 
  // after the function is triggered.
  //fname is initially set to null, then changed in the handlefileChange function to e.target.files[0].name using setFname
  // A good practice for understanding useState

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const f = e.target.files[0].name
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setFname(f);
      console.log(f);
    } else {
      alert("Please upload a valid PDF.");
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setResult(res.data);
    } catch (err) {
      alert("Failed to upload PDF");
    }

    setLoading(false);
  };

  const handleGenerate = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/generate-questions/${result.pdfId}`
      );
      setQuestions(res.data.questions); // or display it on screen
    } catch (err) {
      alert("Failed to generate questions.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h1 className="text-xl font-bold mb-4">Upload and Read PDF</h1>
        <div className="mb-2">
          <label className="flex flex row bg-gray-200 p-4 rounded cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            /></svg>
            <div>Upload</div>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="text-center">{fname}</div>
          </label>
        </div>
        <button
          onClick={handleUpload}
          disabled={!pdfFile || loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Uploading..." : "Upload & Extract"}
        </button>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded text-sm">
            <p>
              <strong>Page count:</strong> {result.numpages}
            </p>
            <p>
              <strong>Preview text:</strong>
            </p>
            <pre className="whitespace-pre-wrap">{result.text}</pre>
            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              Generate Questions
            </button>
          </div>
        )}
      </div>
      {questions.length > 0 && (
        <div className="mt-4">
          <h2 className="font-semibold mb-2">Generated Questions:</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {questions.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Second;
