import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanity";
import NavbarTwo from "./NavbarTwo";
import FooterTwo from "./footerTwo";
import splashBg from "../images/Slogo.png";
import Reveal from "../components/Reveal";

const RoadmapDetail = () => {
  const { title } = useParams();
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      const data = await client.fetch(
        `*[_type == "roadmap" && title == $title][0]{
          title,
          description,
          levels[]{
            levelName,
            topics
          }
        }`,
        { title: decodeURIComponent(title) }
      );
      setRoadmap(data);
    };

    fetchRoadmap();
  }, [title]);

  if (!roadmap) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen text-white font-sans relative bg-gradient-to-b from-[#1c1d1f] to-[#3b3c3e] overflow-hidden">
      <NavbarTwo />
      <Reveal>
        {/* Background logo */}
        <img
          src={splashBg}
          alt="Skillify Logo"
          className="absolute opacity-10 top-20 left-30 w-[400px] z-0 pointer-events-none"
        />

        {/* Header */}
        <div className="relative z-10 py-16 px-6 md:px-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {roadmap.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            {roadmap.description || "Step-by-step roadmap to master this skill"}
          </p>

          <div className="flex items-center gap-6 mt-6">
            <span className="text-sm bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold shadow-md">
              0% DONE
            </span>
            <span className="text-sm text-gray-400">0 of 100 Done</span>
          </div>
        </div>

        {/* Roadmap Levels */}
        <div className="relative z-10 py-10 px-6 md:px-20">
          {roadmap.levels?.map((level, i) => (
            <div key={i} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-2">
                {level.levelName}
              </h2>
              <ul className="space-y-4">
                {level.topics?.map((topic, idx) => (
                  <TopicItem key={idx} topic={topic} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
      <FooterTwo />
    </div>
  );
};

const TopicItem = ({ topic }) => {
  return (
    <li className="bg-[#2c2d2f] rounded-xl border border-gray-700 p-5 shadow hover:shadow-lg transition">
      <p className="font-semibold text-white text-lg">{topic.title}</p>
      {topic.children && topic.children.length > 0 && (
        <ul className="ml-4 mt-3 border-l-2 border-gray-600 pl-4 space-y-3">
          {topic.children.map((sub, i) => (
            <TopicItem key={i} topic={sub} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RoadmapDetail;
