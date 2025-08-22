import React from "react";
import Slogo from "../images/Slogo.png";
import Reveal from "./Reveal";

const Setting = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D1F21] via-[#939596] to-[#A89E8F] text-[#DCD0B4] px-6 py-10 font-sans">
      <Reveal>
        <div className="max-w-3xl mx-auto bg-[#2C2F36] shadow-lg rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-[#65BDBA] mb-8">Settings</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-[#DCD0B4]">
                Dark Mode
              </span>
              <button className="bg-[#65BDBA] hover:bg-[#86d2d0] text-black px-5 py-2 rounded-lg font-semibold">
                Toggle
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-[#DCD0B4]">
                Notifications
              </span>
              <button className="bg-[#65BDBA] hover:bg-[#86d2d0] text-black px-5 py-2 rounded-lg font-semibold">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-[#DCD0B4]">
                Change Password
              </span>
              <button className="bg-[#65BDBA] hover:bg-[#86d2d0] text-black px-5 py-2 rounded-lg font-semibold">
                Update
              </button>
            </div>
          </div>
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

export default Setting;
