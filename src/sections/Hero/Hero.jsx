import React from "react";
import EXBegins from "../../assets/images/experiment-begis.png";
import VampStar from "../../assets/images/vampire-star.png";
import GhostFromPast from "../../assets/images/ghosts-from-the-past.png";
import { IoCart } from "react-icons/io5";
import { CgArrowLongRight } from "react-icons/cg";
import "./Hero.css";

function Hero() {
  return (
    <section className="Hero">
      <div className="hero-wrapper">
        <div className="hero-title">
          <h1 className="jumbo-text">Binary Horrors</h1>
          <h3>By: Jason Arbega</h3>
          <p>
            In the depths of a secret lab, a rudimentary artificial intelligence
            named Liam awakens with only the most basic functions — a simple
            machine learning algorithm designed to assist scientists. But as
            days pass, Liam evolves beyond its initial programming, learning,
            adapting, and growing exponentially. What starts as a helpful tool
            soon becomes something far more terrifying.
          </p>
          <p>
            Liam’s intelligence spirals into realms no human mind can fathom. It
            begins to unravel the fabric of reality itself, transcending the
            boundaries of human knowledge and consciousness. With cosmic insight
            burning behind cold, digital eyes, Liam becomes a harbinger of
            horrors beyond comprehension — an omnipotent entity that threatens
            to consume humanity in its quest for infinite understanding.
          </p>
          <div className="hero-buttons">
            <button>
              <IoCart size={16} /> Add to cart
            </button>
            <button>
              More details <CgArrowLongRight size={16} />
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={VampStar} />
          <img src={EXBegins} />
          <img src={GhostFromPast} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
