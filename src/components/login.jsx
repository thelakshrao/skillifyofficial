import React, { useState, useEffect } from 'react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8000/auth/login', formData);
      const { jwtToken, name } = res.data;

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("userName", name);

      toast.success("Login successful!");
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("Incorrect email or password.");
      } else {
        toast.error(err.response?.data?.error || "Something went wrong!");
      }
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left Panel */}
      <div className="w-1/2 bg-[#1B1F26] text-[#DCD0B4] flex items-center justify-center px-10">
        <div className="text-xl font-medium text-center leading-relaxed">
          Welcome back to <span className="font-bold text-2xl text-[#DCD0B4]">Skillify</span><br />
          Let’s continue your learning journey!
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex items-center justify-center bg-[#2C2F36]">
        <div className="bg-[#1B1F26] p-10 rounded-xl shadow-xl w-full max-w-md border border-[#8C8274]">
          <h2 className="text-3xl font-bold mb-6 text-[#DCD0B4] text-center">
            Login to your <span className="text-[#65BDBA]">Account</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="flex flex-col relative">
              <label className="text-sm font-medium mb-1 text-[#DCD0B4]">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent text-[#DCD0B4] border border-[#8C8274] rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#65BDBA]"
                required
              />
              <span
                className="absolute top-9 right-3 text-[#DCD0B4] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#DCD0B4] cursor-alias text-black font-semibold py-2 rounded hover:bg-[#c2b99e]"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#8C8274]"></div>
            <span className="mx-4 text-[#8C8274]">or</span>
            <div className="flex-grow border-t border-[#8C8274]"></div>
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center cursor-alias gap-2 border text-[#DCD0B4] border-[#8C8274] py-2 rounded hover:bg-[#8C8274]/30">
            <FaGoogle /> Login with Google
          </button>

          {/* Links */}
          <p className="mt-4 text-center text-sm text-[#8C8274]">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-[#65BDBA] hover:underline">Sign up</Link>
          </p>
          <p className="text-center text-sm">
            <Link to="/forgot-password" className="text-[#8C8274] hover:underline">Forgot password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
