import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from 'react-icons/fa';
import '../App.css';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1D1F21] via-[#343638] to-[#2C2E30] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & Description */}
        <div>
          <h2 className="text-3xl font-bold text-[#65BDBA] mb-4">Skillify</h2>
          <p className="text-[#e0e0e0] text-sm leading-relaxed">
            Learn. Practice. Showcase. Skillify empowers students with roadmaps, dashboards, test zones, and real projects to prepare for the tech industry.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#"><FaInstagram className="text-xl hover:text-[#65BDBA] transition" /></a>
            <a href="#"><FaFacebookF className="text-xl hover:text-[#65BDBA] transition" /></a>
            <a href="#"><FaLinkedinIn className="text-xl hover:text-[#65BDBA] transition" /></a>
            <a href="#"><FaGithub className="text-xl hover:text-[#65BDBA] transition" /></a>
          </div>
        </div>

        {/* Platform Features */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Platform Features</h3>
          <ul className="space-y-2 text-[#c7c7c7] text-sm">
            <li>🚀 Roadmaps & Guides</li>
            <li>📚 Skill Overview</li>
            <li>🎯 Project Idea Generator</li>
            <li>🧪 Test Zone</li>
            <li>📊 Dashboard</li>
            <li>🔐 Authentication</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[#c7c7c7] text-sm">
            <li className="hover:text-[#65BDBA] cursor-pointer">About Us</li>
            <li className="hover:text-[#65BDBA] cursor-pointer">Blog</li>
            <li className="hover:text-[#65BDBA] cursor-pointer">Contact</li>
            <li className="hover:text-[#65BDBA] cursor-pointer">FAQs</li>
            <li className="hover:text-[#65BDBA] cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="text-[#c7c7c7] text-sm mb-4">
            Get updates on latest features and articles.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-[#4a4b4d] w-full h-16 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-[#a0a0a0] mt-10 border-t border-white/10 pt-6">
        © {new Date().getFullYear()} Skillify. All rights reserved.
        <p className="text-xs mt-1">
        Start Leraning Today.
      </p>
      </div>
    </footer>
  );
};

export default Footer;
