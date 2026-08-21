import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./OpportunityDetails.css";

function OpportunityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const opportunities = [
    {
      id: 1,
      title: "Future Leaders Scholarship",
      organization: "Education Foundation",
      category: "Scholarship",
      location: "Nigeria",
      deadline: "October 10, 2026",
      description:
        "A scholarship opportunity for students interested in developing their academic and leadership skills.",
      requirements: [
        "Currently enrolled in an educational institution",
        "Demonstrate academic commitment",
        "Submit a completed application",
        "Provide the required supporting documents",
      ],
    },
    {
      id: 2,
      title: "Technology Internship Program",
      organization: "Tech Solutions",
      category: "Internship",
      location: "Lagos, Nigeria",
      deadline: "September 30, 2026",
      description:
        "Gain practical experience by working with professionals in the technology industry.",
      requirements: [
        "Currently studying a technology-related course",
        "Basic programming knowledge",
        "Good communication skills",
        "Available for the duration of the internship",
      ],
    },
    {
      id: 3,
      title: "Student Innovation Challenge",
      organization: "Innovation Hub",
      category: "Competition",
      location: "Online",
      deadline: "September 15, 2026",
      description:
        "Showcase your ideas and develop innovative solutions to real-world problems.",
      requirements: [
        "Open to students",
        "Submit an original project idea",
        "Complete the application form",
        "Follow the competition guidelines",
      ],
    },
    {
      id: 4,
      title: "Young Professionals Fellowship",
      organization: "Global Development Network",
      category: "Fellowship",
      location: "Online",
      deadline: "November 5, 2026",
      description:
        "Connect with other young professionals and participate in professional development activities.",
      requirements: [
        "Currently enrolled or recently graduated",
        "Strong interest in professional development",
        "Complete the application",
        "Participate in fellowship activities",
      ],
    },
  ];

  const opportunity = opportunities.find((item) => item.id === Number(id));

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

              <p className="details-organization">{opportunity.organization}</p>
            </div>

            <button className="save-button" type="button">
              Save Opportunity
            </button>
          </div>

          <div className="details-info">
            <div className="info-item">
              <span>Location</span>
              <strong>{opportunity.location}</strong>
            </div>

            <div className="info-item">
              <span>Deadline</span>
              <strong>{opportunity.deadline}</strong>
            </div>

            <div className="info-item">
              <span>Category</span>
              <strong>{opportunity.category}</strong>
            </div>
          </div>

          <div className="details-body">
            <div className="description-section">
              <h2>About this Opportunity</h2>

              <p>{opportunity.description}</p>
            </div>

            <div className="requirements-section">
              <h2>Requirements</h2>

              <ul>
                {opportunity.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>

            <div className="application-section">
              <h2>Ready to Apply?</h2>

              <p>
                Make sure you meet the requirements before submitting your
                application.
              </p>

              <button className="apply-button" type="button">
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
