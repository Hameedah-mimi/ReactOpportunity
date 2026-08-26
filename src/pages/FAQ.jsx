import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./FAQ.css";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Opportuna?",
      answer:
        "Opportuna is a platform that helps students discover scholarships, internships, competitions, fellowships and other opportunities in one place.",
    },
    {
      question: "How can I find an opportunity?",
      answer:
        "Go to the Opportunities page and browse the available opportunities. You can explore different categories and view the details of each opportunity.",
    },
    {
      question: "Do I need an account to view opportunities?",
      answer:
        "You can browse available opportunities without an account. Creating an account gives you access to features such as managing your profile and saving opportunities.",
    },
    {
      question: "Can I save an opportunity?",
      answer:
        "Yes. Once you have an account, you can save opportunities that you are interested in and return to them later from your profile.",
    },
    {
      question: "Does Opportuna provide the opportunities?",
      answer:
        "The platform helps students discover opportunities provided by different organizations. Application requirements and deadlines are determined by the organization offering the opportunity.",
    },
    {
      question: "How do I apply for an opportunity?",
      answer:
        "Open the opportunity you are interested in and review its requirements, deadline and application information. Follow the provided application instructions to apply.",
    },
    {
      question: "What if I find incorrect information?",
      answer:
        "If you notice incorrect or outdated information, please contact us and provide the details so they can be reviewed.",
    },
    {
      question: "How can I contact Opportuna?",
      answer:
        "You can contact us through the Contact Us page. Send your message and our support team will review it.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <Navbar />

      <main className="faq-content">
        {/* HEADER */}
        <section className="faq-header">
          <span>SUPPORT</span>

          <h1>Frequently asked questions.</h1>

          <p>
            Find answers to common questions about Opportuna and how to use the
            platform.
          </p>
        </section>

        {/* FAQ LIST */}
        <section className="faq-list">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${openIndex === index ? "faq-open" : ""}`}
              key={index}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                type="button"
              >
                <div>
                  <span className="faq-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="faq-question-text">{faq.question}</span>
                </div>

                <span className="faq-icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* CONTACT CTA */}
        <section className="faq-contact">
          <div>
            <span>STILL HAVE QUESTIONS?</span>

            <h2>Can't find what you're looking for?</h2>

            <p>
              Our support team is available to help you with any questions or
              problems.
            </p>
          </div>

          <a href="/contact">Contact Us →</a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default FAQ;
