import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { IoCart } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating";
import "./ProductOverview.css";

function ProductOverview({ product, setToggleReviews }) {
  const [info, setInfo] = useState("overview");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hasAccess = product.meta_data?.some(
    (meta) => meta.key === "_ebook_stream_url" && !!meta.value
  );

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        author: product.meta_data[0].value,
        category: product.categories[0].image,
        price: parseFloat(product.regular_price),
        image: product.images?.[0]?.src || "",
        quantity: 1,
      })
    );
  };

  console.log(product);

  return (
    <section className="ProductOverview">
      <div className="product-image">
        <img src={product.images?.[0]?.src || ""} />
      </div>
      <div className="product-details">
        <p>{product.categories[0].name}</p>
        <div className="product-title">
          <h1 className="product-name">{product.name}</h1>
          <h3>${product.regular_price}</h3>
        </div>
        <h4>
          {product.meta_data?.find((meta) => meta.key === "author")?.value ||
            "Unknown Author"}
        </h4>
        <StarRating rating={product.average_rating} />
        <p
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.short_description }}
        />
        <div className="product-buttons">
          {hasAccess ? (
            <button onClick={() => navigate(`/library/stream/${product.id}`)}>
              READ NOW
            </button>
          ) : (
            <button onClick={addToCartHandler}>
              <IoCart size={18} /> ADD TO CART
            </button>
          )}
        </div>
        <div className="product-info">
          <ul>
            <li>
              <button
                onClick={() => setInfo("overview")}
                className={info === "overview" ? "activeBtn" : ""}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setInfo("details")}
                className={info === "details" ? "activeBtn" : ""}
              >
                Details
              </button>
            </li>
            <li>
              <button onClick={() => setToggleReviews(true)}>Reviews</button>
            </li>
          </ul>

          {info === "overview" && (
            <div
              className="overview"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          {info === "details" && (
            <div className="details">
              <ul>
                <li>
                  <p>
                    Author:{" "}
                    {product.meta_data?.find((meta) => meta.key === "author")
                      ?.value || "Unknown Author"}
                  </p>
                </li>
                <li>
                  <p>
                    Genre:{" "}
                    {product.meta_data?.find((meta) => meta.key === "genre")
                      ?.value || "Unknown Genre"}
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductOverview;
