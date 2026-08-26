import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import "./Opportunities.css";

function Opportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getOpportunities();
  }, [search, category]);

  const getOpportunities = async () => {
    try {
      setLoading(true);

      const response = await api.get("opportunities/", {
        params: {
          search: search || undefined,
          category: category || undefined,
        },
      });

      const data = response.data.results || response.data;

      setOpportunities(data);
    } catch (error) {
      console.error("Failed to load opportunities:", error);
    } finally {
      setLoading(false);
    }
  };

  const isNew = (date) => {
    if (!date) return false;

    const difference = Date.now() - new Date(date).getTime();

    return difference <= 7 * 24 * 60 * 60 * 1000;
  };

  return (
    <div className="opportunities-page">
      <Navbar />

      <header className="opportunities-header">
        <span>DISCOVER</span>

        <h1>Find Your Next Opportunity</h1>

        <p>
          Discover scholarships, internships, competitions, fellowships and
          more.
        </p>
      </header>

      <main className="opportunities-content">
        <div className="search-filter">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="category-filter">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>

              <option value="scholarship">Scholarships</option>

              <option value="internship">Internships</option>

              <option value="competition">Competitions</option>

              <option value="fellowship">Fellowships</option>

              <option value="grant">Grants</option>

              <option value="hackathon">Hackathons</option>
            </select>
          </div>
        </div>

        <div className="results-header">
          <h2>Available Opportunities</h2>

          <span>{opportunities.length} opportunities</span>
        </div>

        {loading && (
          <div className="no-results">
            <h3>Loading opportunities...</h3>
          </div>
        )}

        {!loading && opportunities.length === 0 && (
          <div className="no-results">
            <h3>No opportunities found</h3>

            <p>Try another search or category.</p>
          </div>
        )}

        {!loading && opportunities.length > 0 && (
          <div className="opportunities-list">
            {opportunities.map((opportunity) => (
              <div className="opportunity-item" key={opportunity.id}>
                <div className="opportunity-item-top">
                  <span className="opportunity-tag">
                    {opportunity.category}
                  </span>

                  {isNew(opportunity.created_at) && (
                    <span className="opportunity-tag">New</span>
                  )}
                </div>

                <h3>{opportunity.title}</h3>

                <p className="opportunity-organization">
                  {opportunity.organization_name}
                </p>

                <p className="opportunity-description">
                  {opportunity.description}
                </p>

                <div className="opportunity-meta">
                  <span>
                    Location: {opportunity.location || "Not specified"}
                  </span>

                  <span>
                    Deadline:{" "}
                    {opportunity.deadline
                      ? new Date(opportunity.deadline).toLocaleDateString()
                      : "Not specified"}
                  </span>

                  <span>Source: {opportunity.source || "Opportuna"}</span>
                </div>

                <button
                  className="view-opportunity"
                  onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                >
                  View Opportunity
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Opportunities;
