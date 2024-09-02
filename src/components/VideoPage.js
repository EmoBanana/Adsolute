import React, { useState } from "react";
import { mintTokens, stakeTokens } from "../utils/solana";

const VideoPage = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
    stakeTokens(1); // Deduct 1 token for liking
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
    stakeTokens(1); // Deduct 1 token for disliking
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    stakeTokens(5); // Deduct 5 tokens for subscribing
  };

  const handleWatchAd = () => {
    mintTokens(2); // Mint 2 tokens for watching the ad
  };

  return (
    <div className="video-page">
      <h2>Video Title</h2>
      <button onClick={handleLike}>Like ({likes})</button>
      <button onClick={handleDislike}>Dislike ({dislikes})</button>
      <button onClick={handleSubscribe}>
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>
      <button onClick={handleWatchAd}>Watch Ad and Earn Tokens</button>
    </div>
  );
};

export default VideoPage;
