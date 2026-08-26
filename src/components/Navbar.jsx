import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("access") !== null;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setMenuOpen(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className="navbar-logo"
          onClick={closeMenu}
        >
          <img src={logo} alt="Opportuna" />
        </Link>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* NAVIGATION */}
        <div className="navbar-links">
          {/* DESKTOP / MOBILE DROPDOWN LINKS */}
          <div className={`main-links ${menuOpen ? "open" : ""}`}>
            {!isLoggedIn ? (
              <>
                <Link to="/" className="nav-link" onClick={closeMenu}>
                  Home
                </Link>

                <Link
                  to="/opportunities"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Opportunities
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-link" onClick={closeMenu}>
                  Dashboard
                </Link>

                <Link
                  to="/opportunities"
                  className="nav-link"
                  onClick={closeMenu}
                >
                  Opportunities
                </Link>

                <Link to="/profile" className="nav-link" onClick={closeMenu}>
                  Profile
                </Link>

                <Link to="/contact" className="nav-link" onClick={closeMenu}>
                  Contact
                </Link>

                <Link to="/notifications" className="nav-link">
                  Notifications
                </Link>
              </>
            )}
          </div>

          {/* AUTH BUTTONS */}
          <div className="auth-links">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="login-btn">
                  Login
                </Link>

                <Link to="/register" className="signup-btn">
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
