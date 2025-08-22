import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import fetchTestBySubject from "../utils/fetchTestBySubject";

const TestPage = () => {
  const { subject } = useParams();
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);

  const resultRef = useRef(null); 

  useEffect(() => {
    const loadTest = async () => {
      const test = await fetchTestBySubject(subject);
      setTestData(test);
    };
    loadTest();
  }, [subject]);

  const handleSelect = (qIdx, optionIdx) => {
    setAnswers({ ...answers, [qIdx]: optionIdx });
  };

  const handleSubmit = () => {
    let correct = 0;
    testData.mcqs.forEach((q, idx) => {
      if (answers[idx] + 1 === q.correctAnswer) correct++;
    });

    const percentage = (correct / testData.mcqs.length) * 100;
    setScore(percentage);

    const feedbackText =
      percentage >= 80
        ? "Excellent! Keep it up."
        : percentage >= 70
        ? "Great job!"
        : percentage >= 60
        ? "Good effort!"
        : "Try again with better preparation.";

    setFeedback(feedbackText);

    // scroll to result
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  if (!testData) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1D1F21] via-[#939596] to-[#A89E8F] text-[#DCD0B4] font-sans py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#E8D9C3]">{testData.title}</h1>

        {testData.mcqs.map((q, idx) => (
          <div
            key={idx}
            className="bg-[#1F2125] rounded-xl p-6 mb-6 shadow-lg"
          >
            <p className="mb-4 font-semibold text-lg text-[#E8D9C3]">
              {idx + 1}. {q.question}
            </p>
            <div className="grid gap-3">
              {q.options.map((opt, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl cursor-pointer border border-transparent transition-colors ${
                    answers[idx] === i
                      ? "bg-[#65BDBA] text-black font-semibold"
                      : "bg-[#2A2D31] hover:bg-[#35383E] text-[#DCD0B4]"
                  }`}
                  onClick={() => handleSelect(idx, i)}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          className="mt-6 bg-[#65BDBA] cursor-pointer text-black font-bold px-6 py-3 rounded-full hover:opacity-90 active:scale-95 transition-all duration-200"
          onClick={handleSubmit}
        >
          Submit Test
        </button>

        {score !== null && (
          <div
            ref={resultRef}
            className="mt-10 bg-[#1F2125] text-[#E8D9C3] rounded-3xl p-8 shadow-xl text-center"
          >
            <h2 className="font-bold text-2xl mb-4">Your Result</h2>
            <p className="text-xl mb-2">
              Score: <span className="font-bold">{score.toFixed(2)}%</span>
            </p>
            <p className="text-lg font-medium">{feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
