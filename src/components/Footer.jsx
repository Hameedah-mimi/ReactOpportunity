import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <div className="footer-logo" onClick={() => navigate("/")}>
            <div className="footer-logo-icon">
              <img src={logo} alt="Student Opportunity Hub" />
            </div>

            <span>Student Opportunity Hub</span>
          </div>

          <p>
            Helping students discover scholarships, internships, competitions,
            fellowships and other opportunities to build their future.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="LinkedIn">
              in
            </a>

            <a href="#" aria-label="Instagram">
              ig
            </a>

            <a href="#" aria-label="Twitter">
              X
            </a>
          </div>
        </div>

        {/* EXPLORE */}
        <div className="footer-column">
          <h3>Explore</h3>

          <button onClick={() => navigate("/")}>Home</button>

          <button onClick={() => navigate("/opportunities")}>
            Opportunities
          </button>

          <button onClick={() => navigate("/about")}>About Us</button>

          <button onClick={() => navigate("/profile")}>My Profile</button>
        </div>

        {/* OPPORTUNITIES */}
        <div className="footer-column">
          <h3>Opportunities</h3>

          <button
            onClick={() => navigate("/opportunities?category=scholarship")}
          >
            Scholarships
          </button>

          <button
            onClick={() => navigate("/opportunities?category=internship")}
          >
            Internships
          </button>

          <button
            onClick={() => navigate("/opportunities?category=competition")}
          >
            Competitions
          </button>

          <button
            onClick={() => navigate("/opportunities?category=fellowship")}
          >
            Fellowships
          </button>
        </div>

        {/* SUPPORT */}
        <div className="footer-column">
          <h3>Support</h3>

          <button onClick={() => navigate("/help")}>Help Center</button>

          <button onClick={() => navigate("/contact")}>Contact Us</button>

          <button onClick={() => navigate("/faq")}>FAQs</button>

          <button onClick={() => navigate("/feedback")}>Send Feedback</button>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Student Opportunity Hub. All rights reserved.</p>

        <p>Built for students, by students.</p>
      </div>
    </footer>
  );
}

export default Footer;
