import Header from "./components/Header/Header";
import "./App.css";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import ReviewStats from "./components/ReviewStats/ReviewStats";

function App() {
  return (
    <>
      <Header title="Review App" />
      <div className="container">
        <FeedbackForm />
        <ReviewStats />
      </div>
    </>
  );
}

export default App;
