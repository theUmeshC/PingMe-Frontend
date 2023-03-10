import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./Store/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <ContextProvider>
      <App />
    </ContextProvider>
  </Router>
);
