
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/img/hero-renters.jpg";

export const PasswordReset = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const email = sessionStorage.getItem("resetEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (resp.ok) {
        sessionStorage.removeItem("resetEmail");
        navigate("/login")
      } else {
        setError(data.msg || "Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          paddingTop: "100px",
          boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.5)", // dark overlay
        }}
      >
    <div className="container bg-white shadow p-4 rounded"
			style={{ maxWidth: "500px" }}>
    <h2 className="text-center mb-4">Reset password</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">New Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Retype New Password</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-danger mb-2">{error}</div>}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form></div></div>
  );
};
