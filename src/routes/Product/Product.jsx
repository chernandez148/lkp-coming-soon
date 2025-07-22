import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ProductOverview from "../../sections/ProductOverview/ProductOverview";
import Reviews from "../../sections/Reviews/Reviews";
import ReviewForm from "../../sections/ReviewForm/ReviewForm";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const [toggleReviews, setToggleReviews] = useState(false);
  const [reviewForm, setReviewForm] = useState(false);
  const { data, loading, error } = useAxios(
    `http://127.0.0.1:8000/api/v1/products/${id}`,
    true
  );

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Assuming your product data has `name` and a categories array (WooCommerce usually does)
  const productName = data?.name || "Product";
  const categories = data?.categories || []; // array of categories

  return (
    <main className="Product">
      <BreadCrumbs productName={productName} categories={categories} />
      <ProductOverview product={data} setToggleReviews={setToggleReviews} />
      <Reviews
        toggleReviews={toggleReviews}
        setToggleReviews={setToggleReviews}
        setReviewForm={setReviewForm}
      />
      <ReviewForm reviewForm={reviewForm} setReviewForm={setReviewForm} />
    </main>
  );
}

export default Product;
