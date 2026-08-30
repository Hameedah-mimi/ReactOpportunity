import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import "./OpportunityDetails.css";

function OpportunityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  // Get current user
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Use the SAME key as Opportunities.jsx
  const userKey = user ? user.id || user.email || user.username : "guest";

  const savedKey = `savedOpportunities_${userKey}`;

  // Load opportunity from Django
  useEffect(() => {
    getOpportunity();
  }, [id]);

  // Check if this opportunity is already saved
  useEffect(() => {
    const savedIds = JSON.parse(localStorage.getItem(savedKey) || "[]");

    setSaved(savedIds.includes(Number(id)));
  }, [id, savedKey]);

  const getOpportunity = async () => {
    try {
      setLoading(true);

      const response = await api.get(`opportunities/${id}/`);

      setOpportunity(response.data);
    } catch (error) {
      console.error("Failed to load opportunity:", error);

      setOpportunity(null);
    } finally {
      setLoading(false);
    }
  };

  // Save / remove opportunity
  const toggleSave = () => {
    if (!user) {
      alert("Please log in to save opportunities.");
      navigate("/login");
      return;
    }

    const savedIds = JSON.parse(localStorage.getItem(savedKey) || "[]");

    let updatedIds;

    if (saved) {
      // Remove
      updatedIds = savedIds.filter((savedId) => savedId !== Number(id));
    } else {
      // Save
      updatedIds = [...savedIds, Number(id)];
    }

    localStorage.setItem(savedKey, JSON.stringify(updatedIds));

    setSaved(!saved);
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

  const formatDate = (date) => {
    if (!date) return "Not specified";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="details-page">
        <Navbar />

        <main className="not-found">
          <h2>Loading opportunity...</h2>
        </main>

        <Footer />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="details-page">
        <Navbar />

        <main className="not-found">
          <h1>Opportunity Not Found</h1>

          <p>The opportunity you are looking for does not exist.</p>

          <button onClick={() => navigate("/opportunities")}>
            Back to Opportunities
          </button>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="details-page">
      <Navbar />

      <main className="details-container">
        <button
          className="back-button"
          onClick={() => navigate("/opportunities")}
        >
          ← Back to Opportunities
        </button>

        <section className="details-card">
          {/* HEADER */}
          <div className="details-header">
            <div>
              <span className="details-category">
                {formatCategory(opportunity.category)}
              </span>

              <h1>{opportunity.title}</h1>

              <p className="details-organization">
                {opportunity.organization_name}
              </p>
            </div>

            {/* SAVE BUTTON */}
            <button
              className={`save-button ${saved ? "saved" : ""}`}
              type="button"
              onClick={toggleSave}
            >
              {saved ? "★ Saved" : "☆ Save Opportunity"}
            </button>
          </div>

          {/* INFORMATION */}
          <div className="details-info">
            <div className="info-item">
              <span>Location</span>

              <strong>{opportunity.location || "Not specified"}</strong>
            </div>

            <div className="info-item">
              <span>Deadline</span>

              <strong>{formatDate(opportunity.deadline)}</strong>
            </div>

            <div className="info-item">
              <span>Funding</span>

              <strong>{formatFunding(opportunity.funding_type)}</strong>
            </div>
          </div>

          {/* BODY */}
          <div className="details-body">
            <div className="description-section">
              <h2>About this Opportunity</h2>

              <p>{opportunity.description}</p>
            </div>

            {/* ELIGIBILITY */}
            {opportunity.eligibility && (
              <div className="requirements-section">
                <h2>Eligibility</h2>

                <p>{opportunity.eligibility}</p>
              </div>
            )}

            {/* REQUIREMENTS */}
            {opportunity.requirements && (
              <div className="requirements-section">
                <h2>Requirements</h2>

                <p>{opportunity.requirements}</p>
              </div>
            )}

            {/* BENEFITS */}
            {opportunity.benefits && (
              <div className="requirements-section">
                <h2>Benefits</h2>

                <p>{opportunity.benefits}</p>
              </div>
            )}

            {/* APPLICATION */}
            <div className="application-section">
              <h2>Ready to Apply?</h2>

              <p>
                Make sure you meet the requirements before submitting your
                application.
              </p>

              <button
                className="apply-button"
                type="button"
                onClick={() =>
                  window.open(opportunity.application_url, "_blank")
                }
              >
                Apply Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default OpportunityDetails;
