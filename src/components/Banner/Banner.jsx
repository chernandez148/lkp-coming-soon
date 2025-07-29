import React from "react";
import "./Banner.css";

function Banner({ backgroundImage, height }) {
  return (
    <div
      className="Banner"
      style={{ backgroundImage: `url(${backgroundImage})`, height: height }}
    >
      Banner
    </div>
  );
}

export default Banner;
