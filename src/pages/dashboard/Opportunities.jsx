import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Opportunities.css";

function Opportunities() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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
    },
    {
      id: 5,
      title: "Software Development Internship",
      organization: "Digital Labs",
      category: "Internship",
      location: "Abuja, Nigeria",
      deadline: "October 25, 2026",
      description:
        "Develop your programming skills through hands-on software development projects.",
    },
    {
      id: 6,
      title: "Academic Excellence Scholarship",
      organization: "Student Support Foundation",
      category: "Scholarship",
      location: "Nigeria",
      deadline: "December 1, 2026",
      description:
        "Financial support for students who demonstrate academic excellence and commitment to their education.",
    },
  ];

  const categories = [
    "All",
    "Scholarship",
    "Internship",
    "Competition",
    "Fellowship",
  ];

  const filteredOpportunities = opportunities.filter((opportunity) => {
    const matchesSearch =
      opportunity.title.toLowerCase().includes(search.toLowerCase()) ||
      opportunity.organization.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || opportunity.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="opportunities-page">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="opportunities-header">
        <div>
          <span>EXPLORE</span>

          <h1>Discover Opportunities</h1>

          <p>
            Find scholarships, internships, competitions, fellowships and other
            opportunities that can help you achieve your goals.
          </p>
        </div>
      </section>

      {/* SEARCH AND FILTER */}
      <section className="opportunities-content">
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
              {categories.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RESULTS */}
        <div className="results-header">
          <h2>Available Opportunities</h2>

          <span>{filteredOpportunities.length} opportunities</span>
        </div>

        <div className="opportunities-list">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <div className="opportunity-item" key={opportunity.id}>
                <div className="opportunity-item-top">
                  <span className="opportunity-tag">
                    {opportunity.category}
                  </span>

                  <button className="save-opportunity" type="button">
                    Save
                  </button>
                </div>

                <h3>{opportunity.title}</h3>

                <p className="opportunity-organization">
                  {opportunity.organization}
                </p>

                <p className="opportunity-description">
                  {opportunity.description}
                </p>

                <div className="opportunity-meta">
                  <span>Location: {opportunity.location}</span>

                  <span>Deadline: {opportunity.deadline}</span>
                </div>

                <button
                  className="view-opportunity"
                  type="button"
                  onClick={() => navigate(`/opportunities/${opportunity.id}`)}
                >
                  View Opportunity
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No opportunities found</h3>

              <p>Try changing your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Opportunities;
