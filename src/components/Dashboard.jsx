import React, { useEffect, useState } from "react";
import axios from "axios";
import Slogo from "../images/Slogo.png";
import {
  FaCode,
  FaBook,
  FaChalkboardTeacher,
  FaTasks,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import ProfileBox from "./ProfileBox";
import { useNavigate } from "react-router-dom";
import sanityClient from "../lib/sanityClient";
import Reveal from "../components/Reveal";
import TestHistory from "../components/TestHistory";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [courses, setCourses] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const res = await axios.get("http://localhost:8000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setName(res.data.name || "Lakshay Yadav");
        setBio(res.data.bio || "Write your bio here");
        localStorage.setItem("userId", res.data._id);
      } catch (err) {
        console.error("Profile fetch error:", err);
        const storedName = localStorage.getItem("userName") || "Lakshay Yadav";
        setName(storedName);
        setBio("Aspiring developer passionate about learning!");
      }
    };

    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/progress", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const courseSlugs = res.data.map((p) => p.courseSlug);

        const sanityCourses = await sanityClient.fetch(
          `*[_type == "course" && slug.current in $slugs]{
            title,
            "slug": slug.current,
            "totalPages": count(content)
          }`,
          { slugs: courseSlugs }
        );

        const courseData = res.data.map((progress) => {
          const matchedCourse = sanityCourses.find(
            (c) => c.slug === progress.courseSlug
          );

          return {
            ...progress,
            title: matchedCourse?.title || progress.courseSlug,
            totalPages: matchedCourse?.totalPages || 1,
          };
        });

        setCourses(courseData);
      } catch (err) {
        console.error("Progress fetch error:", err);
      }
    };

    const fetchTestResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/user/testresults", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTestResults(res.data || []);
      } catch (err) {
        console.error("Test fetch error:", err);
      }
    };

    fetchProfile();
    fetchCourses();
    fetchTestResults();

    const today = new Date().toISOString().slice(0, 10);
    const lastWelcomeDate = localStorage.getItem("lastWelcomeDate");
    if (lastWelcomeDate !== today) {
      setShowWelcome(true);
      localStorage.setItem("lastWelcomeDate", today);
    } else {
      setShowWelcome(false);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-b from-[#1D1F21] via-[#939596] to-[#A89E8F] text-[#DCD0B4] font-sans">

      {/* Hamburger Menu */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white text-2xl"
        onClick={() => setShowSidebar(true)}
      >
        <GiHamburgerMenu />
      </button>

      {/* Sidebar - Mobile Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setShowSidebar(false)}>
          <aside
            className="w-64 min-w-[16rem] bg-[#2C2F36] shadow-lg p-6 flex flex-col justify-between h-full absolute left-0 top-0 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent onNavigate={navigate} onLogout={handleLogout} closeSidebar={() => setShowSidebar(false)} />
          </aside>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 min-w-[16rem] bg-[#2C2F36] shadow-lg p-6 flex-col justify-between h-screen">
        <SidebarContent onNavigate={navigate} onLogout={handleLogout} />
      </aside>

      {/* Main Content */}
      <Reveal>
        <main className="flex-1 h-full overflow-y-auto p-10 relative z-10">
          <ProfileBox name={name} bio={bio} />

          {showWelcome && (
            <h1 className="text-4xl font-bold mb-8">
              Welcome, <span className="text-[#65BDBA]">{name}</span>
            </h1>
          )}

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Test Result Card */}
            <div className="bg-[#2C2F36] p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">TEST</h2>
              {testResults.length > 0 ? (
                <>
                  <div key={testResults[0]._id}>
                    <p className="text-md mb-2">
                      <span className="font-medium text-[#65BDBA]">
                        {testResults[0].courseName}
                      </span>
                    </p>
                    <p className="text-sm mb-1">
                      Score: {testResults[0].score} / {testResults[0].totalQuestions} ({((testResults[0].score / testResults[0].totalQuestions) * 100).toFixed(2)}%)
                    </p>
                    <p className="text-sm mb-1">Rating: {testResults[0].rating || 0}/10</p>
                    <p className="text-xs text-[#8C8274]">Taken on: {new Date(testResults[0].createdAt).toLocaleString()}</p>
                  </div>
                  <TestHistory testResults={testResults.slice(1)} />
                </>
              ) : (
                <p className="text-sm text-[#8C8274]">
                  You haven't taken any test yet.{" "}
                  <span onClick={() => navigate("/testzone")} className="text-[#65BDBA] cursor-pointer hover:underline">
                    Take your first test now!
                  </span>
                </p>
              )}
            </div>

            {/* Skills Overview */}
            <div className="bg-[#2C2F36] p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Skills Overview</h2>
              <p className="text-sm text-[#8C8274]">Frontend: Beginner</p>
              <p className="text-sm text-[#8C8274]">DSA: Intermediate</p>
              <p className="text-sm text-[#8C8274]">Cloud: Beginner</p>
            </div>

            {/* Project Ideas */}
            <div className="bg-gradient-to-br from-[#2C2F36] to-[#1B1F26] p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold">Project Ideas</h2>
              <p className="text-sm mt-2 text-[#8C8274]">
                Explore real-world projects with UI/UX inspiration!
              </p>
              <button className="mt-4 px-5 py-2 bg-[#65BDBA] hover:bg-[#86d2d0] transition text-black rounded-lg font-medium" onClick={() => navigate("/projects")}>
                Explore
              </button>
            </div>
          </section>

          {/* Courses Progress */}
          <section className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">Your Courses Progress</h2>
            <div className="flex overflow-x-auto space-x-6 pb-4">
              {courses.map((course) => (
                <div key={course.courseSlug} className="min-w-[250px] bg-[#2C2F36] p-5 rounded-2xl shadow-md">
                  <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                  <p className="text-sm text-[#8C8274] mb-1">
                    {course.completedPages.length} / {course.totalPages} Pages Completed
                  </p>
                  <div className="w-full h-2 bg-[#8C8274]/30 rounded-full">
                    <div className="h-2 bg-[#65BDBA] rounded-full" style={{ width: `${(course.completedPages.length / course.totalPages) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </Reveal>

      <img src={Slogo} alt="Skillify Logo" className="fixed top-[20%] left-[30%] opacity-20 z-0 w-[60%] max-w-[600px] pointer-events-none" />
    </div>
  );
};

// Sidebar Content Component for DRY structure
const SidebarContent = ({ onNavigate, onLogout, closeSidebar }) => {
  const clickHandler = (path) => {
    onNavigate(path);
    if (closeSidebar) closeSidebar();
  };

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-[#65BDBA] mb-12 tracking-wide">
          Skillify
        </h2>
        <nav className="space-y-6 text-sm">
          <div className="flex items-center space-x-3 hover:text-[#86d2d0] cursor-pointer" onClick={() => clickHandler("/skilicode")}>
            <FaCode /> <span>SkiliCode</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-[#86d2d0] cursor-pointer" onClick={() => clickHandler("/courses")}>
            <FaBook /> <span>Courses</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-[#86d2d0] cursor-pointer" onClick={() => clickHandler("/roadmap")}>
            <FaChalkboardTeacher /> <span>Roadmaps</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-[#86d2d0] cursor-pointer" onClick={() => clickHandler("/testzone")}>
            <FaTasks /> <span>Test Zone</span>
          </div>
          <div className="flex items-center space-x-3 hover:text-[#86d2d0] cursor-pointer" onClick={() => clickHandler("/setting")}>
            <FaCog /> <span>Settings</span>
          </div>
          <div className="flex items-center space-x-3 text-red-400 hover:text-red-500 cursor-pointer" onClick={onLogout}>
            <FaSignOutAlt /> <span>Logout</span>
          </div>
        </nav>
      </div>
      <div className="bg-[#8C8274] cursor-pointer text-[#1B1F26] p-4 rounded-xl text-sm shadow-md">
        Unlock Premium content today!
      </div>
    </>
  );
};

export default Dashboard;
