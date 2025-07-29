import React from "react";
import useAxios from "../../hooks/useAxios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "./Genre.css";

function Genre() {
  const { data, loading, error } = useAxios(
    "http://127.0.0.1:8000/api/v1/genre"
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="Genre">
      <h2>Shop by Genre</h2>
      <div className="new-releases-container">
        <Slider {...settings}>
          {data?.map((genre) => (
            <div className="genre">
              <Link to={`/genre/${genre}`} key={genre}>
                <p>{genre}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Genre;
