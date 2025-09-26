// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaPhone, FaEnvelope, FaUser, FaGoogle, FaFacebook } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Changed from AuthContext to useAuth

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    name: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, signup } = useAuth(); // Using the hook now
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // ... rest of the component remains the same

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login logic
        if (!formData.email && !formData.phone) {
          setError("Please enter email or phone number");
          setIsLoading(false);
          return;
        }
        if (!formData.password) {
          setError("Please enter password");
          setIsLoading(false);
          return;
        }

        await login(formData.email || formData.phone, formData.password);
        navigate(from, { replace: true });
      } else {
        // Signup logic
        if (!formData.name) {
          setError("Please enter your name");
          setIsLoading(false);
          return;
        }
        if (!formData.email && !formData.phone) {
          setError("Please enter email or phone number");
          setIsLoading(false);
          return;
        }
        if (!formData.password || formData.password.length < 6) {
          setError("Password must be at least 6 characters");
          setIsLoading(false);
          return;
        }

        await signup(formData.name, formData.email || formData.phone, formData.password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: "demo@swiggy.com",
      phone: "",
      password: "demopassword",
      name: "Demo User"
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          {/* Toggle Switch */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-md text-center font-medium transition-all duration-200 ${
                isLogin 
                  ? "bg-white shadow-sm text-orange-500" 
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-md text-center font-medium transition-all duration-200 ${
                !isLogin 
                  ? "bg-white shadow-sm text-orange-500" 
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Sign up
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Login" : "Sign up"}
          </h1>
          <p className="text-gray-600 mb-8">
            {isLogin 
              ? "Get access to your Orders, Wishlist and Recommendations" 
              : "Sign up to get started with your account"
            }
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Signup only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            {/* Email/Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isLogin ? "Email or Phone Number" : "Email or Phone Number"}
              </label>
              <div className="relative">
                {formData.email || formData.phone ? (
                  formData.email.includes('@') ? (
                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                  ) : (
                    <FaPhone className="absolute left-3 top-3 text-gray-400" />
                  )
                ) : (
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                )}
                <input
                  type="text"
                  name={formData.email ? "email" : "phone"}
                  value={formData.email || formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={isLogin ? "Enter Email or Phone" : "Enter Email or Phone"}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password (Login only) */}
            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
                  Forgot Password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 disabled:bg-orange-300 transition duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isLogin ? "Logging in..." : "Creating account..."}
                </div>
              ) : (
                isLogin ? "Login" : "Continue"
              )}
            </button>
          </form>

          {/* Demo Login Button */}
          <button
            onClick={handleDemoLogin}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition duration-200 mt-4"
          >
            Use Demo Credentials
          </button>

          {/* Divider */}
          <div className="relative flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              <FaFacebook />
              Continue with Facebook
            </button>
          </div>

          {/* Terms and Conditions */}
          {!isLogin && (
            <p className="text-xs text-gray-500 text-center mt-6">
              By creating an account, I accept the{" "}
              <Link to="/terms" className="text-orange-500 hover:underline">
                Terms & Conditions
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 Swiggy Clone. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
              <Link to="/privacy" className="hover:text-orange-500">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-orange-500">Terms of Service</Link>
              <Link to="/contact" className="hover:text-orange-500">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}