import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx"
import "./app/Global.css"
import { UserProvider } from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <UserProvider>
          <App />
      </UserProvider>
  </React.StrictMode>
)
