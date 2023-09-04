import Header from "./components/Header/Header";
import "./App.css";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";

function App() {
  return (
    <>
      <Header title="Review App" />
      <div className="container">
        <FeedbackForm />
      </div>
    </>
  );
}

export default App;
