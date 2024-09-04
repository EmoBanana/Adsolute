import React, { useState } from "react";
import { useWallet } from "../WalletContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = ({ children }) => {
  const { walletAddress, setWalletAddress } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDisconnect = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        console.log("Wallet disconnecting");
        await window.solana.disconnect();
        setWalletAddress(null);
        setMenuOpen(false);
        navigate("/");
      } catch (error) {
        console.error("Failed to disconnect wallet:", error);
      }
    } else {
      console.error("Phantom Wallet is not installed.");
    }
  };

  const handleChangeWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        await window.solana.disconnect();
        setWalletAddress(null);
        setMenuOpen(false);
        navigate("/");
      } catch (error) {
        console.error("Failed to disconnect wallet:", error);
      }
    } else {
      console.error("Phantom Wallet is not installed.");
    }
  };

  // Determine the active route
  const currentPath = location.pathname;

  return (
    <div className="homepage">
      <header className="nav-bar">
        <div className="site-title">Adsolute.</div>
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
        <button className="upload-button" onClick={() => navigate("/upload")}>
          Upload
        </button>
        <div className="wallet-address-container">
          <button className="wallet-address" onClick={toggleMenu}>
            {walletAddress
              ? `${walletAddress.slice(0, 5)}...${walletAddress.slice(-4)}`
              : "Not Connected"}
          </button>
          {menuOpen && (
            <div className="wallet-menu">
              <button onClick={handleChangeWallet}>Change Wallet</button>
              <button onClick={handleDisconnect}>Disconnect</button>
            </div>
          )}
        </div>
      </header>
      <div className="main-content">
        <div className="side-bar">
          <button
            className={`side-bar-button ${
              currentPath === "/home" ? "active" : ""
            }`}
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button
            className={`side-bar-button ${
              currentPath === "/marketplace" ? "active" : ""
            }`}
            onClick={() => navigate("/marketplace")}
          >
            Marketplace
          </button>
          <div className="divider"></div>
          <button
            className={`side-bar-button ${
              currentPath === "/unverified" ? "active" : ""
            }`}
            onClick={() => navigate("/unverified")}
          >
            New Creators
          </button>
          <button className="side-bar-button">Subscriptions</button>
          <div className="divider"></div>
          <div className="side-bar-title">You</div>
          <button className="side-bar-button">Your Videos</button>
          <button className="side-bar-button">Liked Videos</button>
          <button className="side-bar-button">History</button>
          <div className="divider"></div>
          <div className="side-bar-title">Subscriptions</div>
          <button className="side-bar-button">ITZY</button>
          <button className="side-bar-button">ITZY JAPAN OFFICIAL</button>
          <div className="divider"></div>
          <button className="side-bar-button">Settings</button>
          <button className="side-bar-button">Help</button>
          <button className="side-bar-button">Send Feedback</button>
        </div>
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Nav;
