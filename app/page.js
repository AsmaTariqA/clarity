"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [terminalText, setTerminalText] = useState("");
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const commands = [
    "initializing career_advisor.exe...",
    "loading ai_models.neural_net...",
    "scanning career_opportunities.db...",
    "ready for decision_analysis.run()",
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e) => {
      if (!isMobile) setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

 useEffect(() => {
  const interval = setInterval(() => {
    setCurrentCommand((prev) => {
      const nextIndex = (prev + 1) % commands.length;
      setTerminalText(commands[nextIndex]); 
      return nextIndex;
    });
  }, 2000);

  return () => clearInterval(interval);
}, [commands]); 


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1D] via-[#3B1C32] to-[#6A1E55] text-white font-mono relative overflow-hidden">
      {/* Background Grid (desktop only) */}
      {!isMobile && (
        <div
          className="fixed inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #A64D79 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      )}

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(isMobile ? 12 : 28)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background:
                i % 3 === 0
                  ? "#A64D79"
                  : i % 3 === 1
                  ? "#6A1E55"
                  : "#3B1C32",
              animationDuration: `${Math.random() * 4 + 2}s`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Top Navbar */}
      <header className="relative z-20 p-3 sm:p-4 md:p-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          {/* App Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
            <span className="text-[#A64D79] ml-2 sm:ml-4 font-semibold text-xs sm:text-sm md:text-base">
              career_advisor.exe
            </span>
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/AsmaTariqA"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-[#A64D79] transition-all duration-300 text-xs sm:text-sm border border-white/20 px-2 sm:px-3 py-1 rounded-lg hover:bg-white/10 self-start sm:self-auto"
          >
            github/AsmaTariqA
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col justify-center items-center min-h-[calc(100vh-100px)] px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
        <div className="text-center max-w-6xl w-full">
          {/* Terminal Window */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-10 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500/80 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500/80 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500/80 rounded-full"></div>
              <span className="ml-2 sm:ml-4 text-white/70 text-xs sm:text-sm">
                terminal_v2.1.0
              </span>
            </div>

            {/* Terminal Command */}
            <div className="text-left mb-6 sm:mb-8">
              <div className="text-xs sm:text-sm text-white/50 mb-2 overflow-hidden">
                <span className="text-[#A64D79]">user@career-system</span>
                <span className="text-white/30">:~$ </span>
                <span className="animate-pulse break-all">{terminalText}</span>
                <span className="animate-pulse text-[#A64D79] ml-1">|</span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#A64D79] via-white to-[#6A1E55] bg-clip-text text-transparent">
                AI Career
              </span>
              <br />
              <span className="text-white/90">Navigator</span>
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-white/70 mb-6 sm:mb-8 max-w-md sm:max-w-xl md:max-w-2xl mx-auto font-light leading-relaxed px-2 sm:px-0">
              Warning: May cause overconfidence in decisions.
              <br className="hidden sm:block" />
             
              Make smarter career moves with AI guidance.
            </p>

            {/* CTA Button */}
            <Link href="/decision">
              <button className="group relative w-full sm:w-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-[#A64D79]/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6A1E55]/20 to-[#A64D79]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  initialize_session()
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#A64D79] rounded-full animate-ping"></div>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Cursor Glow (desktop only) */}
      {!isMobile && (
        <div
          className="fixed pointer-events-none z-30 w-24 sm:w-32 h-24 sm:h-32 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, #A64D79 0%, transparent 70%)`,
            left: mousePos.x - (isMobile ? 48 : 64),
            top: mousePos.y - (isMobile ? 48 : 64),
            transition: "all 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
}
