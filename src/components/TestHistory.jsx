import React from "react";

const TestHistory = ({ testResults }) => {
  if (!testResults.length) return null;

  return (
    <div className="bg-[#2C2F36] p-4 rounded-xl shadow-inner max-h-60 overflow-y-auto mt-4">
      <h3 className="text-md font-semibold text-[#65BDBA] mb-2">Previous Attempts</h3>
      {testResults.map((r, i) => (
        <div key={i} className="border-b border-[#3A3D42] py-2 text-sm text-[#DCD0B4]">
          <p className="font-medium">{r.courseName}</p>
          <p>Score: {r.scorePercentage}% | Rating: {r.ratingOutOfTen}/10</p>
          <p className="text-xs text-[#8C8274]">
            Taken on: {new Date(r.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TestHistory;
