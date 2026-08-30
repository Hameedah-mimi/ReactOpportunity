import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current user
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const username = user?.username || "Student";

  // Same key used in Opportunities.jsx
  const userKey = user ? user.id || user.email || user.username : "guest";

  const savedKey = `savedOpportunities_${userKey}`;

  useEffect(() => {
    getSavedOpportunities();
  }, [savedKey]);

  const getSavedOpportunities = async () => {
    try {
      setLoading(true);

      // Get saved IDs from localStorage
      const savedIds = JSON.parse(localStorage.getItem(savedKey) || "[]");

      if (savedIds.length === 0) {
        setSavedOpportunities([]);
        return;
      }

      // Get opportunities from Django
      const response = await api.get("opportunities/");

      const data = response.data.results || response.data || [];

      // Match saved IDs with API opportunities
      const saved = data.filter((opportunity) =>
        savedIds.includes(opportunity.id),
      );

      setSavedOpportunities(saved);
    } catch (error) {
      console.error("Failed to load saved opportunities:", error);

      setSavedOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  // Get upcoming deadlines
  const upcomingDeadlines = savedOpportunities
    .filter((opportunity) => {
      if (!opportunity.deadline) return false;

      return new Date(opportunity.deadline) >= new Date();
    })
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const formatCategory = (category) => {
    if (!category) return "Opportunity";

    return category
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-container">
        {/* WELCOME */}
        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-label">STUDENT DASHBOARD</span>

            <h1>Welcome back, {username}</h1>

            <p>
              Keep track of the opportunities you have saved and stay updated
              with important deadlines.
            </p>
          </div>

          <button
            className="dashboard-primary-button"
            onClick={() => navigate("/opportunities")}
          >
            Explore Opportunities
          </button>
        </section>

        {/* STATISTICS */}
        <section className="dashboard-stats">
          <div className="stat-card">
            <span>Saved Opportunities</span>

            <strong>{loading ? "..." : savedOpportunities.length}</strong>

            <p>Opportunities you saved</p>
          </div>

          <div className="stat-card">
            <span>Upcoming Deadlines</span>

            <strong>{loading ? "..." : upcomingDeadlines.length}</strong>

            <p>Saved opportunities with upcoming deadlines</p>
          </div>

          <div className="stat-card">
            <span>Applications</span>

            <strong>0</strong>

            <p>Applications submitted</p>
          </div>
        </section>

        {/* SAVED OPPORTUNITIES */}
        <section className="dashboard-section">
          <div className="section-top">
            <div>
              <span className="dashboard-label">MY SAVED</span>

              <h2>Saved Opportunities</h2>
            </div>

            <button onClick={() => navigate("/opportunities")}>
              Browse All
            </button>
          </div>

          {loading && (
            <div className="dashboard-empty">
              <p>Loading your saved opportunities...</p>
            </div>
          )}

          {!loading && savedOpportunities.length === 0 && (
            <div className="dashboard-empty">
              <h3>No saved opportunities yet</h3>

              <p>
                Save opportunities you are interested in and they will appear
                here.
              </p>

              <button
                className="dashboard-primary-button"
                onClick={() => navigate("/opportunities")}
              >
                Find Opportunities
              </button>
            </div>
          )}

          {!loading && savedOpportunities.length > 0 && (
            <div className="saved-list">
              {savedOpportunities.map((opportunity) => (
                <div className="saved-card" key={opportunity.id}>
                  <div className="saved-card-info">
                    <span className="saved-category">
                      {formatCategory(opportunity.category)}
                    </span>

                    <h3>{opportunity.title}</h3>

                    <p>{opportunity.organization_name || "Organization"}</p>
                  </div>

                  <div className="saved-card-right">
                    <span>Deadline</span>

                    <strong>{formatDate(opportunity.deadline)}</strong>

                    <button
                      onClick={() =>
                        navigate(`/opportunities/${opportunity.id}`)
                      }
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* UPCOMING DEADLINES */}
        <section className="dashboard-section">
          <div className="section-top">
            <div>
              <span className="dashboard-label">DON'T MISS OUT</span>

              <h2>Upcoming Deadlines</h2>
            </div>
          </div>

          {upcomingDeadlines.length === 0 ? (
            <div className="dashboard-empty">
              <h3>No upcoming deadlines</h3>

              <p>
                Save opportunities with upcoming deadlines to keep track of them
                here.
              </p>
            </div>
          ) : (
            <div className="deadline-list">
              {upcomingDeadlines.slice(0, 5).map((opportunity) => (
                <div className="deadline-card" key={opportunity.id}>
                  <div>
                    <h3>{opportunity.title}</h3>

                    <p>{opportunity.organization_name || "Organization"}</p>
                  </div>

                  <div className="deadline-date">
                    <span>Deadline</span>

                    <strong>{formatDate(opportunity.deadline)}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* BOTTOM */}
        <section className="dashboard-bottom">
          <div>
            <span className="dashboard-label">KEEP EXPLORING</span>

            <h2>Find your next opportunity.</h2>

            <p>
              Discover scholarships, internships, competitions, fellowships and
              more.
            </p>
          </div>

          <button onClick={() => navigate("/opportunities")}>
            Browse Opportunities
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
