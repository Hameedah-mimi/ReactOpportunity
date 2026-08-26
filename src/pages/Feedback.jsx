import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Feedback.css";

function Feedback() {
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for your feedback!");

    e.target.reset();
    setRating(0);
  };

  return (
    <div className="feedback-page">
      <Navbar />

      <main className="feedback-content">
        {/* HEADER */}
        <section className="feedback-header">
          <span>FEEDBACK</span>

          <h1>Help us improve.</h1>

          <p>
            Your feedback helps us make Opportuna better and more useful for
            students.
          </p>
        </section>

        {/* FEEDBACK FORM */}
        <section className="feedback-section">
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="feedback-name">Your Name</label>

              <input
                type="text"
                id="feedback-name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="feedback-email">Email Address</label>

              <input
                type="email"
                id="feedback-email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* RATING */}
            <div className="form-group">
              <label>How would you rate your experience?</label>

              <div className="rating-options">
                {[1, 2, 3, 4, 5].map((number) => (
                  <button
                    key={number}
                    type="button"
                    className={
                      rating === number
                        ? "rating-button active"
                        : "rating-button"
                    }
                    onClick={() => setRating(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="feedback-type">Feedback Type</label>

              <select id="feedback-type" required>
                <option value="">Select feedback type</option>

                <option value="suggestion">Suggestion</option>

                <option value="problem">Report a Problem</option>

                <option value="experience">User Experience</option>

                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="feedback-message">Your Feedback</label>

              <textarea
                id="feedback-message"
                rows="7"
                placeholder="Tell us what you think..."
                required
              ></textarea>
            </div>

            <button type="submit" className="feedback-submit">
              Submit Feedback
              <span>→</span>
            </button>
          </form>

          {/* SIDE INFORMATION */}
          <div className="feedback-info">
            <span>YOUR VOICE MATTERS</span>

            <h2>Every piece of feedback counts.</h2>

            <p>
              Whether you have an idea for a new feature, found something that
              isn't working properly or simply want to share your experience,
              we'd love to hear from you.
            </p>

            <div className="feedback-points">
              <div>
                <span>01</span>

                <p>Share your experience using the platform.</p>
              </div>

              <div>
                <span>02</span>

                <p>Suggest features that would help students.</p>
              </div>

              <div>
                <span>03</span>

                <p>Let us know when something isn't working.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Feedback;
