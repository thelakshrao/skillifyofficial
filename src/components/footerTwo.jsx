import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1D1F21] text-gray-300 py-6 text-center mt-20 border-t border-gray-600">
      <p className="text-sm">
        © {new Date().getFullYear()} Skillify. All rights reserved.
      </p>
      <p className="text-xs mt-1">
        Start Leraning Today.
      </p>
    </footer>
  );
};

export default Footer;
