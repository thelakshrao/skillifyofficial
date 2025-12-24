import React, { useEffect, useState } from "react";
import { FaClock, FaUsers } from "react-icons/fa";
import { client } from "../sanity";
import { useNavigate } from "react-router-dom";
import { urlFor } from "../sanity";
import Char1 from "../images/Char1.png";
import Char2 from "../images/Char2.png";
import Char3 from "../images/Char3.png";
import Slogo from "../images/Slogo.png";
import NavbarTwo from "./NavbarTwo";
import FooterTwo from "./footerTwo";
import Reveal from "../components/Reveal";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const characters = [Char1, Char2, Char3];
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + characters.length) % characters.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % characters.length);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const query = `*[_type == "course"]{_id, title, slug, description, thumbnail, content}`;
      const data = await client.fetch(query);
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <div className="relative min-h-screen font-sans bg-gradient-to-br from-[#DCD0B4]/40 to-[#1B1F26] text-white overflow-hidden">
      <img
        src={Slogo}
        alt="Skillify Logo"
        className="fixed top-[20%] left-[10%] opacity-20 z-0 w-[60%] max-w-[600px] pointer-events-none"
      />

      <div className="relative z-10">
        <NavbarTwo />
        <Reveal>
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
            {/* Left Text */}
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl font-bold leading-tight">
                Where Learning <br />
                Meets <span className="text-[#65BDBA]">Opportunities</span>
              </h1>
              <p className="text-[#f0e9d6] text-base leading-relaxed">
                Skillify is a full-stack educational platform designed to help
                students in their learning journey, project building, skill
                development, and job preparation — all in one place.
              </p>
            </div>

            {/* Carousel */}
            <div className="w-full md:w-1/2 mt-12 md:mt-0 relative h-[360px] flex items-center justify-center">
              {characters.map((char, index) => {
                const position =
                  (index - current + characters.length) % characters.length;

                let classNames =
                  "absolute transition-all duration-500 ease-in-out opacity-0 scale-75 blur-sm";
                let zIndex = "z-0";

                if (position === 0) {
                  classNames =
                    "absolute left-1/2 -translate-x-1/2 scale-100 opacity-100 z-20";
                } else if (position === 1) {
                  classNames =
                    "absolute left-[72%] -translate-x-1/2 scale-90 opacity-40 z-10";
                } else if (position === characters.length - 1) {
                  classNames =
                    "absolute left-[28%] -translate-x-1/2 scale-90 opacity-40 z-10";
                }

                return (
                  <div
                    key={index}
                    className={`${classNames}`}
                    style={{ width: "220px", height: "100%" }}
                  >
                    <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-[100px] overflow-hidden shadow-xl border border-white/10 relative">
                      <img
                        src={char}
                        alt={`Character ${index + 1}`}
                        className="w-full h-full object-cover scale-110"
                      />
                      {/* Overlay Text */}
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 text-white">
                        {position === 0 && (
                          <>
                            <h2 className="text-xl font-bold mb-2">
                              Welcome to Skillify
                            </h2>
                            <p className="text-sm">
                              Empowering students with the best learning
                              resources, project guidance, and practice zones.
                              Build your skills. Shape your future.
                            </p>
                          </>
                        )}
                        {position === 1 && (
                          <>
                            <h2 className="text-xl font-bold mb-2">
                              Interactive Roadmaps
                            </h2>
                            <p className="text-sm">
                              Choose your learning path with structured roadmaps
                              for development, data science, and more.
                            </p>
                          </>
                        )}
                        {position === 2 && (
                          <>
                            <h2 className="text-xl font-bold mb-2">
                              Personalized Dashboard
                            </h2>
                            <p className="text-sm">
                              Track your progress, earn badges, and set weekly
                              goals. Your Skillify dashboard is your personal
                              learning hub.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Courses Section */}
          <section className="py-16 px-6 md:px-12">
            <h2 className="text-4xl font-bold text-center mb-12 text-[#65BDBA]">
              Our Courses
            </h2>

            <div className="flex justify-center items-center w-full mt-4 mb-6">
              <input
                type="text"
                placeholder="Search courses, topics..."
                className="w-full max-w-xl px-5 py-2 bg-[#2C2F36] border border-[#3c3c3c] rounded-full text-[#DCD0B4] placeholder-[#8C8274] focus:outline-none focus:ring-2 focus:ring-[#65BDBA]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {courses.length === 0 ? (
              <p className="text-[#8C8274] text-center">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {courses
                  .filter((course) =>
                    course.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((course) => (
                    <div
                      key={course._id}
                      onClick={() =>
                        navigate(`/course-detail/${course.slug.current}`)
                      }
                      className="cursor-pointer bg-[#2C2F36]/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#3c3c3c] hover:shadow-[#65BDBA]/30 hover:scale-105 transition-all duration-300"
                    >
                      {course.thumbnail && (
                        <img
                          src={urlFor(course.thumbnail).url()}
                          alt={course.title}
                          className="h-40 w-full object-cover rounded mb-4"
                        />
                      )}
                      <h3 className="text-lg font-semibold mb-2">
                        {course.title}
                      </h3>
                      <p className="text-[#8C8274] mb-2">
                        {course.description}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </Reveal>
      </div>
      <FooterTwo />
    </div>
  );
};

export default CoursesPage;
