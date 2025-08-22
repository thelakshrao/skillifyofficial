import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { FaTrophy } from 'react-icons/fa';

const CongratulationsModal = ({ visible, triggerCelebrate }) => {
  const [position, setPosition] = useState('center');

  useEffect(() => {
    if (visible) {
      setPosition('center');
      const timeout = setTimeout(() => {
        setPosition('top-6 right-6');
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {triggerCelebrate && <Confetti recycle={false} numberOfPieces={250} />}
      <div
        className={`absolute transition-all duration-500 ease-in-out ${
          position === 'center'
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            : 'top-6 right-6'
        } bg-white text-black px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 border border-yellow-400`}
      >
        <FaTrophy className="text-yellow-500 text-2xl" />
        <div>
          <h2 className="font-bold">Congratulations!</h2>
          <p className="text-sm">You've completed the course.</p>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;
