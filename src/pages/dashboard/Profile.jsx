import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./Profile.css";

function Profile() {
  // Get logged-in user
  const storedUser = localStorage.getItem("user");
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

  // Get previously saved profile
  const storedProfile = localStorage.getItem("profile");
  const savedProfile = storedProfile ? JSON.parse(storedProfile) : {};

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    username: loggedInUser?.username || "",
    email: loggedInUser?.email || "",
    role: loggedInUser?.role || "student",

    phone: savedProfile.phone || "",
    location: savedProfile.location || "",

    institution: savedProfile.institution || "",
    fieldOfStudy: savedProfile.fieldOfStudy || "",
    levelOfStudy: savedProfile.levelOfStudy || "Undergraduate",
    graduationYear: savedProfile.graduationYear || "",

    skills: savedProfile.skills || [],
    interests: savedProfile.interests || [],
  });

  // Handle text/select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  // Handle skills
  const handleSkillChange = (skill) => {
    setProfile((previous) => {
      const alreadySelected = previous.skills.includes(skill);

      return {
        ...previous,
        skills: alreadySelected
          ? previous.skills.filter((item) => item !== skill)
          : [...previous.skills, skill],
      };
    });
  };

  // Handle interests
  const handleInterestChange = (interest) => {
    setProfile((previous) => {
      const alreadySelected = previous.interests.includes(interest);

      return {
        ...previous,
        interests: alreadySelected
          ? previous.interests.filter((item) => item !== interest)
          : [...previous.interests, interest],
      };
    });
  };

  // Save profile
  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(profile));

    // Also update username/email in the stored user
    const updatedUser = {
      ...loggedInUser,
      username: profile.username,
      email: profile.email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setIsEditing(false);

    alert("Profile updated successfully.");
  };

  // If no user is logged in
  if (!loggedInUser) {
    return (
      <div className="profile-page">
        <Navbar />

        <main className="profile-container">
          <div className="profile-section">
            <h2>You are not logged in</h2>

            <p>Please log in to view and manage your profile.</p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">
        {/* PROFILE HEADER */}
        <div className="profile-header">
          <div>
            <span className="profile-label">MY PROFILE</span>

            <h1>{profile.username}</h1>

            <p>
              Manage your personal information, education, skills, and
              interests.
            </p>
          </div>

          <button
            className="edit-profile-button"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
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
              <label>Username</label>

              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                placeholder="+234 000 000 0000"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="Lagos, Nigeria"
                value={profile.location}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Account Type</label>

              <input type="text" value={profile.role} disabled />
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
                name="institution"
                placeholder="Your Institution"
                value={profile.institution}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Field of Study</label>

              <input
                type="text"
                name="fieldOfStudy"
                placeholder="Software Development"
                value={profile.fieldOfStudy}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-field">
              <label>Level of Study</label>

              <select
                name="levelOfStudy"
                value={profile.levelOfStudy}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="Undergraduate">Undergraduate</option>

                <option value="Postgraduate">Postgraduate</option>

                <option value="Secondary School">Secondary School</option>

                <option value="Other">Other</option>
              </select>
            </div>

            <div className="profile-field">
              <label>Graduation Year</label>

              <input
                type="text"
                name="graduationYear"
                placeholder="2027"
                value={profile.graduationYear}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="profile-section">
          <div className="profile-section-title">
            <h2>Skills</h2>

            <p>
              Select skills that can help us recommend relevant opportunities.
            </p>
          </div>

          <div className="skills-list">
            {[
              "Python",
              "Django",
              "React",
              "Flutter",
              "UI/UX Design",
              "Cybersecurity",
              "JavaScript",
              "HTML/CSS",
            ].map((skill) => (
              <button
                type="button"
                key={skill}
                className={
                  profile.skills.includes(skill) ? "skill active" : "skill"
                }
                onClick={() => {
                  if (isEditing) {
                    handleSkillChange(skill);
                  }
                }}
              >
                {skill}
              </button>
            ))}
          </div>
        </section>

        {/* INTERESTS */}
        <section className="profile-section">
          <div className="profile-section-title">
            <h2>Areas of Interest</h2>

            <p>Select the types of opportunities you are interested in.</p>
          </div>

          <div className="interest-grid">
            {["Scholarships", "Internships", "Competitions", "Fellowships"].map(
              (interest) => (
                <label className="interest-option" key={interest}>
                  <input
                    type="checkbox"
                    checked={profile.interests.includes(interest)}
                    disabled={!isEditing}
                    onChange={() => handleInterestChange(interest)}
                  />

                  {interest}
                </label>
              ),
            )}
          </div>
        </section>

        {/* SAVE BUTTON */}
        {isEditing && (
          <div className="profile-save-area">
            <button className="save-profile-button" onClick={handleSave}>
              Save Changes
            </button>

            <button
              className="cancel-profile-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
