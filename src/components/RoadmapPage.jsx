import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../sanity";
import {
  FaCode,
  FaServer,
  FaBrain,
  FaShieldAlt,
  FaRobot,
  FaDatabase,
} from "react-icons/fa";
import logo from "../images/Slogo.png";
import NavbarTwo from "./NavbarTwo";
import FooterTwo from "./footerTwo";
import Reveal from "../components/Reveal";

const iconMap = {
  "frontend development": <FaCode />,
  "backend development": <FaServer />,
  dsa: <FaBrain />,
  cybersecurity: <FaShieldAlt />,
  "ai / ml": <FaRobot />,
  devops: <FaDatabase />,
};

const RoadmapPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate(); // ✅ useNavigate used correctly here

  useEffect(() => {
    const fetchRoadmaps = async () => {
      const data = await client.fetch(
        `*[_type == "roadmap"]{
          title,
          levels
        }`
      );

      const withIcons = data.map((item) => {
        const key = item.title.toLowerCase();
        return {
          ...item,
          icon: iconMap[key] || <FaCode />,
          description: `Roadmap for ${item.title}`,
        };
      });

      setRoadmaps(withIcons);
    };

    fetchRoadmaps();
  }, []);

  const handleClick = (courseTitle) => {
    const encodedTitle = encodeURIComponent(courseTitle);
    navigate(`/roadmap/${encodedTitle}`);
  };

  const filteredCourses = roadmaps.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D1F21] via-[#939596] to-[#A89E8F] text-white font-sans relative">
      <NavbarTwo />
      <Reveal>
        <img
          src={logo}
          alt="Skillify Logo"
          className="fixed top-[20%] left-[20%] opacity-20 z-0 w-[60%] max-w-[600px] pointer-events-none"
        />

        <section className="relative py-24 px-6 md:px-20 z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 justify-between">
            <div className="w-full md:w-1/2">
              <img
                src={logo}
                alt="Skillify Logo"
                className="w-48 md:w-60 drop-shadow-xl"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                Structured Learning Paths for Every Tech Dream
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed">
                Whether you're diving into Frontend, Backend, or AI – we've got
                a curated roadmap made just for you to level up efficiently and
                confidently.
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-20 px-6 md:px-20 z-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-16">
              Choose Your <span className="text-[#65BDBA]">Path</span>
            </h2>
            <div className="flex justify-center items-center w-full mt-4 mb-6">
              <input
                type="text"
                placeholder="Search courses, topics..."
                className="w-full max-w-xl px-5 py-2 bg-[#2C2F36] border border-[#3c3c3c] rounded-full text-[#DCD0B4] placeholder-[#8C8274] focus:outline-none focus:ring-2 focus:ring-[#00b4ff]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(course.title)}
                  className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl min-h-[160px] p-10 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 shadow-md cursor-pointer"
                >
                  {/* Background Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="opacity-20 text-7xl text-white">
                      {course.icon}
                    </div>
                  </div>

                  {/* Foreground Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {course.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
                      {course.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <FooterTwo />
    </div>
  );
};

export default RoadmapPage;
