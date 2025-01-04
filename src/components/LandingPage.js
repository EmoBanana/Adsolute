import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletConnect from "./WalletConnect";
import { useWallet } from "../WalletContext";
import "./LandingPage.css";

const LandingPage = () => {
  const { walletAddress } = useWallet();
  const [text, setText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  const navigate = useNavigate();

  useEffect(() => {
    const phrases = ["ADSOLUTE", "AD-FREE STREAMING", "TOKENIZED AD STREAMING"];
    const currentPhrase = phrases[currentPhraseIndex];
    let timer;

    if (isTyping) {
      timer = setTimeout(() => {
        const typedText = currentPhrase.substring(0, text.length + 1);
        setText(typedText);
        if (typedText.length === currentPhrase.length) {
          setIsTyping(false);
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    } else if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setIsTyping(true);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }, deletingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isTyping, isDeleting, currentPhraseIndex]);

  const formatText = (text) => {
    // Split by the different words you want to format differently
    const parts = text.split(/(SOL|AD-FREE|TOKENIZED)/);

    return parts.map((part, index) => {
      if (part === "SOL") {
        return (
          <span key={index} className="text-gradient">
            SOL
          </span>
        );
      } else if (part === "AD-FREE") {
        return (
          <span key={index} className="text-ad-free">
            Ad-Free
          </span>
        );
      } else if (part === "TOKENIZED") {
        return (
          <span key={index} className="text-tokenized">
            Tokenized
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  const handleWalletConnect = () => {
    navigate("/home");
  };

  return (
    <div className="landing-page">
      <header className="site-header">
        <h1 className="site-title">
          Ad<span className="text-gradient">SOL</span>ute.
        </h1>
      </header>
      <div className="content">
        <div className="text-container">
          <div className="static-text">WELCOME TO</div>
          <div className="typing-text">{formatText(text)}</div>
          <div className="button">
            {}
            {walletAddress ? (
              <p>Wallet Connected</p>
            ) : (
              <WalletConnect onConnect={handleWalletConnect} />
            )}
          </div>
        </div>
      </div>
      <div className="slider-container">
        <div className="slider">
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
          <div className="slider-item">Content Creator</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
