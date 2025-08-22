import React from "react";
import Slogo from "../images/Slogo.png";
import Reveal from "./Reveal";

const Skilicode = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1D1F21] via-[#939596] to-[#A89E8F] text-[#DCD0B4] px-6 font-sans relative z-10">
      <Reveal>
        <div className="w-full max-w-5xl bg-[#2C2F36] shadow-lg rounded-2xl px-10 py-16 text-center">
          <h2 className="text-4xl font-bold text-[#65BDBA] mb-6">
            🚧 Page Under Construction
          </h2>
          <p className="text-lg text-[#DCD0B4]">
            We’re working hard to bring this feature to you soon. Stay tuned! 💻
          </p>
        </div>
      </Reveal>

      <img
        src={Slogo}
        alt="Skillify Logo"
        className="fixed top-[20%] left-[30%] opacity-20 z-0 w-[60%] max-w-[600px] pointer-events-none"
      />
    </div>
  );
};

export default Skilicode;
