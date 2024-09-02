import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const history = useNavigate();

  const handleVideoClick = () => {
    history.push("/video/1"); // Redirect to a hardcoded video page
  };

  return (
    <div className="home-page">
      <h2>Home Page</h2>
      <div className="video" onClick={handleVideoClick}>
        <h3>Video Title</h3>
      </div>
    </div>
  );
};

export default HomePage;
