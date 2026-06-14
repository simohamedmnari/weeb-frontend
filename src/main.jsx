import * as Sentry from "@sentry/react";

// Initialisation Sentry (à mettre tout en haut)
Sentry.init({
  dsn: "https://e00b4bec61ebb1a6ad1a56cfa5ea9f2f@o4511563741855744.ingest.de.sentry.io/4511565988757584",
  tracesSampleRate: 1.0,
});

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import UserProvider from "./context/UserContext.jsx";

import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
