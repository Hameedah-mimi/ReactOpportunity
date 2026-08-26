import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../services/googleAuth";
import api from "../../services/api";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("auth/login/", {
        email,
        password,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      console.log("Django error:", error.response?.data);

      alert("Login failed. Check your email and password.");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const { idToken } = await signInWithGoogle();

      const response = await api.post("auth/google-login/", {
        idToken,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>

        <p>Login to your Opportuna account.</p>

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
