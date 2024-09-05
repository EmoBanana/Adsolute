import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import { useWallet } from "../WalletContext";
import "./VideoPage.css";

const VideoPage = () => {
  const { id } = useParams();
  const videoRef = useRef(null);
  const adVideoRef = useRef(null);
  const { walletAddress } = useWallet();

  const [adCount] = useState(parseInt(localStorage.getItem("adCount")) || 0);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [adsPlayed, setAdsPlayed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const adVideos = useMemo(() => ["/Ads1.mp4", "/Ads2.mp4"], []);
  const videoDetail = videoDetails[id] || {};

  const playAd = useCallback(
    (index) => {
      if (index < adCount) {
        adVideoRef.current.src = adVideos[index];
        adVideoRef.current.play().catch((error) => {
          console.error("Ad playback error:", error);
        });
      }
    },
    [adCount, adVideos]
  );

  useEffect(() => {
    if (adCount === 0) {
      videoRef.current.src = videoDetail.src;
      videoRef.current.play().catch((error) => {
        console.error("Main video playback error:", error);
      });
    } else if (!adsPlayed) {
      playAd(currentAdIndex);
    }
  }, [adsPlayed, currentAdIndex, adCount, videoDetail.src, playAd]);

  const loadInteractionState = useCallback(() => {
    console.log("Loading interaction state for video:", id);
    const tokenData = JSON.parse(localStorage.getItem("walletTokenData")) || {};
    let userTokens = tokenData[walletAddress] || {
      tokenCount: 0,
      likedVideos: [],
      dislikedVideos: [],
    };

    const newIsLiked = userTokens.likedVideos?.includes(id) || false;
    const newIsDisliked = userTokens.dislikedVideos?.includes(id) || false;
    const newIsSubscribed = tokenData.isSubscribed || false;

    console.log("Loaded state:", {
      isLiked: newIsLiked,
      isDisliked: newIsDisliked,
      isSubscribed: newIsSubscribed,
    });

    setIsLiked(newIsLiked);
    setIsDisliked(newIsDisliked);
    setIsSubscribed(newIsSubscribed);
  }, [id, walletAddress]);

  useEffect(() => {
    if (walletAddress) {
      loadInteractionState();
    }
  }, [walletAddress, loadInteractionState]);

  const handleAdEnded = () => {
    const nextAdIndex = currentAdIndex + 1;
    if (nextAdIndex < adCount) {
      setCurrentAdIndex(nextAdIndex);
      playAd(nextAdIndex);
    } else {
      setAdsPlayed(true);
      videoRef.current.src = videoDetail.src;
      videoRef.current.play().catch((error) => {
        console.error("Main video playback error:", error);
      });

      if (walletAddress) {
        updateTokenCount();
      }
    }
  };

  const updateTokenCount = () => {
    if (!walletAddress) return;

    const tokenData = JSON.parse(localStorage.getItem("walletTokenData")) || {};
    let userTokens = tokenData[walletAddress] || { tokenCount: 0 };

    const newTokenCount = userTokens.tokenCount + 120000;
    userTokens.tokenCount = newTokenCount;
    tokenData[walletAddress] = userTokens;
    localStorage.setItem("walletTokenData", JSON.stringify(tokenData));
    console.log("Token minted", newTokenCount);
  };

  const confirmAction = (message, action) => {
    if (window.confirm(message)) {
      action();
    }
  };

  const updateTokenCountAfterInteraction = (
    tokenCost,
    interactionType,
    add
  ) => {
    if (!walletAddress) return false;

    const tokenData = JSON.parse(localStorage.getItem("walletTokenData")) || {};
    let userTokens = tokenData[walletAddress] || {
      tokenCount: 0,
      likedVideos: [],
      dislikedVideos: [],
    };

    const currentTokenCount = userTokens.tokenCount || 0;

    if (currentTokenCount >= tokenCost || !add) {
      const newTokenCount = add
        ? currentTokenCount - tokenCost
        : currentTokenCount;

      // Update interaction data
      updateInteractionData(interactionType, add, tokenCost);

      userTokens.tokenCount = newTokenCount;
      tokenData[walletAddress] = userTokens;
      localStorage.setItem("walletTokenData", JSON.stringify(tokenData));
      console.log("Interaction successful. Tokens left:", newTokenCount);
      return true;
    } else {
      alert("Not enough tokens for this action.");
      return false;
    }
  };

  const updateInteractionData = (interactionType, add, tokenCost) => {
    console.log("Updating interaction data:", {
      interactionType,
      add,
      tokenCost,
    });

    const tokenData = JSON.parse(localStorage.getItem("walletTokenData")) || {};
    let userTokens = tokenData[walletAddress] || {
      tokenCount: 0,
      likedVideos: [],
      dislikedVideos: [],
    };

    userTokens.likedVideos = userTokens.likedVideos || [];
    userTokens.dislikedVideos = userTokens.dislikedVideos || [];

    if (interactionType === "likedVideos") {
      if (add) {
        userTokens.likedVideos = [...new Set([...userTokens.likedVideos, id])];
        userTokens.dislikedVideos = userTokens.dislikedVideos.filter(
          (videoId) => videoId !== id
        );
      } else {
        userTokens.likedVideos = userTokens.likedVideos.filter(
          (videoId) => videoId !== id
        );
      }
    } else if (interactionType === "dislikedVideos") {
      if (add) {
        userTokens.dislikedVideos = [
          ...new Set([...userTokens.dislikedVideos, id]),
        ];
        userTokens.likedVideos = userTokens.likedVideos.filter(
          (videoId) => videoId !== id
        );
      } else {
        userTokens.dislikedVideos = userTokens.dislikedVideos.filter(
          (videoId) => videoId !== id
        );
      }
    } else if (interactionType === "isSubscribed") {
      tokenData.isSubscribed = add;
    }

    if (add) {
      userTokens.tokenCount = (userTokens.tokenCount || 0) - tokenCost;
    }

    tokenData[walletAddress] = userTokens;
    localStorage.setItem("walletTokenData", JSON.stringify(tokenData));

    // Update local state
    const newIsLiked = userTokens.likedVideos.includes(id);
    const newIsDisliked = userTokens.dislikedVideos.includes(id);
    const newIsSubscribed = tokenData.isSubscribed || false;

    console.log("Updated state:", {
      isLiked: newIsLiked,
      isDisliked: newIsDisliked,
      isSubscribed: newIsSubscribed,
    });

    setIsLiked(newIsLiked);
    setIsDisliked(newIsDisliked);
    setIsSubscribed(newIsSubscribed);
  };

  const handleLike = () => {
    if (isLiked) {
      confirmAction("Do you want to remove your Like from this video?", () => {
        updateTokenCountAfterInteraction(0, "likedVideos", false);
      });
    } else {
      confirmAction("Do you want to Like this video for 1 Token?", () => {
        updateTokenCountAfterInteraction(1, "likedVideos", true);
      });
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      confirmAction(
        "Do you want to remove your Dislike from this video?",
        () => {
          updateTokenCountAfterInteraction(0, "dislikedVideos", false);
        }
      );
    } else {
      confirmAction("Do you want to Dislike this video for 1 Token?", () => {
        updateTokenCountAfterInteraction(1, "dislikedVideos", true);
      });
    }
  };

  const handleSubscribe = () => {
    if (!isSubscribed) {
      confirmAction("Do you want to subscribe to ITZY for 1000 Token?", () => {
        updateTokenCountAfterInteraction(1000, "isSubscribed", true);
      });
    }
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
        {videoDetail.src ? (
          <>
            {!adsPlayed && adCount > 0 && (
              <video
                ref={adVideoRef}
                onEnded={handleAdEnded}
                controls={false}
                style={{ width: "100%", height: "auto" }}
              >
                <source src={adVideos[currentAdIndex]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <video
              ref={videoRef}
              src={videoDetail.src}
              alt={videoDetail.title}
              controls
              onPlay={handleMainVideoPlay}
              style={{
                display: adsPlayed || adCount === 0 ? "block" : "none",
                width: "100%",
                height: "auto",
              }}
            >
              <source src={videoDetail.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h2>{videoDetail.title}</h2>
            <div className="videopage-actions">
              <div className="channel-info">
                <img src="/Creator1.jpg" alt="Creator1" className="creator" />
                <h1>ITZY✅</h1>
              </div>
              <div className="video-actions">
                <button onClick={handleLike}>
                  {isLiked ? "Liked" : "Like"}
                </button>
                <button onClick={handleDislike}>
                  {isDisliked ? "Undislike" : "Dislike"}
                </button>
                <button onClick={handleSubscribe}>
                  {isSubscribed ? "Subscribed" : "Subscribed"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <p>Video not found</p>
        )}
      </div>
    </Nav>
  );
};

export default VideoPage;
