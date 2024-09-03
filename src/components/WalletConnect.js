import React, { useState, useEffect } from "react";

const WalletConnect = ({ onConnect }) => {
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (window.solana && window.solana.isPhantom) {
      window.solana.on("connect", () => {
        console.log(
          "Wallet already connected:",
          window.solana.publicKey.toString()
        );
        setWalletConnected(true);
        onConnect(); // Trigger onConnect callback on successful connection
      });
      window.solana.on("disconnect", () => {
        setWalletConnected(false);
      });
    }
  }, [onConnect]);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        if (!walletConnected) {
          const response = await window.solana.connect();
          console.log("Connected to wallet:", response.publicKey.toString());
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

  return (
    <button onClick={connectWallet} className="connect-button">
      Connect Wallet
    </button>
  );
};

export default WalletConnect;
