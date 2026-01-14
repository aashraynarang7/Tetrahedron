"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("adminAuth", "true");
        router.push("/admin/dashboard");
      } else {
        alert("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      
      {/* Card */}
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "16px" }}>
        
        {/* Heading */}
        <h3 className="text-center mb-4 fw-semibold text-dark">
          Admin Login
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email*"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password*"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-warning w-100 py-2 fw-semibold"
          >
            {loading ? "Please wait..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}
