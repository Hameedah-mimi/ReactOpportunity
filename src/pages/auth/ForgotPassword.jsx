import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import api from "../../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await api.post("/accounts/forgot-password/", {
        email: email,
      });

      setMessage(
        "If an account with this email exists, a password reset link has been sent.",
      );

      setEmail("");
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Forgot Password?</h1>

        <p>Enter your email and we'll help you reset your password.</p>

        {message && <div className="auth-success">{message}</div>}

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <button
          type="button"
          className="auth-back-button"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
