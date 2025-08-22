import React from "react";
import Slogo from "../images/Slogo.png";
import Char7 from "../images/Char7.png";
import Reveal from "../components/Reveal";

const About = () => {
  return (
    <section className="relative py-20 px-6 md:px-20 bg-[#1E1F22] text-white">
      {/* Light background logo */}
      <img
        src={Slogo}
        alt="Skillify Logo"
        className="absolute opacity-5 w-1/4 md:w-1/4 top-10 left-1/2 transform -translate-x-1/2 z-0"
      />
      <Reveal>
        {/* Header content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">About Us</h2>
          <p className="text-lg text-gray-300">
            At Skillify, we empower students with the tools, roadmaps, and
            environments needed to grow — academically, professionally, and
            personally.
          </p>
        </div>

        {/* Mission / Vision / Stand - flat grid */}
        <div className="relative z-10 grid md:grid-cols-3 gap-10 text-left">
          {/* What We Stand For */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-2">
              What We Stand For
            </h4>
            <h3 className="text-2xl font-bold text-[#56C2C1] leading-snug">
              We are dedicated to <br /> children's rights.
            </h3>
          </div>

          {/* Our Mission */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-2">
              Our Mission
            </h4>
            <h3 className="text-lg font-bold text-[#56C2C1]">
              We Make Sure to Provide <br /> Care for Children
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Lorem Ipsum main services is providing basic necessities such as
              food, shelter, and clothing to children who are living in poverty
              or experiencing homelessness.
            </p>
          </div>

          {/* Our Vision */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-2">
              Our Vision
            </h4>
            <h3 className="text-lg font-bold text-[#56C2C1]">
              We Ensure Special Care That <br /> No Child Is Injured.
            </h3>
            <p className="text-sm text-gray-400 mt-2">
              Lorem Ipsum main services is providing basic necessities such as
              food, shelter, and clothing to children who are living in poverty
              or experiencing homelessness.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default About;
