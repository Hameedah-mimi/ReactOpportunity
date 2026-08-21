import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();

  const categories = [
    {
      number: "01",
      title: "Scholarships",
      description:
        "Find financial opportunities designed to support your education and academic goals.",
    },
    {
      number: "02",
      title: "Internships",
      description:
        "Discover internships that help you gain practical experience and develop your career.",
    },
    {
      number: "03",
      title: "Competitions",
      description:
        "Take part in challenges where you can showcase your skills and ideas.",
    },
    {
      number: "04",
      title: "Fellowships",
      description:
        "Explore fellowships that connect you with learning, leadership and development opportunities.",
    },
  ];

  const featuredOpportunities = [
    {
      title: "Student Innovation Challenge",
      organization: "Innovation Hub",
      category: "Competition",
      deadline: "September 15, 2026",
    },
    {
      title: "Technology Internship Program",
      organization: "Tech Solutions",
      category: "Internship",
      deadline: "September 30, 2026",
    },
    {
      title: "Future Leaders Scholarship",
      organization: "Education Foundation",
      category: "Scholarship",
      deadline: "October 10, 2026",
    },
  ];

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-content">
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-label">STUDENT OPPORTUNITY HUB</span>

            <h1>
              Discover opportunities.
              <br />
              <span>Build your future.</span>
            </h1>

            <p>
              Find scholarships, internships, competitions, fellowships and
              other opportunities designed to help students grow, learn and
              succeed.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() => navigate("/opportunities")}
              >
                Explore Opportunities
                <span>→</span>
              </button>

              <button
                className="secondary-button"
                onClick={() => navigate("/register")}
              >
                Create an Account
              </button>
            </div>

            <div className="hero-trust">
              <div className="trust-line"></div>

              <span>Opportunities that move you forward</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-logo-container">
              <div className="hero-logo-glow"></div>

              <img
                src={logo}
                alt="Student Opportunity Hub"
                className="hero-logo"
              />
            </div>

            <div className="hero-floating-card card-top">
              <span className="floating-number">01</span>

              <div>
                <strong>Scholarships</strong>

                <small>Education funding</small>
              </div>
            </div>

            <div className="hero-floating-card card-bottom">
              <span className="floating-number">02</span>

              <div>
                <strong>Internships</strong>

                <small>Career experience</small>
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section">
          <div className="section-heading">
            <span>EXPLORE</span>

            <h2>Opportunities for your next chapter.</h2>

            <p>
              Whatever your goals, discover opportunities that can help you take
              the next step.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <div
                className="category-card"
                key={category.number}
                onClick={() => navigate("/opportunities")}
              >
                <span className="category-number">{category.number}</span>

                <div className="category-arrow">→</div>

                <h3>{category.title}</h3>

                <p>{category.description}</p>

                <span className="category-link">
                  Explore opportunities
                  <span>→</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="featured-section">
          <div className="featured-heading">
            <div>
              <span>FEATURED</span>

              <h2>Opportunities worth exploring.</h2>

              <p>Start with some of the opportunities available to students.</p>
            </div>

            <button
              className="view-all-button"
              onClick={() => navigate("/opportunities")}
            >
              View all opportunities
              <span>→</span>
            </button>
          </div>

          <div className="opportunities-grid">
            {featuredOpportunities.map((opportunity, index) => (
              <div className="opportunity-card" key={index}>
                <div className="opportunity-top">
                  <span className="opportunity-category">
                    {opportunity.category}
                  </span>

                  <button
                    className="save-button"
                    type="button"
                    aria-label="Save opportunity"
                  >
                    Save
                  </button>
                </div>

                <h3>{opportunity.title}</h3>

                <p className="organization">{opportunity.organization}</p>

                <div className="opportunity-divider"></div>

                <div className="deadline">
                  <span>APPLICATION DEADLINE</span>

                  <strong>{opportunity.deadline}</strong>
                </div>

                <button
                  className="details-button"
                  onClick={() => navigate("/opportunities")}
                >
                  View Opportunity
                  <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <div className="cta-logo">
            <img
              src={logo}
              alt="Student Opportunity Hub"
              className="cta-logo-image"
            />
          </div>

          <div className="cta-content">
            <span>YOUR NEXT OPPORTUNITY</span>

            <h2>Your future starts with one opportunity.</h2>

            <p>
              Create your account and start discovering opportunities that match
              your goals.
            </p>
          </div>

          <button className="cta-button" onClick={() => navigate("/register")}>
            Get Started
            <span>→</span>
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
