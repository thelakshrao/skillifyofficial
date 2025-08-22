import React from "react";

const AlertModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl max-w-md shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#1B1F26]">Heads up!</h2>
        <p className="mb-4 text-sm">
          This project is currently a <strong>blueprint</strong>. All elements,
          navigation, and layout are functioning properly — but some features
          might be placeholders for now.
        </p>
        <p className="text-[#65BDBA] font-semibold mb-6">I make sure you like it!</p>
        <button
          onClick={onClose}
          className="bg-[#65BDBA] hover:bg-[#4bb3b0] text-white px-6 py-2 rounded-full transition"
        >
          Okay, continue
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
