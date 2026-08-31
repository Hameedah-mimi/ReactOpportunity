import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import "./Home.css";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Get opportunities from Django API
  useEffect(() => {
    const getOpportunities = async () => {
      try {
        const response = await api.get("opportunities/");

        const data = response.data.results || response.data;

        setOpportunities(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load opportunities:", error);
        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    };

    getOpportunities();
  }, []);

  const formatCategory = (category) => {
    if (!category) return "Opportunity";

    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const formatFunding = (funding) => {
    if (!funding) return "Not specified";

    return funding
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const formatDeadline = (deadline) => {
    if (!deadline) return "Not specified";

    return new Date(deadline).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Users must log in before viewing details
  const handleViewOpportunity = (id) => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate(`/opportunities/${id}`);
  };

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
        "Gain practical experience and develop valuable skills for your future career.",
    },
    {
      number: "03",
      title: "Competitions",
      description:
        "Showcase your ideas, skills and creativity through exciting challenges.",
    },
    {
      number: "04",
      title: "Fellowships",
      description:
        "Connect with learning, leadership and professional development opportunities.",
    },
  ];

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-content">
        {/* HERO */}
        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-label">OPPORTUNA</span>

            <h1>
              Discover opportunities.
              <br />
              <span>Build your future.</span>
            </h1>

            <p>
              Find scholarships, internships, competitions, fellowships and
              other opportunities designed to help students learn, grow and move
              forward.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-button"
                onClick={() => navigate("/login")}
              >
                Explore Opportunities
                <span>→</span>
              </button>

              {!user && (
                <button
                  className="secondary-button"
                  onClick={() => navigate("/register")}
                >
                  Create an Account
                </button>
              )}
            </div>

            <div className="hero-trust">
              <div className="trust-line"></div>

              <span>Opportunities that move you forward</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-logo-container">
              <div className="hero-logo-glow"></div>

              <img src={logo} alt="Opportuna" className="hero-logo" />
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

        {/* CATEGORIES */}
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
                onClick={() => navigate("/login")}
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

        {/* API OPPORTUNITIES */}
        <section className="featured-section">
          <div className="featured-heading">
            <div>
              <span>LATEST OPPORTUNITIES</span>

              <h2>Find something worth pursuing.</h2>

              <p>
                Explore some of the latest opportunities available on Opportuna.
              </p>
            </div>

            <button
              className="view-all-button"
              onClick={() => navigate("/login")}
            >
              View all opportunities
              <span>→</span>
            </button>
          </div>

          {loading && (
            <div className="home-opportunity-message">
              <h3>Loading opportunities...</h3>
              <p>Finding the latest opportunities for you.</p>
            </div>
          )}

          {!loading && opportunities.length === 0 && (
            <div className="home-opportunity-message">
              <h3>No opportunities available</h3>
              <p>New opportunities will appear here when they are added.</p>
            </div>
          )}

          {!loading && opportunities.length > 0 && (
            <div className="opportunities-grid">
              {opportunities.map((opportunity) => (
                <article className="opportunity-card" key={opportunity.id}>
                  <div className="opportunity-top">
                    <span className="opportunity-category">
                      {formatCategory(opportunity.category)}
                    </span>

                    <span className="home-api-badge">Available</span>
                  </div>

                  <h3>{opportunity.title}</h3>

                  <p className="organization">
                    {opportunity.organization_name || "Organization"}
                  </p>

                  <p className="home-opportunity-description">
                    {opportunity.description
                      ? opportunity.description.length > 120
                        ? `${opportunity.description.substring(0, 120)}...`
                        : opportunity.description
                      : "Explore this opportunity to learn more."}
                  </p>

                  <div className="opportunity-divider"></div>

                  <div className="home-opportunity-meta">
                    <div>
                      <span>DEADLINE</span>
                      <strong>{formatDeadline(opportunity.deadline)}</strong>
                    </div>

                    <div>
                      <span>FUNDING</span>
                      <strong>{formatFunding(opportunity.funding_type)}</strong>
                    </div>
                  </div>

                  <button
                    className="details-button"
                    onClick={() => handleViewOpportunity(opportunity.id)}
                  >
                    {user ? "View Opportunity" : "Sign in to view"}
                    <span>→</span>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section">
          <div className="section-heading">
            <span>HOW IT WORKS</span>

            <h2>From discovery to opportunity.</h2>

            <p>
              Opportuna makes it simple to discover and keep track of
              opportunities that matter to you.
            </p>
          </div>

          <div className="how-grid">
            <div className="how-card">
              <span>01</span>

              <h3>Discover</h3>

              <p>
                Browse scholarships, internships, competitions, fellowships and
                more.
              </p>
            </div>

            <div className="how-card">
              <span>02</span>

              <h3>Save</h3>

              <p>
                Create an account and save opportunities you want to come back
                to later.
              </p>
            </div>

            <div className="how-card">
              <span>03</span>

              <h3>Apply</h3>

              <p>
                Review the requirements and apply directly through the
                opportunity provider.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        {!user && (
          <section className="cta-section">
            <div className="cta-logo">
              <img src={logo} alt="Opportuna" className="cta-logo-image" />
            </div>

            <div className="cta-content">
              <span>YOUR NEXT OPPORTUNITY</span>

              <h2>Your future starts with one opportunity.</h2>

              <p>
                Create your account and start discovering opportunities that
                match your goals.
              </p>
            </div>

            <button
              className="cta-button"
              onClick={() => navigate("/register")}
            >
              Get Started
              <span>→</span>
            </button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
