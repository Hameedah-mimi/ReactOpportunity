import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <Navbar />

      <main>
        {/* HERO */}

        <section className="contact-hero">
          <div>
            <span className="contact-label">GET IN TOUCH</span>

            <h1>We'd love to hear from you.</h1>

            <p>
              Have a question, suggestion, or need help with Student Opportunity
              Hub? Send us a message and we'll get back to you.
            </p>
          </div>
        </section>

        {/* CONTACT CONTENT */}

        <section className="contact-section">
          <div className="contact-grid">
            {/* CONTACT INFORMATION */}

            <div className="contact-info">
              <span className="contact-label">CONTACT INFORMATION</span>

              <h2>Let's talk.</h2>

              <p>
                Whether you need assistance finding an opportunity or want to
                share feedback about the platform, we're here to help.
              </p>

              <div className="contact-item">
                <div className="contact-icon">@</div>

                <div>
                  <span>Email</span>
                  <strong>support@studentopportunityhub.com</strong>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">?</div>

                <div>
                  <span>Support</span>
                  <strong>Student Support Team</strong>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">24</div>

                <div>
                  <span>Response Time</span>
                  <strong>Within 24–48 hours</strong>
                </div>
              </div>
            </div>

            {/* FORM */}

            <div className="contact-form-card">
              <h2>Send us a message</h2>

              <p>Fill in the form below and we'll get back to you.</p>

              <form onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label>Name</label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label>Subject</label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="What is your message about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label>Message</label>

                  <textarea
                    name="message"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="contact-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
