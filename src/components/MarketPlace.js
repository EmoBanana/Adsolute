import React from "react";
import { purchaseItem } from "../utils/solana";

const MarketPlace = () => {
  const handlePurchase = (itemId) => {
    purchaseItem(itemId, 5000); // Deduct 5000 tokens and mint NFT if possible
  };

  return (
    <div className="marketplace">
      <h2>Marketplace</h2>
      <button onClick={() => handlePurchase(1)}>
        Buy 10% off Vacuum Cleaner
      </button>
    </div>
  );
};

export default MarketPlace;
