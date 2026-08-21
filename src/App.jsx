import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Opportunities from "./pages/dashboard/Opportunities";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import OpportunityDetails from "./pages/dashboard/OpportunityDetails";
import SavedOpportunities from "./pages/dashboard/SavedOpportunities";
import Applications from "./pages/dashboard/Applications";
import Profile from "./pages/dashboard/Profile";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import FAQ from "./pages/FAQ";
import Feedback from "./pages/Feedback";
import "./Global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />
        {/* AUTHENTICATION */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* DASHBOARD */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/opportunities/:id" element={<OpportunityDetails />} />
        <Route path="/saved" element={<SavedOpportunities />} />
        <Route path="/about" element={<About />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
