import { Link } from "react-router-dom";
import { ChevronRight, Fingerprint, Zap, Shield, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Navbar */}
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-5 z-20">
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          BioPrint
        </h2>
        <nav className="space-x-6 text-gray-300 text-sm font-medium">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <Link to="/upload" className="hover:text-white transition">
            Upload
          </Link>
        </nav>
      </header>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-zinc-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-10 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-4xl w-full text-center">
          {/* Hero Section */}
          <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl mb-8 shadow-2xl">
              <Fingerprint className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
              BioPrint
              <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Blood Group Prediction
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered technology that analyzes your unique
              fingerprint patterns to predict your blood group with incredible
              accuracy.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Get results in seconds" },
              { icon: Shield, title: "99% Accurate", desc: "Advanced AI algorithms" },
              { icon: Sparkles, title: "Cutting Edge", desc: "Latest biometric tech" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:bg-gray-800/70"
              >
                <feature.icon className="w-10 h-10 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="space-y-6">
            <Link
              to="/upload"
              className="group relative inline-flex items-center justify-center px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-red-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                Start Your Analysis
                <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <p className="text-gray-400 text-sm">
              No registration required • Completely secure • Instant results
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-1 left-0 w-full text-center text-gray-500 text-xs z-10">
        © {new Date().getFullYear()} BioPrint • All Rights Reserved
      </footer>
    </div>
  );
}
