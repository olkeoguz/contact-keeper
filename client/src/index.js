import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthState from "./context/auth/AuthState";

ReactDOM.render(
  <AuthState>
    <Router>
      <App />
    </Router>
  </AuthState>,
  document.getElementById("root")
);
