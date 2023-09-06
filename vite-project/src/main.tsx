import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FeedBackProvider } from "./context/ReviewContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FeedBackProvider>
      <App />
    </FeedBackProvider>
  </React.StrictMode>
);
