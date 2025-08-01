import useAxios from "../../hooks/useAxios";
import Placeholder from "../../assets/images/image-placeholder.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewReleases.css";

function NewReleases() {
  const { data, loading, error } = useAxios(
    "http://127.0.0.1:8000/api/v1/products",
    true
  );

  if (error) return <p>Error: {error.message}</p>;

  // Create placeholder data when loading
  const newReleases = loading
    ? Array(10).fill({ id: Math.random() }) // Create 10 placeholder items
    : data?.slice(0, 10);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
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
    <section className="NewReleases">
      <h2>New Releases</h2>
      <div className="new-releases-container">
        <Slider {...settings}>
          {newReleases?.map((product) => (
            <div key={product.id}>
              <Link to={loading ? "#" : `/product/${product.id}`}>
                <div className={loading ? "image-placeholder" : ""}>
                  <img
                    src={
                      loading
                        ? Placeholder
                        : product.images?.[0]?.src || Placeholder
                    }
                    alt={
                      loading ? "Loading..." : product.name || "Product Image"
                    }
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default NewReleases;
