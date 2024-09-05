import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../WalletContext";
import "./Upload.css";

const Upload = () => {
  const { walletAddress } = useWallet();
  const [uploadShowPopup, setUploadShowPopup] = useState(true); // State to control popup visibility
  const [uploadChannelLogo, setUploadChannelLogo] = useState(null); // State for channel logo
  const [uploadChannelName, setUploadChannelName] = useState(""); // State for channel name
  const [uploadVideoTitle, setUploadVideoTitle] = useState(""); // State for video title
  const [uploadVideoFile, setUploadVideoFile] = useState(null); // State for video file

  const navigate = useNavigate(); // Use the navigate hook

  const handleUploadPopupConfirm = () => {
    if (
      uploadChannelName &&
      uploadVideoTitle &&
      uploadVideoFile &&
      uploadChannelLogo
    ) {
      console.log("Channel Name:", uploadChannelName);
      console.log("Video Title:", uploadVideoTitle);
      console.log("Video File:", uploadVideoFile);
      console.log("Channel Logo:", uploadChannelLogo);
      setUploadShowPopup(false); // Hide the popup on successful confirmation

      // Navigate to YourVideo with fromUpload set to true
      navigate(`/channel/${walletAddress}`, { state: { fromUpload: true } });
    } else {
      alert("Please fill out all fields before proceeding."); // Alert if any field is missing
    }
  };

  const handleUploadPopupCancel = () => {
    setUploadShowPopup(false); // Hide the popup on cancel

    // Navigate to YourVideo with fromUpload set to true
    navigate(`/channel/${walletAddress}`, { state: { fromUpload: true } });
  };

  const handleUploadLogoChange = (e) => {
    setUploadChannelLogo(e.target.files[0]); // Set channel logo
  };

  const handleUploadVideoChange = (e) => {
    setUploadVideoFile(e.target.files[0]); // Set video file
  };

  const hiddenFileInput1 = useRef(null);
  const hiddenFileInput2 = useRef(null);

  const handleClick1 = (event) => {
    hiddenFileInput1.current.click();
  };

  const handleClick2 = (event) => {
    hiddenFileInput2.current.click();
  };

  return (
    <div className="upload-page">
      {uploadShowPopup && (
        <div className="upload-popup-overlay">
          <div className="upload-popup-content">
            <p>Please provide the following details to upload your video</p>
            <div className="upload-form">
              <div className="form-input">
                <label>Channel Logo:</label>
                <button className="customButton" onClick={handleClick1}>
                  Choose File
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadLogoChange}
                  ref={hiddenFileInput1}
                />
              </div>

              <div className="form-input">
                <label>Channel Name:</label>
                <input
                  type="text"
                  value={uploadChannelName}
                  onChange={(e) => setUploadChannelName(e.target.value)}
                />
              </div>

              <div className="form-input">
                <label>Video Title:</label>
                <input
                  type="text"
                  value={uploadVideoTitle}
                  onChange={(e) => setUploadVideoTitle(e.target.value)}
                />
              </div>

              <div className="form-input">
                <label>Upload Video:</label>
                <button className="customButton" onClick={handleClick2}>
                  Choose File
                </button>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleUploadVideoChange}
                  ref={hiddenFileInput2}
                />
              </div>
            </div>
            <div className="upload-popup-buttons">
              <button onClick={handleUploadPopupConfirm}>Confirm</button>
              <button onClick={handleUploadPopupCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;
