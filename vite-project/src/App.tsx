import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import ReviewStats from "./components/ReviewStats/ReviewStats";
import AboutIconLink from "./components/AboutIconLink/AboutIconLink";
import About from "./components/About/About";
import "./App.css";

function App() {
  return (
    <Router>
      <Header title="Review App" />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FeedbackForm />
                <ReviewStats />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <AboutIconLink />
      </div>
    </Router>
  );
}

export default App;
