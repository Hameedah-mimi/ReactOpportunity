import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match.");
      return;
    }

    console.log("Password reset");

    // Django connection will be added later

    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Reset Password</h1>

        <p>Create a new password for your account.</p>

        <form onSubmit={handleSubmit}>
          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
