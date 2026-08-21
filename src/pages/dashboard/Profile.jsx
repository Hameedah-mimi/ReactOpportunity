import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">
        <div className="profile-header">
          <div>
            <span className="profile-label">MY PROFILE</span>

            <h1>Student Profile</h1>

            <p>
              Manage your personal information, education, skills, and
              interests.
            </p>
          </div>

          <button
            className="edit-profile-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* PERSONAL INFORMATION */}

        <section className="profile-section">
          <div className="profile-section-title">
            <h2>Personal Information</h2>
            <p>Your basic account information.</p>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <label>Full Name</label>

              <input
                type="text"
                defaultValue="Student Name"
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Email Address</label>

              <input
                type="email"
                defaultValue="student@example.com"
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Phone Number</label>

              <input
                type="text"
                defaultValue="+234 000 000 0000"
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Location</label>

              <input
                type="text"
                defaultValue="Lagos, Nigeria"
                disabled={!isEditing}
              />
            </div>
          </div>
        </section>

        {/* EDUCATION */}

        <section className="profile-section">
          <div className="profile-section-title">
            <h2>Education</h2>
            <p>Tell us about your educational background.</p>
          </div>

          <div className="profile-grid">
            <div className="profile-field">
              <label>Institution</label>

              <input
                type="text"
                defaultValue="Your Institution"
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Field of Study</label>

              <input
                type="text"
                defaultValue="Software Development"
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Level of Study</label>

              <select disabled={!isEditing} defaultValue="Undergraduate">
                <option>Undergraduate</option>
                <option>Postgraduate</option>
                <option>Secondary School</option>
                <option>Other</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Graduation Year</label>

              <input type="text" defaultValue="2027" disabled={!isEditing} />
            </div>
          </div>
        </section>

        {/* SKILLS */}

        <section className="profile-section">
          <div className="profile-section-title">
            <h2>Skills</h2>

            <p>Add skills that can help us recommend relevant opportunities.</p>
          </div>

          <div className="skills-list">
            <span>Python</span>
            <span>Django</span>
            <span>React</span>
            <span>Flutter</span>
            <span>UI/UX Design</span>
            <span>Cybersecurity</span>
          </div>
        </section>

        {/* INTERESTS */}

        <section className="profile-section">
          <div className="profile-section-title">
            <h2>Areas of Interest</h2>

            <p>Select the types of opportunities you are interested in.</p>
          </div>

          <div className="interest-grid">
            <label className="interest-option">
              <input type="checkbox" defaultChecked />
              Scholarships
            </label>

            <label className="interest-option">
              <input type="checkbox" defaultChecked />
              Internships
            </label>

            <label className="interest-option">
              <input type="checkbox" />
              Competitions
            </label>

            <label className="interest-option">
              <input type="checkbox" />
              Fellowships
            </label>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
