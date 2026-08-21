import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./SavedOpportunities.css";

function SavedOpportunities() {
  const navigate = useNavigate();

  const savedOpportunities = [
    {
      id: 1,
      title: "Future Leaders Scholarship",
      organization: "Education Foundation",
      category: "Scholarship",
      location: "Nigeria",
      deadline: "October 10, 2026",
    },
    {
      id: 2,
      title: "Technology Internship Program",
      organization: "Tech Solutions",
      category: "Internship",
      location: "Lagos, Nigeria",
      deadline: "September 30, 2026",
    },
    {
      id: 3,
      title: "Student Innovation Challenge",
      organization: "Innovation Hub",
      category: "Competition",
      location: "Online",
      deadline: "September 15, 2026",
    },
  ];

  return (
    <div className="saved-page">
      <Navbar />

      <main className="saved-container">
        <div className="saved-header">
          <div>
            <span className="saved-label">MY OPPORTUNITIES</span>

            <h1>Saved Opportunities</h1>

            <p>Keep track of opportunities you want to come back to later.</p>
          </div>

          <button onClick={() => navigate("/opportunities")}>
            Find More Opportunities
          </button>
        </div>

        <div className="saved-count">
          {savedOpportunities.length} Saved Opportunities
        </div>

        <div className="saved-list">
          {savedOpportunities.map((opportunity) => (
            <div className="saved-card" key={opportunity.id}>
              <div className="saved-card-main">
                <span className="saved-category">{opportunity.category}</span>

                <h2>{opportunity.title}</h2>

                <p className="saved-organization">{opportunity.organization}</p>

                <div className="saved-details">
                  <span>Location: {opportunity.location}</span>

                  <span>Deadline: {opportunity.deadline}</span>
                </div>
              </div>

              <div className="saved-actions">
                <button
                  className="view-saved"
                  onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                >
                  View
                </button>

                <button className="remove-saved" type="button">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SavedOpportunities;
