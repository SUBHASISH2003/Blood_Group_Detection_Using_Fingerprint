import React from "react";
import { CheckCircle2, AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { useLocation, Link, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  const payload = state?.payload;
  const navigate = useNavigate();

  // Extract values safely
  const name = payload?.name || "Unknown";
  const age = payload?.age || "N/A";
  const file = payload?.file;
  const prediction = payload?.result; // { label, confidence }

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

      {/* Result Card */}
      <div className="relative z-10 w-full max-w-lg p-8 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-700 shadow-2xl text-center">
        {prediction ? (
          <>
            <CheckCircle2 className="w-14 h-14 mx-auto text-green-400 mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-white">
              Prediction Complete
            </h1>

            {/* User Info */}
            <div className="space-y-2 text-gray-300 mb-4">
              <p><span className="font-semibold text-white">Name:</span> {name}</p>
              <p><span className="font-semibold text-white">Age:</span> {age}</p>
            </div>

            {/* Prediction Result */}
            <h2 className="text-xl font-semibold text-orange-400">
              Blood Group: {prediction.label}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Confidence: {(prediction.confidence * 100).toFixed(2)}%
            </p>

            {/* Confidence Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 mt-3">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full"
                style={{ width: `${(prediction.confidence * 100).toFixed(2)}%` }}
              ></div>
            </div>

            {/* Uploaded Image */}
            {file && (
              <div className="mt-6 flex justify-center">
                <img
                  src={`http://localhost:5000/uploads/${file}`}
                  alt="Fingerprint"
                  className="w-40 h-40 object-contain rounded-xl border border-gray-600 shadow-lg"
                />
              </div>
            )}
          </>
        ) : (
          <>
            <AlertTriangle className="w-14 h-14 mx-auto text-red-400 mb-4" />
            <p className="text-red-400 font-semibold">
              ⚠️ No prediction found. Please try again.
            </p>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 py-2 px-5 rounded-lg text-white font-semibold hover:scale-105 transition"
          >
            <RefreshCcw className="w-5 h-5" /> Try Again
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 py-2 px-5 rounded-lg text-white font-semibold transition"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 w-full text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} BioPrint • All Rights Reserved
      </footer>
    </div>
  );
}
