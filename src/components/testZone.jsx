import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarTwo from "./NavbarTwo";
import Lamp from "../images/lamp.png";
import { motion } from "framer-motion";
import fetchAllTests from "../utils/fetchAllTests";
import Reveal from "../components/Reveal";
import Slogo from "../images/Slogo.png";

const TestZone = () => {
  const [isLampOn, setIsLampOn] = useState(false);
  const [isPulled, setIsPulled] = useState(false);
  const [tests, setTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLampToggle = () => {
    setIsPulled(true);
    setTimeout(() => {
      setIsLampOn((prev) => !prev);
      setIsPulled(false);
    }, 300);
  };

  const handleStartTest = (subject) => {
    navigate(`/test/${subject}`);
  };

  useEffect(() => {
    const loadTests = async () => {
      const data = await fetchAllTests();
      setTests(data);
    };
    loadTests();
  }, []);

  const filteredTests = tests.filter((test) =>
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D1F21] via-[#939596] to-[#A89E8F] text-white font-sans">
      <NavbarTwo />
      <Reveal>
        {/* Lamp Section */}
        <section className="flex flex-col items-center justify-center px-4 py-20 relative">
          <div className="w-full flex justify-center items-center text-center px-8 py-24">
            <p className="text-4xl md:text-6xl font-bold text-[#e0e0e0] max-w-8xl leading-tight">
              Welcome to Skillify Test Zone – Illuminate your learning with
              tests tailored for interviews, coding, and aptitude skills. Pull
              the rope to switch on the lamp and light up your path!
            </p>
          </div>
        </section>

        {/* Test Cards */}
        <section className="px-6 md:px-12 py-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-[#2c2c36]">
              Available Tests
            </h2>
            <input
              type="text"
              placeholder="Search test..."
              className="bg-[#e0e0e0] text-black p-2 px-4 rounded-full focus:outline-none border border-gray-400 w-full sm:w-60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredTests.map((test) => (
              <div
                key={test._id}
                className="bg-[#1E1F22] bg-opacity-10 backdrop-blur-md text-white p-6 rounded-xl shadow-lg border border-[#1E1F22] border-opacity-20 transition hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold mb-2 text-[#65BDBA]">
                  {test.title}
                </h3>
                <p className="text-sm text-gray-300 mb-2">{test.description}</p>
                <p className="text-sm text-gray-400 mb-4">
                  Duration: {test.duration || "30 mins"}
                </p>
                <button
                  onClick={() => handleStartTest(test.subject)}
                  className="mt-2 bg-[#65BDBA] text-white py-2 px-4 rounded hover:bg-[#86d2d0] transition"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
      <img
        src={Slogo}
        alt="Skillify Logo"
        className="fixed top-[20%] left-[30%] opacity-20 z-0 w-[60%] max-w-[600px] pointer-events-none"
      />
    </div>
  );
};

export default TestZone;
