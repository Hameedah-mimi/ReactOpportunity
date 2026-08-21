import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../services/googleAuth";
import api from "../../services/api";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login:", {
      email,
      password,
    });

    navigate("/dashboard");
  };

  // ADD THIS
  const handleGoogleLogin = async () => {
    try {
      const idToken = await signInWithGoogle();

      const response = await api.post("auth/google-login/", {
        idToken: idToken,
      });
      console.log(response.data);

      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>

        <p>Login to your Student Opportunity Hub account.</p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <button type="button" onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        <button type="button" onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </button>

        <p>
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
