import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletConnect from "./WalletConnect";
import { useWallet } from "../WalletContext";
import "./LandingPage.css";

const LandingPage = () => {
  const { walletAddress } = useWallet(); // Get wallet address from context
  const [text, setText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [isFirstImage, setIsFirstImage] = useState(true);

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
    return text.split("SOL").map((part, index) => (
      <span key={index}>
        {part}
        {index < text.split("SOL").length - 1 && (
          <span className="text-gradient">SOL</span>
        )}
      </span>
    ));
  };

  const handleClick = () => {
    setIsFirstImage(!isFirstImage);
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
            {/* Render WalletConnect only if walletAddress is null */}
            {walletAddress ? (
              <p>Wallet Connected</p> // Optionally show a message if connected
            ) : (
              <WalletConnect onConnect={handleWalletConnect} />
            )}
          </div>
        </div>
        <div className="connect-container" onClick={handleClick}>
          <div
            className={`player ${
              isFirstImage ? "first-image-active" : "second-image-active"
            }`}
          >
            <img src="/Player2.png" alt="Img A" className="image image-A" />
            <img src="/Player.png" alt="Img B" className="image image-B" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
