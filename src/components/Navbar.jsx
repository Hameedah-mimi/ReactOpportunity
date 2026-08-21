import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar position-sticky top-0">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="project-name">Student Opportunity Hub</span>
      </div>

      <div className="navbar-links">
        <button onClick={() => navigate("/")}>Home</button>

        <button onClick={() => navigate("/opportunities")}>
          Opportunities
        </button>

        <button onClick={() => navigate("/about")}>About</button>
      </div>

      <div className="navbar-actions">
        <button className="login-button" onClick={() => navigate("/login")}>
          Login
        </button>

        <button className="signup-button" onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
