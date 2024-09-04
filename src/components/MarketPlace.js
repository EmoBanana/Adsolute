import React from "react";
import Nav from "./Nav";
import { purchaseItem } from "../utils/solana";
import "./Marketplace.css";

const MarketPlace = () => {
  const handlePurchase = (itemId) => {
    purchaseItem(itemId, 5000); // Deduct 5000 tokens and mint NFT if possible
  };

  return (
    <Nav>
      <div className="market-content">
        <div className="nft-row">
          <div className="nft">
            <img src="/Marketplace1.jpg" alt="nft1" />
            <div className="market-title-container">
              <div className="market-title-container-text">
                <h1>10% Off for TOKEN2049 Singapore Ticket</h1>
                <h2>30000 Tokens</h2>
                <button
                  className="redeem-button"
                  onClick={() => handlePurchase(1)}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
          <div className="nft">
            <img src="/Marketplace2.jpg" alt="nft2" />
            <div className="market-title-container">
              <div className="market-title-container-text">
                <h1>10% Off for Devcon Southeast Asia Ticket</h1>
                <h2>10000 Tokens</h2>
                <button
                  className="redeem-button"
                  onClick={() => handlePurchase(2)}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default MarketPlace;
