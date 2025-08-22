import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slogo from "./images/Slogo.png";
import Char1 from "./images/Char1.png";
import Char2 from "./images/Char2.png";
import Char3 from "./images/Char3.png";
import About from "./components/about.jsx";
import Services from "./components/services.jsx";
import Footer from "./components/footer.jsx";
import AlertModal from "./components/AlertModal";
import Reveal from "./components/Reveal";

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [showAlert, setShowAlert] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const characters = [Char1, Char2, Char3];

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If already logged in, redirect to dashboard immediately
    if (token) {
      navigate("/dashboard");
      return;
    }

    // Alert logic
    const seen = localStorage.getItem("seenBlueprintAlert");
    if (!seen) setShowAlert(true);
    setIsReady(true);
  }, [navigate]);

  const handleAlertClose = () => {
    localStorage.setItem("seenBlueprintAlert", "true");
    setShowAlert(false);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % characters.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + characters.length) % characters.length);
  };

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  if (!isReady) return null;

  return (
    <div className="relative">
      {showAlert && <AlertModal onClose={handleAlertClose} />}

      <div className={`transition-all duration-300 ${showAlert ? "blur-md pointer-events-none select-none" : ""}`}>
        <div className="min-h-screen bg-gradient-to-b from-[#1D1F21] via-[#939596] to-[#A89E8F] text-white font-sans">
          <header className="flex justify-between items-center px-10 py-6">
            <div className="flex items-center gap-2">
              <img src={Slogo} alt="Skillify Logo" className="w-10 h-10" />
              <h1 className="text-2xl font-bold">Skillify</h1>
            </div>
          </header>

          <Reveal>
            <main className="px-10 flex flex-col md:flex-row items-center justify-between">
              {/* Hero Section */}
              <section className="md:w-1/2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Where Learning <br /> Meets{" "}
                  <span className="text-[#56C2C1]">Opportunities</span>
                </h2>
                <p className="text-lg text-[#e0e0e0]">
                  Skillify is a full-stack educational platform designed to help
                  students in their learning journey, project building, skill
                  development, and job preparation — all in one place.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="bg-[#A89E8F] hover:bg-[#938979] text-black px-6 py-2 rounded-full text-lg font-semibold cursor-pointer transition duration-300"
                >
                  Get Started
                </button>
              </section>

              {/* Carousel Section */}
              <section className="w-full py-16 bg-transparent relative overflow-hidden">
                <div className="relative w-full flex justify-center items-center h-[500px]">
                  {characters.map((char, index) => {
                    const position = (index - current + characters.length) % characters.length;

                    let style = "hidden";
                    let transform = "";
                    let zIndex = "z-0";

                    if (position === 0) {
                      style = "block";
                      transform = "scale-100 left-1/2 -translate-x-1/2";
                      zIndex = "z-20";
                    } else if (position === 1) {
                      style = "block";
                      transform = "scale-[0.85] left-[72%] -translate-x-1/2 opacity-50";
                      zIndex = "z-10";
                    } else if (position === characters.length - 1) {
                      style = "block";
                      transform = "scale-[0.85] left-[28%] -translate-x-1/2 opacity-50";
                      zIndex = "z-10";
                    }

                    return (
                      <div
                        key={index}
                        className={`absolute transition-all duration-500 ease-in-out ${style} ${zIndex} ${transform}`}
                        style={{ width: "280px", height: "100%" }}
                      >
                        <div className="w-full h-full bg-[#1D1F21] rounded-t-[120px] rounded-b-[120px] overflow-hidden shadow-2xl border border-[#3c3c3c] relative">
                          <img
                            src={char}
                            alt={`Character ${index + 1}`}
                            className="w-full h-full object-cover scale-110"
                          />
                          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                              {position === 0
                                ? "Welcome to Skillify"
                                : position === 1
                                ? "Interactive Roadmaps"
                                : "Personalized Dashboard"}
                            </h2>
                            <p className="text-white text-lg md:text-xl max-w-md">
                              {position === 0 &&
                                "Empowering students with the best learning resources, project guidance, and practice zones. Build your skills. Shape your future."}
                              {position === 1 &&
                                "Choose your learning path with structured roadmaps for development, data science, and more."}
                              {position === 2 &&
                                "Track your progress, earn badges, and set weekly goals. Your Skillify dashboard is your personal learning hub."}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#E0D3BA] text-black p-3 rounded-full shadow-lg z-30 hover:scale-110"
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#E0D3BA] text-black p-3 rounded-full shadow-lg z-30 hover:scale-110"
                  >
                    &#10095;
                  </button>
                </div>
              </section>
            </main>
          </Reveal>

          <img
            src={Slogo}
            alt="Skillify Logo"
            className="fixed top-[20%] left-[30%] opacity-20 z-0 w-[60%] max-w-[600px] pointer-events-none"
          />

          <About />
          <Services />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
