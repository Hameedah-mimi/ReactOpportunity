import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <Navbar />

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-label">ABOUT Opportuna</span>

          <h1>
            Connecting Students With
            <span> Opportunities That Matter.</span>
          </h1>

          <p>
            Opportuna is a platform designed to help students discover
            opportunities that can support their academic, professional, and
            personal development.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-section">
        <div className="about-section-content">
          <div className="about-text">
            <span className="section-label">OUR MISSION</span>

            <h2>Making opportunities easier to discover.</h2>

            <p>
              Students often have to search through different websites and
              platforms to find scholarships, internships, competitions, and
              fellowships.
            </p>

            <p>
              Opportuna brings these opportunities together in one place, making
              it easier for students to discover options that match their
              interests, skills, and goals.
            </p>
          </div>

          <div className="about-highlight">
            <div className="highlight-number">01</div>

            <h3>One Platform</h3>

            <p>
              A centralized platform where students can discover different types
              of opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="about-offers">
        <div className="section-heading">
          <span className="section-label">WHAT WE OFFER</span>

          <h2>Opportunities for every stage of your journey.</h2>

          <p>
            Explore opportunities designed to help you learn, gain experience,
            develop your skills, and move closer to your goals.
          </p>
        </div>

        <div className="about-offers-grid">
          <div className="about-offer-card">
            <div className="offer-number">01</div>

            <h3>Scholarships</h3>

            <p>
              Discover scholarship opportunities that can help support your
              educational journey.
            </p>
          </div>

          <div className="about-offer-card">
            <div className="offer-number">02</div>

            <h3>Internships</h3>

            <p>
              Find internships that allow you to gain practical experience and
              develop professional skills.
            </p>
          </div>

          <div className="about-offer-card">
            <div className="offer-number">03</div>

            <h3>Competitions</h3>

            <p>
              Discover competitions where you can challenge yourself and
              showcase your abilities.
            </p>
          </div>

          <div className="about-offer-card">
            <div className="offer-number">04</div>

            <h3>Fellowships</h3>

            <p>
              Explore fellowships that provide opportunities for learning,
              networking, and professional growth.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-heading">
          <span className="section-label">HOW IT WORKS</span>

          <h2>Find your next opportunity in a few simple steps.</h2>
        </div>

        <div className="steps-container">
          <div className="step">
            <div className="step-number">01</div>

            <div>
              <h3>Create an Account</h3>

              <p>Sign up and create your student profile.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>

            <div>
              <h3>Explore Opportunities</h3>

              <p>
                Browse scholarships, internships, competitions, and fellowships.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>

            <div>
              <h3>Find What Fits You</h3>

              <p>Use categories and search to find relevant opportunities.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">04</div>

            <div>
              <h3>Apply</h3>

              <p>
                Review the requirements and apply for opportunities that
                interest you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div>
          <h2>Ready to discover your next opportunity?</h2>

          <p>
            Start exploring opportunities and take the next step toward your
            goals.
          </p>
        </div>

        <button onClick={() => navigate("/opportunities")}>
          Explore Opportunities
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default About;
