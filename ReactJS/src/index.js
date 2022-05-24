import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { HashRouter as Router } from "react-router-dom"
import GlobalStyles from "./GlobalStyles"
import { AuthProvider } from "./Projects/AuthFlow/auth"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
  <Router>
    <GlobalStyles />
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
  // </React.StrictMode>
)
