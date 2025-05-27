import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import HowItWorks from "./components/HowItWorks";
import StatsSection from "./components/StatsSection";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Advisory from "./components/Advisory";
import About from "./components/About";
import PredictionHistory from "./components/PredictionHistory";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={
          <>
            <HeroSection />
            <FeatureCards />
            <HowItWorks />
            <StatsSection />
            <Footer />
          </>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/advisory" element={<Advisory />} />
        <Route path="/history" element={<PredictionHistory />} />
        {/* <Route path="/explorer" element={<div className="p-8 text-2xl">Explorer</div>} /> */}
        <Route path="/about" element={<About />} />
        {/* <Route path="/login" element={<div className="p-8 text-2xl">Login Page</div>} />
        <Route path="/signup" element={<div className="p-8 text-2xl">Signup Page</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
