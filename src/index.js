// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WalletProvider } from "./WalletContext"; // Import the WalletProvider
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WalletProvider>
      {" "}
      {/* Wrap App with WalletProvider */}
      <App />
    </WalletProvider>
  </React.StrictMode>
);

reportWebVitals();
