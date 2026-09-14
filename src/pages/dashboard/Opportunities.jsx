import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import "./Opportunities.css";

function Opportunities() {
  const navigate = useNavigate();

  const [opportunities, setOpportunities] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Get current user
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Give every user their own saved-opportunities key
  const userKey = user ? user.id || user.email || user.username : "guest";

  const savedKey = `savedOpportunities_${userKey}`;

  // Load saved opportunities for this user
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(savedKey) || "[]");

    setSavedIds(saved);
  }, [savedKey]);

  // Load opportunities only once
  useEffect(() => {
    getOpportunities();
  }, []);

  // Get opportunities from Django
  const getOpportunities = async () => {
    try {
      setLoading(true);

      const response = await api.get("opportunities/");

      const data = response.data.results || response.data;

      setOpportunities(data);
    } catch (error) {
      console.error("Failed to load opportunities:", error);
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  // FRONTEND SEARCH + CATEGORY FILTER
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      !search ||
      opportunity.title?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      !category ||
      opportunity.category?.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Save or remove an opportunity
  const toggleSave = (opportunityId) => {
    if (!user) {
      alert("Please log in to save opportunities.");
      navigate("/login");
      return;
    }

    let updatedSavedIds;

    if (savedIds.includes(opportunityId)) {
      updatedSavedIds = savedIds.filter((id) => id !== opportunityId);
    } else {
      updatedSavedIds = [...savedIds, opportunityId];
    }

    setSavedIds(updatedSavedIds);

    localStorage.setItem(savedKey, JSON.stringify(updatedSavedIds));
  };

  const isNew = (date) => {
    if (!date) return false;

    const difference = Date.now() - new Date(date).getTime();

    return difference >= 0 && difference <= 7 * 24 * 60 * 60 * 1000;
  };

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

  return (
    <div className="opportunities-page">
      <Navbar />

      <header className="opportunities-header">
        <div className="header-content">
          <span>DISCOVER</span>

          <h1>Find Your Next Opportunity</h1>

          <p>
            Discover scholarships, internships, competitions, fellowships and
            more opportunities designed to help you grow.
          </p>
        </div>
      </header>

      <main className="opportunities-content">
        {/* SEARCH AND FILTER */}
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

              <option value="competition">Competitions</option>

              <option value="internship">Internships</option>

              <option value="scholarship">Scholarships</option>

              <option value="fellowship">Fellowships</option>
            </select>
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="results-header">
          <div>
            <span className="section-label">OPPORTUNITIES</span>

            <h2>Available Opportunities</h2>
          </div>

          <span className="results-count">
            {filteredOpportunities.length} opportunities
          </span>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="no-results">
            <div className="loading-spinner"></div>

            <h3>Loading opportunities...</h3>

            <p>Please wait while we find the latest opportunities.</p>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && filteredOpportunities.length === 0 && (
          <div className="no-results">
            <h3>No opportunities found</h3>

            <p>Try another search term or select a different category.</p>
          </div>
        )}

        {/* OPPORTUNITIES */}
        {!loading && filteredOpportunities.length > 0 && (
          <div className="opportunities-list">
            {filteredOpportunities.map((opportunity) => {
              const saved = savedIds.includes(opportunity.id);

              return (
                <article className="opportunity-item" key={opportunity.id}>
                  {/* TOP */}
                  <div className="opportunity-item-top">
                    <span className="opportunity-tag">
                      {formatCategory(opportunity.category)}
                    </span>

                    <div className="opportunity-actions">
                      {isNew(opportunity.created_at) && (
                        <span className="new-tag">New</span>
                      )}

                      <button
                        className={`save-opportunity ${saved ? "saved" : ""}`}
                        onClick={() => toggleSave(opportunity.id)}
                        aria-label={
                          saved
                            ? "Remove saved opportunity"
                            : "Save opportunity"
                        }
                      >
                        <span className="save-icon">{saved ? "★" : "☆"}</span>

                        {saved ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3>{opportunity.title}</h3>

                  {/* ORGANIZATION */}
                  <p className="opportunity-organization">
                    {opportunity.organization_name}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="opportunity-description">
                    {opportunity.description}
                  </p>

                  {/* META */}
                  <div className="opportunity-meta">
                    <div>
                      <span>Location</span>

                      <strong>{opportunity.location || "Not specified"}</strong>
                    </div>

                    <div>
                      <span>Deadline</span>

                      <strong>
                        {opportunity.deadline
                          ? new Date(opportunity.deadline).toLocaleDateString()
                          : "Not specified"}
                      </strong>
                    </div>

                    <div>
                      <span>Funding</span>

                      <strong>{formatFunding(opportunity.funding_type)}</strong>
                    </div>
                  </div>

                  {/* VIEW BUTTON */}
                  <button
                    className="view-opportunity"
                    onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                  >
                    View Opportunity
                    <span>→</span>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Opportunities;
