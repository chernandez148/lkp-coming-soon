import useAxios from "../../hooks/useAxios";
import Placeholder from "../../assets/images/image-placeholder.jpg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TopSellers.css";
import { useEffect, useState } from "react";

function TopSellers() {
  const { data, loading, error } = useAxios(
    "http://127.0.0.1:8000/api/v1/products",
    true
  );
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    if (data) {
      // Sort products by total_sales in descending order
      const sortedProducts = [...data].sort(
        (a, b) => b.total_sales - a.total_sales
      );
      // Take top 10 products
      const top10 = sortedProducts.slice(0, 10);
      setTopSellers(top10);
    }
  }, [data]);

  if (loading) return <p>Loading top sellers...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
    <section className="TopSellers">
      <h2>Top Sellers</h2>
      <div className="top-sellers-container">
        <Slider {...settings}>
          {topSellers?.map((product) => (
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

export default TopSellers;
