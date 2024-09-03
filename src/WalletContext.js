import React, { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  const disconnectWallet = () => {
    setWalletAddress(null);
    // Optionally, you can add any other state reset logic here
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, setWalletAddress, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
