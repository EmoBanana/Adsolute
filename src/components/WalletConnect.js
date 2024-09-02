import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WalletConnect = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // Check if the wallet is already connected
    if (window.solana && window.solana.isPhantom) {
      window.solana.on("connect", () => {
        console.log(
          "Wallet already connected:",
          window.solana.publicKey.toString()
        );
        setWalletConnected(true);
      });
      window.solana.on("disconnect", () => {
        setWalletConnected(false);
      });
    }
  }, []);

  const connectWallet = async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        // Check if already connected
        if (walletConnected) {
          console.log(
            "Wallet already connected:",
            window.solana.publicKey.toString()
          );
        } else {
          // Request wallet connection
          const response = await window.solana.connect();
          console.log("Connected to wallet:", response.publicKey.toString());
        }
        navigate("/home");
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    } else {
      alert("Please install the Phantom Wallet!");
    }
  };

  return (
    <div className="wallet-connect">
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default WalletConnect;
