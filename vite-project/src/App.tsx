import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ReviewStats from "./components/ReviewStats/ReviewStats";
import AboutIconLink from "./components/AboutIconLink/AboutIconLink";
import About from "./components/About/About";
import ReviewList from "./components/ReviewList/ReviewList";
import ReviewForm from "./components/ReviewForm/ReviewForm";
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
                <ReviewForm />
                <ReviewStats />
                <ReviewList />
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
