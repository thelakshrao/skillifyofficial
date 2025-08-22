import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client, urlFor } from "../sanity";
import NavbarTwo from "./NavbarTwo";
import { PortableText } from "@portabletext/react";
import { myPortableTextComponentsLight } from "../utils/PortableTextComponents";
import Congratulations from "./CongratulationsModal";

const CourseDetail = () => {
  const { slug } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [completedPages, setCompletedPages] = useState([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const [triggerCelebrate, setTriggerCelebrate] = useState(false);

  // Check course completion and trigger animation
  useEffect(() => {
    const allPages = courseDetail?.content?.length;
    const isComplete = allPages > 0 && completedPages.length === allPages;

    setShowCongrats(isComplete);

    if (isComplete) {
      setTriggerCelebrate(true);
      const timer = setTimeout(() => setTriggerCelebrate(false), 4000);
      return () => clearTimeout(timer);
    } else {
      setTriggerCelebrate(false);
    }
  }, [completedPages, courseDetail]);

  // Fetch course and user progress
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "course" && slug.current == "${slug}"][0]`;
        const course = await client.fetch(query);
        setCourseDetail(course);

        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`http://localhost:8000/api/user/progress/${slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setCompletedPages(data.completedPages || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [slug]);

  // Toggle completion and sync
  const togglePageCompletion = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const isCompleted = completedPages.includes(currentPage);
    const updatedPages = isCompleted
      ? completedPages.filter((i) => i !== currentPage)
      : [...completedPages, currentPage];

    setCompletedPages(updatedPages);

    try {
      await fetch(`http://localhost:8000/api/user/progress/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pageIndex: currentPage,
          isCompleted: !isCompleted,
        }),
      });
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < courseDetail.content.length - 1)
      setCurrentPage(currentPage + 1);
  };

  const getCompletionPercentage = () => {
    if (!courseDetail?.content?.length) return 0;
    return Math.round(
      (completedPages.length / courseDetail.content.length) * 100
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D1F21] via-[#939596] to-[#A89E8F] text-white font-sans">
      <NavbarTwo />
      <div className="px-6 md:px-16 py-12 max-w-5xl mx-auto">
        {courseDetail && courseDetail.content.length > 0 ? (
          <>
            <h1 className="text-4xl font-bold text-[#58C0B6] mb-6">
              {courseDetail.title}
            </h1>

            {courseDetail.thumbnail && (
              <img
                src={urlFor(courseDetail.thumbnail).url()}
                alt={courseDetail.title}
                className="h-64 w-full object-cover rounded-xl mb-8 shadow-md border border-gray-800"
              />
            )}

            <div className="bg-[#1E1F22] p-6 rounded-2xl shadow-xl border border-gray-700 text-gray-300 mb-6 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-[#58C0B6] mb-4">
                {courseDetail.content[currentPage].title} (Page {currentPage + 1})
              </h2>

              <PortableText
                value={courseDetail.content[currentPage].blocks}
                components={myPortableTextComponentsLight}
              />

              {/* Completion Checkbox */}
              <div className="mt-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox w-5 h-5 text-[#58C0B6]"
                    checked={completedPages.includes(currentPage)}
                    onChange={togglePageCompletion}
                  />
                  <span className="ml-2 text-gray-300">
                    Mark this module as complete
                  </span>
                </label>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded ${
                  currentPage === 0
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#58C0B6] hover:bg-[#48b1a4]"
                }`}
              >
                Prev
              </button>

              <div className="flex items-center space-x-2 overflow-x-auto max-w-full">
                {courseDetail.content.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-8 h-8 rounded-full font-medium ${
                      index === currentPage
                        ? "bg-[#58C0B6] text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === courseDetail.content.length - 1}
                className={`px-4 py-2 rounded ${
                  currentPage === courseDetail.content.length - 1
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#58C0B6] hover:bg-[#48b1a4]"
                }`}
              >
                Next
              </button>
            </div>

            {/* Progress bar */}
            <div className="mt-8">
              <p className="text-[#58C0B6] font-semibold">
                Completion: {getCompletionPercentage()}%
              </p>
              <div className="w-full h-3 bg-gray-700 rounded-full mt-2">
                <div
                  className="h-full bg-[#58C0B6] rounded-full"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
            </div>
          </>
        ) : courseDetail ? (
          <p className="text-gray-500">No content found for this course.</p>
        ) : (
          <p className="text-gray-500">Loading course details...</p>
        )}
      </div>

      {/* Celebration modal */}
      {showCongrats && (
        <Congratulations visible={showCongrats} triggerCelebrate={triggerCelebrate} />
      )}
    </div>
  );
};

export default CourseDetail;
