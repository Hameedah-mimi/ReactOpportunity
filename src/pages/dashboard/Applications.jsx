import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Applications.css";

function Applications() {
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      title: "Technology Internship Program",
      organization: "Tech Solutions",
      category: "Internship",
      dateApplied: "August 15, 2026",
      deadline: "September 30, 2026",
      status: "Pending",
    },
    {
      id: 2,
      title: "Future Leaders Scholarship",
      organization: "Education Foundation",
      category: "Scholarship",
      dateApplied: "August 12, 2026",
      deadline: "October 10, 2026",
      status: "Under Review",
    },
    {
      id: 3,
      title: "Student Innovation Challenge",
      organization: "Innovation Hub",
      category: "Competition",
      dateApplied: "August 8, 2026",
      deadline: "September 15, 2026",
      status: "Accepted",
    },
  ];

  return (
    <div className="applications-page">
      <Navbar />

      <main className="applications-container">
        {/* HEADER */}

        <div className="applications-header">
          <div>
            <span className="applications-label">MY ACTIVITY</span>

            <h1>My Applications</h1>

            <p>
              Track the opportunities you have applied for and monitor your
              application status.
            </p>
          </div>

          <button onClick={() => navigate("/opportunities")}>
            Find Opportunities
          </button>
        </div>

        {/* SUMMARY */}

        <div className="application-summary">
          <div className="summary-card">
            <span>Total Applications</span>
            <strong>{applications.length}</strong>
          </div>

          <div className="summary-card">
            <span>Pending</span>
            <strong>
              {applications.filter((item) => item.status === "Pending").length}
            </strong>
          </div>

          <div className="summary-card">
            <span>Under Review</span>
            <strong>
              {
                applications.filter((item) => item.status === "Under Review")
                  .length
              }
            </strong>
          </div>

          <div className="summary-card">
            <span>Accepted</span>
            <strong>
              {applications.filter((item) => item.status === "Accepted").length}
            </strong>
          </div>
        </div>

        {/* APPLICATION LIST */}

        <section className="applications-list-section">
          <div className="applications-section-header">
            <h2>All Applications</h2>

            <span>{applications.length} applications</span>
          </div>

          <div className="applications-list">
            {applications.map((application) => (
              <div className="application-item" key={application.id}>
                <div className="application-main">
                  <span className="application-category">
                    {application.category}
                  </span>

                  <h3>{application.title}</h3>

                  <p className="application-organization">
                    {application.organization}
                  </p>
                </div>

                <div className="application-meta">
                  <div>
                    <span>Date Applied</span>

                    <strong>{application.dateApplied}</strong>
                  </div>

                  <div>
                    <span>Deadline</span>

                    <strong>{application.deadline}</strong>
                  </div>
                </div>

                <div className="application-actions">
                  <span
                    className={`status ${application.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {application.status}
                  </span>

                  <button
                    onClick={() => navigate(`/opportunities/${application.id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Applications;
