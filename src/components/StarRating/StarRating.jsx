import React from "react";
import "./StarRating.css";

function StarRating({ rating }) {
  const filledStars = Math.round(parseFloat(rating)); // round to nearest int
  const totalStars = 5;

  return (
    <div className="StarRating">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={index < filledStars ? "star filled" : "star"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
