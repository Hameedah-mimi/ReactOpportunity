import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Auth.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "student",
    country: "",
    education_level: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerErrors(null);

    if (formData.password !== formData.password2) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("auth/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        role: formData.role,
        country: formData.country,
        education_level: formData.education_level,
      });

      console.log("Registration successful:", response.data);
      alert("Account created successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response?.data) {
        console.log("Django error details:", error.response.data);
        setServerErrors(error.response.data);
      } else {
        alert("Registration failed. Please check your network connection.");
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Create Account</h1>
        <p>Join Opportuna today.</p>

        {/* Dynamic Server Error Messages Rendering */}
        {serverErrors && (
          <div
            className="error-summary"
            style={{ color: "red", marginBottom: "15px", fontSize: "14px" }}
          >
            {Object.keys(serverErrors).map((key) => (
              <p key={key}>
                <strong>{key}:</strong>{" "}
                {Array.isArray(serverErrors[key])
                  ? serverErrors[key].join(" ")
                  : serverErrors[key]}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder="Enter your country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <label>Education Level</label>
          <input
            type="text"
            name="education_level"
            placeholder="e.g. Undergraduate, High School"
            value={formData.education_level}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "◉" : "◌"}
            </button>
          </div>

          <label>Confirm Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword2 ? "text" : "password"}
              name="password2"
              placeholder="Confirm your password"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword2(!showPassword2)}
              aria-label={showPassword2 ? "Hide password" : "Show password"}
            >
              {showPassword2 ? "◉" : "◌"}
            </button>
          </div>

          <label>Account Type</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="organization">Organization</option>
          </select>

          <button type="submit">Create Account</button>
        </form>

        <p>
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
