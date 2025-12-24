import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';

const YourProgressBox = () => {
  const { user } = useContext(UserContext);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/dashboard-score/${user._id}`);
        setScores(res.data.testScores || []);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    if (user?._id) {
      fetchScores();
    }
  }, [user]);

  return (
    <div className="bg-white rounded-xl p-5 shadow-md w-full max-h-[250px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-skillifyPurple">📈 Your Progress</h2>
      {scores.length === 0 ? (
        <p className="text-gray-500">No test scores available yet.</p>
      ) : (
        <div className="flex flex-col space-y-3">
          {scores.map((score, index) => (
            <div
              key={index}
              className="bg-skillifyPurple bg-opacity-10 p-4 rounded-md flex items-center justify-between"
            >
              <div>
                <p className="text-md font-medium">{score.subject}</p>
                <p className="text-sm text-gray-600">{new Date(score.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-skillifyPurple">{score.score}%</p>
                <p className="text-sm text-yellow-500">⭐ {score.rating}/10</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourProgressBox;
