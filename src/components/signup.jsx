import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const messages = [
  "Master skills through hands-on projects.",
  "Track your progress with a personalized dashboard.",
  "Structured roadmaps for Web Dev, DSA & more.",
];

const SignupPage = () => {
  const navigate = useNavigate();
  const [currentMsg, setCurrentMsg] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsg((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/auth/signup", {
        name,
        email,
        password,
      });

      toast.success(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        toast.warn("User already exists.");
      } else {
        toast.error(err.response?.data?.error || "Something went wrong!");
      }
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left panel */}
      <div className="w-1/2 bg-[#1B1F26] text-[#DCD0B4] flex items-center justify-center px-10">
        <div className="text-2xl font-semibold text-center leading-relaxed">
          {messages[currentMsg]}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/2 flex items-center justify-center bg-[#2C2F36]">
        <div className="bg-[#1B1F26] border border-[#8C8274] p-10 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-[#DCD0B4] text-center">
            Create an <span className="text-[#65BDBA]">Account</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-[#DCD0B4]">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent text-[#DCD0B4] border border-[#8C8274] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#65BDBA]"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-[#DCD0B4]">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent text-[#DCD0B4] border border-[#8C8274] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#65BDBA]"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-[#DCD0B4]">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent text-[#DCD0B4] border border-[#8C8274] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#65BDBA]"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-[#DCD0B4]">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-transparent text-[#DCD0B4] border border-[#8C8274] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#65BDBA]"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#DCD0B4] cursor-alias text-black font-semibold py-2 rounded hover:bg-[#c2b99e] transition"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#8C8274]"></div>
            <span className="mx-4 text-[#8C8274]">or</span>
            <div className="flex-grow border-t border-[#8C8274]"></div>
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center cursor-alias justify-center gap-2 border text-[#DCD0B4] border-[#8C8274] py-2 rounded hover:bg-[#8C8274]/30">
            <FaGoogle /> Login with Google
          </button>

          {/* Link to Login */}
          <p className="mt-4 text-center text-sm text-[#8C8274]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#65BDBA] hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
