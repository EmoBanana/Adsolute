import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WalletConnect from "./WalletConnect";
import "./LandingPage.css";

const LandingPage = () => {
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
    const phrases = ["ADSOLUTE", "AD-FREE EXPERIENCE"]; // Moved here
    const currentPhrase = phrases[currentPhraseIndex];
    let timer;

    if (isTyping) {
      timer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length + 1 === currentPhrase.length) {
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
  }, [text, isTyping, isDeleting, currentPhraseIndex]); // Removed phrases from dependency array

  const handleClick = () => {
    setIsFirstImage(!isFirstImage);
  };

  const handleWalletConnect = () => {
    navigate("/home");
  };

  return (
    <div className="landing-page">
      <header className="site-header">
        <h1 className="site-title">Adsolute.</h1>
      </header>
      <div className="content">
        <div className="text-container">
          <div className="static-text">WELCOME TO</div>
          <div className="typing-text">{text}</div>
          <div className="button">
            <WalletConnect onConnect={handleWalletConnect} />
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
