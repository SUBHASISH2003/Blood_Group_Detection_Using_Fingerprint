import React, { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { uploadPrediction } from "../services/predictionService";


export default function UploadPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    setFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !age) {
      toast.error("Please fill all fields and upload a fingerprint!");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setLoading(true);
    toast.loading("Uploading & predicting...", { id: "pred" });
      try {
      const res = await uploadPrediction({ name, age, file });
      toast.dismiss("pred");

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Prediction complete!");
        navigate("/result", { state: { payload: res } });
      }
    } catch (err) {
      toast.dismiss("pred");
      toast.error(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setFile(null);
    setDragActive(false);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-20">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          BioPrint
        </h2>
        <nav className="space-x-6 text-gray-300">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/upload" className="hover:text-white transition">Upload</Link>
        </nav>
      </header>

      {/* Animated Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-orange-500/30 rounded-full blur-3xl animate-ping"></div>

      {/* Upload Card */}
      <div
        className={`relative z-10 w-full max-w-lg p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-700 shadow-2xl transition-all duration-300 ${
          shake ? "animate-[shake_0.3s_ease-in-out]" : ""
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Upload Fingerprint
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Age Input */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium mb-2 text-gray-300"
            >
              Age
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter your age"
              min="1"
              max="120"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500 outline-none"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* File Upload */}
          <div
            className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? "border-orange-500 bg-gray-800/50"
                : "border-gray-600 bg-gray-800/30"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center space-y-2 cursor-pointer"
            >
              <Upload className="w-10 h-10 text-orange-400" />
              <p className="text-gray-300">
                {file ? file.name : "Drag & Drop or Click to Upload"}
              </p>
            </label>
          </div>

          {/* File Preview */}
          {file && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(file)}
                alt="Fingerprint Preview"
                className="w-40 h-40 object-contain rounded-xl border border-gray-600 shadow-lg"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 py-2 px-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 w-full text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} BioPrint • All Rights Reserved
      </footer>
    </div>
  );
}
