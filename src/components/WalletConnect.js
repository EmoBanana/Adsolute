import React, { useState, useEffect } from "react";
import { useWallet } from "../WalletContext"; // Import useWallet hook

const WalletConnect = ({ onConnect }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const { setWalletAddress, disconnectWallet, changeWallet } = useWallet(); // Get the setter function and new functions

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.on("connect", () => {
        const address = window.solana.publicKey.toString();
        console.log("Wallet already connected:", address);
        setWalletAddress(address); // Update context with wallet address
        setWalletConnected(true);
        onConnect(); // Trigger onConnect callback on successful connection
      });
      window.solana.on("disconnect", () => {
        setWalletConnected(false);
        setWalletAddress(""); // Clear context on disconnect
      });
    }
  }, [onConnect, setWalletAddress]);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        if (!walletConnected) {
          const response = await window.solana.connect();
          const address = response.publicKey.toString();
          console.log("Connected to wallet:", address);
          setWalletAddress(address); // Update context with wallet address
          setWalletConnected(true);
          onConnect(); // Trigger onConnect callback on successful connection
        }
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    } else {
      alert("Please install the Phantom Wallet!");
    }
  };

  const handleDisconnect = () => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.disconnect();
      disconnectWallet(); // Trigger the disconnectWallet function
      console.log("Wallet disconnected");
    }
  };

  const handleChangeWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect({ onlyIfTrusted: false });
        const address = response.publicKey.toString();
        setWalletAddress(address); // Update context with the new wallet address
        changeWallet(); // Trigger the changeWallet function
        console.log("Wallet changed to:", address);
      } catch (error) {
        console.error("Failed to change wallet:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={connectWallet} className="connect-button">
        Connect Wallet
      </button>
      {walletConnected && (
        <div>
          <button onClick={handleDisconnect} className="connect-button">
            Disconnect Wallet
          </button>
          <button onClick={handleChangeWallet} className="connect-button">
            Change Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
