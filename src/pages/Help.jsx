import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Help.css";

function Help() {
  return (
    <div className="help-page">
      <Navbar />

      <main className="help-content">
        {/* HEADER */}
        <section className="help-header">
          <span>SUPPORT</span>

          <h1>How can we help?</h1>

          <p>
            Find answers to common questions and learn how to make the most of
            Student Opportunity Hub.
          </p>
        </section>

        {/* HELP OPTIONS */}
        <section className="help-grid">
          <div className="help-card">
            <span className="help-number">01</span>

            <h2>Finding Opportunities</h2>

            <p>
              Learn how to search for scholarships, internships, competitions
              and fellowships that match your goals.
            </p>

            <button>Learn More →</button>
          </div>

          <div className="help-card">
            <span className="help-number">02</span>

            <h2>Managing Your Account</h2>

            <p>
              Get help with creating your account, updating your profile and
              managing your preferences.
            </p>

            <button>Learn More →</button>
          </div>

          <div className="help-card">
            <span className="help-number">03</span>

            <h2>Saving Opportunities</h2>

            <p>
              Learn how to save opportunities so you can easily return to them
              later.
            </p>

            <button>Learn More →</button>
          </div>

          <div className="help-card">
            <span className="help-number">04</span>

            <h2>Application Information</h2>

            <p>
              Understand how to view opportunity details and find the
              information you need before applying.
            </p>

            <button>Learn More →</button>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="help-contact">
          <div>
            <span>STILL NEED HELP?</span>

            <h2>We're here to help.</h2>

            <p>
              If you can't find what you're looking for, get in touch with our
              support team.
            </p>
          </div>

          <a href="/contact">Contact Us →</a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Help;
