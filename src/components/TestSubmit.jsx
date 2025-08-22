
import React, { useEffect, useState } from "react";

const TestSubmit = ({ courseName, scorePercentage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Simulate submit delay
    setTimeout(() => {
      setShowPopup(true);
      setSubmitted(true);
    }, 1000);
  }, [courseName, scorePercentage]);

  const handleClosePopup = () => {
    setShowPopup(false);
    window.location.href = "/dashboard";
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-2">Test Submitted!</h2>
            <p className="mb-4">
              You scored <span className="font-semibold">{scorePercentage}%</span> in{" "}
              <span className="font-semibold">{courseName}</span>.
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {!submitted && (
        <p className="text-gray-600">Submitting your test result...</p>
      )}
    </>
  );
};

export default TestSubmit;
