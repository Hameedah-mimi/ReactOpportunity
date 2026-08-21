import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Password reset requested for:", email);

    // Django connection will be added later
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Forgot Password?</h1>

        <p>
          Enter your email and we'll help you
          reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

        <button
          type="button"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;