import React from "react";
import roadmapImg from "../images/Char4.png";
import dashboardImg from "../images/Char5.png";
import projectImg from "../images/Char6.png";
import Reveal from "../components/Reveal";

const services = [
  {
    title: "Roadmaps & Learning Guides",
    description:
      "Explore structured paths for Web Development, DSA, DevOps, ML, and more — tailored to your learning journey.",
    image: roadmapImg,
  },
  {
    title: "Project Idea Generator",
    description:
      "Discover unique project ideas with UI/UX guidance and clear starting points based on your skill level.",
    image: dashboardImg,
  },
  {
    title: "Test Zone & Skill Tracking",
    description:
      "Practice coding, aptitude, and MCQs with theory support and track progress on your personalized dashboard.",
    image: projectImg,
  },
];

const Services = () => {
  return (
    <section
      className="bg-gradient-to-b from-[#2f2f30] to-[#4a4b4d] py-20 px-6 md:px-20 text-white"
      id="services"
    >
      <Reveal>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-16">
            What <span className="text-[#22d3ee]">Skillify</span> Offers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl min-h-[360px] p-10 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 shadow-md"
              >
                {/* Background Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={service.image}
                    alt=""
                    className="opacity-10 w-40 h-40 object-contain pointer-events-none"
                  />
                </div>

                {/* Centered Foreground Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed max-w-xs">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Services;
