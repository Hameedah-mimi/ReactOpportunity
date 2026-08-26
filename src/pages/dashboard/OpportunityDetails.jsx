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

  useEffect(() => {
    getOpportunity();
  }, [id]);

  const getOpportunity = async () => {
    try {
      const response = await api.get(`opportunities/${id}/`);

      setOpportunity(response.data);
    } catch (error) {
      console.error("Failed to load opportunity:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <Navbar />

        <main className="not-found">
          <h1>Loading...</h1>
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
          <div className="details-header">
            <div>
              <span className="details-category">{opportunity.category}</span>

              <h1>{opportunity.title}</h1>

              <p className="details-organization">
                {opportunity.organization_name}
              </p>
            </div>
          </div>

          <div className="details-info">
            <div className="info-item">
              <span>Location</span>

              <strong>{opportunity.location || "Not specified"}</strong>
            </div>

            <div className="info-item">
              <span>Deadline</span>

              <strong>
                {opportunity.deadline
                  ? new Date(opportunity.deadline).toLocaleDateString()
                  : "Not specified"}
              </strong>
            </div>

            <div className="info-item">
              <span>Funding</span>

              <strong>{opportunity.funding_type || "Not specified"}</strong>
            </div>
          </div>

          <div className="details-body">
            <div className="description-section">
              <h2>About this Opportunity</h2>

              <p>{opportunity.description}</p>
            </div>

            {opportunity.eligibility && (
              <div className="requirements-section">
                <h2>Eligibility</h2>

                <p>{opportunity.eligibility}</p>
              </div>
            )}

            {opportunity.requirements && (
              <div className="requirements-section">
                <h2>Requirements</h2>

                <p>{opportunity.requirements}</p>
              </div>
            )}

            {opportunity.benefits && (
              <div className="requirements-section">
                <h2>Benefits</h2>

                <p>{opportunity.benefits}</p>
              </div>
            )}

            <div className="application-section">
              <h2>Ready to Apply?</h2>

              <p>
                Visit the official application page to learn more and apply.
              </p>

              <button
                className="apply-button"
                type="button"
                onClick={() =>
                  window.open(
                    opportunity.application_url,
                    "_blank",
                    "noopener,noreferrer",
                  )
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
