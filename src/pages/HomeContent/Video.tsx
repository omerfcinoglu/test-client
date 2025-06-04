import React from "react";

const Video: React.FC = () => {
  return (
    <div className="relative">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src={""}
        className="relative"
      ></video>

      {/* Overlay with semi-transparent black */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </div>
  );
};

export default Video;