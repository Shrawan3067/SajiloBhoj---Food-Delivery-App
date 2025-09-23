import { useState } from "react";
import axios from "axios";

export default function Profile() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL; // make sure this is set in .env

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login API
        const res = await axios.post(`${API_URL}/api/auth/login`, {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        setMessage("✅ Login successful!");
      } else {
        // Signup API
        const res = await axios.post(`${API_URL}/api/auth/signup`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        setMessage("✅ Signup successful!");
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6">
      {/* Toggle Login/Signup */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 rounded-lg ${
            isLogin ? "bg-orange-600 text-white" : "bg-gray-200"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 rounded-lg ${
            !isLogin ? "bg-orange-600 text-white" : "bg-gray-200"
          }`}
        >
          Signup
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm space-y-4"
      >
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      {/* Message */}
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
