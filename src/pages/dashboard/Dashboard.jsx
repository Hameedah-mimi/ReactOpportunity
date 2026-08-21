import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const recommendedOpportunities = [
    {
      id: 1,
      title: "Future Leaders Scholarship",
      organization: "Education Foundation",
      category: "Scholarship",
      deadline: "October 10, 2026",
    },
    {
      id: 2,
      title: "Technology Internship Program",
      organization: "Tech Solutions",
      category: "Internship",
      deadline: "September 30, 2026",
    },
    {
      id: 3,
      title: "Student Innovation Challenge",
      organization: "Innovation Hub",
      category: "Competition",
      deadline: "September 15, 2026",
    },
  ];

  const recentApplications = [
    {
      title: "Technology Internship Program",
      organization: "Tech Solutions",
      status: "Pending",
    },
    {
      title: "Future Leaders Scholarship",
      organization: "Education Foundation",
      status: "Under Review",
    },
  ];

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-container">
        {/* WELCOME */}

        <section className="dashboard-welcome">
          <div>
            <span className="dashboard-label">STUDENT DASHBOARD</span>

            <h1>Welcome back, Student</h1>

            <p>
              Keep track of your opportunities, applications, and important
              deadlines.
            </p>
          </div>

          <button
            className="explore-button"
            onClick={() => navigate("/opportunities")}
          >
            Explore Opportunities
          </button>
        </section>

        {/* STATISTICS */}

        <section className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-title">Saved Opportunities</span>

            <strong>8</strong>

            <p>Opportunities saved</p>
          </div>

          <div className="stat-card">
            <span className="stat-title">Applications</span>

            <strong>4</strong>

            <p>Applications submitted</p>
          </div>

          <div className="stat-card">
            <span className="stat-title">Upcoming Deadlines</span>

            <strong>3</strong>

            <p>Deadlines approaching</p>
          </div>

          <div className="stat-card">
            <span className="stat-title">Recommended</span>

            <strong>6</strong>

            <p>Opportunities for you</p>
          </div>
        </section>

        {/* MAIN DASHBOARD GRID */}

        <section className="dashboard-grid">
          {/* RECOMMENDED */}

          <div className="dashboard-section">
            <div className="section-top">
              <div>
                <span className="dashboard-label">FOR YOU</span>

                <h2>Recommended Opportunities</h2>
              </div>

              <button onClick={() => navigate("/opportunities")}>
                View All
              </button>
            </div>

            <div className="recommended-list">
              {recommendedOpportunities.map((opportunity) => (
                <div className="recommended-card" key={opportunity.id}>
                  <div className="recommended-info">
                    <span className="opportunity-category">
                      {opportunity.category}
                    </span>

                    <h3>{opportunity.title}</h3>

                    <p>{opportunity.organization}</p>
                  </div>

                  <div className="recommended-right">
                    <span>Deadline</span>

                    <strong>{opportunity.deadline}</strong>

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
          </div>

          {/* APPLICATIONS */}

          <div className="dashboard-section applications-section">
            <div className="section-top">
              <div>
                <span className="dashboard-label">ACTIVITY</span>

                <h2>Recent Applications</h2>
              </div>

              <button onClick={() => navigate("/applications")}>
                View All
              </button>
            </div>

            <div className="applications-list">
              {recentApplications.map((application, index) => (
                <div className="application-card" key={index}>
                  <div>
                    <h3>{application.title}</h3>

                    <p>{application.organization}</p>
                  </div>

                  <span className="application-status">
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEADLINE SECTION */}

        <section className="deadline-section">
          <div className="deadline-content">
            <span className="dashboard-label">DON'T MISS OUT</span>

            <h2>Keep an eye on your deadlines</h2>

            <p>
              Stay organized and make sure you submit your applications before
              the deadlines.
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
