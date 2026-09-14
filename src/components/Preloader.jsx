import "./Preloader.css";
import logo from "../assets/logo.png";

function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-logo">
          <img src={logo} alt="Student Opportunity Hub" />
        </div>

        <h2>Student Opportunity Hub</h2>

        <p>Finding opportunities for your future</p>

        <div className="preloader-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
