import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import { useWallet } from "../WalletContext"; // Import the wallet context
import "./VideoPage.css";

const VideoPage = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const adVideoRef = useRef(null);
  const { walletAddress } = useWallet(); // Get wallet address from context

  const [adCount, setAdCount] = useState(
    parseInt(localStorage.getItem("adCount")) || 0
  );
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [adsPlayed, setAdsPlayed] = useState(false);

  const videoDetails = {
    1: {
      src: "/Video1.mp4",
      title:
        "[Insta-LOG] EP27 #YEJI #HONGKONG | ITZY 2ND WORLD TOUR 'BORN TO BE'",
    },
    2: {
      src: "/Video2.mp4",
      title:
        "[Insta-LOG] EP26 #YUNA #TAIPEI | ITZY 2ND WORLD TOUR 'BORN TO BE'",
    },
    3: {
      src: "/Video3.mp4",
      title:
        "[Insta-LOG] EP25 #CHAERYEONG #MANILA | ITZY 2ND WORLD TOUR 'BORN TO BE'",
    },
    4: {
      src: "/Video4.mp4",
      title:
        "[Insta-LOG] EP24 #RYUJIN #TORONTO | ITZY 2ND WORLD TOUR 'BORN TO BE'",
    },
  };

  const adVideos = ["/Video4.mp4", "/Video4.mp4"];

  const { src, title } = videoDetails[id] || {};

  useEffect(() => {
    if (adCount === 0) {
      // Directly play the main video if no ads are selected
      videoRef.current.src = src;
      videoRef.current.play().catch((error) => {
        console.error("Main video playback error:", error);
      });
    } else if (!adsPlayed) {
      playAd(currentAdIndex);
    }
  }, [adsPlayed, currentAdIndex, adCount, src]);

  const playAd = (index) => {
    if (index < adCount) {
      adVideoRef.current.src = adVideos[index];
      adVideoRef.current.play().catch((error) => {
        console.error("Ad playback error:", error);
      });
    }
  };

  const handleAdEnded = () => {
    const nextAdIndex = currentAdIndex + 1;
    if (nextAdIndex < adCount) {
      setCurrentAdIndex(nextAdIndex);
      playAd(nextAdIndex);
    } else {
      setAdsPlayed(true);
      videoRef.current.src = src; // Set the main video source after ads
      videoRef.current.play().catch((error) => {
        console.error("Main video playback error:", error);
      });

      // Update the token count if wallet is connected
      if (walletAddress) {
        updateTokenCount();
      }
    }
  };

  const updateTokenCount = () => {
    if (!walletAddress) return; // Ensure walletAddress is present

    const tokenData = JSON.parse(localStorage.getItem("walletTokenData")) || {};
    const currentTokenCount = tokenData[walletAddress] || 0;
    const newTokenCount = currentTokenCount + adCount; // Increment based on the number of ads watched

    tokenData[walletAddress] = newTokenCount;
    localStorage.setItem("walletTokenData", JSON.stringify(tokenData));
    console.log("Token minted", newTokenCount); // Log updated token count
  };

  const handleMainVideoPlay = (e) => {
    if (!adsPlayed && adCount > 0) {
      e.preventDefault();
      playAd(currentAdIndex);
    }
  };

  return (
    <Nav>
      <div className="video-page">
        {src ? (
          <>
            {!adsPlayed && adCount > 0 && (
              <video
                ref={adVideoRef}
                onEnded={handleAdEnded}
                controls={false}
                style={{ width: "100%", height: "auto" }}
              />
            )}
            <video
              ref={videoRef}
              src={src}
              alt={title}
              controls
              onPlay={handleMainVideoPlay}
              style={{
                display: adsPlayed || adCount === 0 ? "block" : "none",
                width: "100%",
                height: "auto",
              }}
            />
            <h2>{title}</h2>
          </>
        ) : (
          <p>Video not found</p>
        )}
      </div>
    </Nav>
  );
};

export default VideoPage;
