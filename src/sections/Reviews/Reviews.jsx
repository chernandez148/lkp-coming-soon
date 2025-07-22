import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import useAxios from "../../hooks/useAxios";
import "./Reviews.css";

function Reviews({ toggleReviews, setToggleReviews, setReviewForm }) {
  const { id } = useParams();
  const { data, loading, error } = useAxios(
    `http://127.0.0.1:8000/api/v1/products/${id}/reviews`
  );

  if (loading) return <p>Loading reviews...</p>;
  {
    error && <p>{error?.message || "Something went wrong!"}</p>;
  }

  console.log(data);

  return (
    <section
      className="Reviews"
      style={{
        width: toggleReviews ? "100%" : 0,
        opacity: toggleReviews ? 1 : 0,
      }}
    >
      <div
        className={
          toggleReviews ? "review-wrapper review-active" : "review-wrapper"
        }
      >
        <div className="review-header">
          <h4>REVIEWS</h4>
          <button onClick={() => setToggleReviews(false)}>
            <IoCloseSharp size={22} color="white" />
          </button>
        </div>

        {/* Display reviews */}
        {data && data?.length > 0 ? (
          <div className="reviews-list">
            {data?.map((review) => (
              <div key={review.id} className="review-item">
                <div className="author-info">
                  <div className="star-rating-display">
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={`star ${
                          index < review.rating ? "filled" : "empty"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <h5>{review.reviewer}</h5>
                  <h5>
                    {formatDistanceToNow(new Date(review.date_created), {
                      addSuffix: true,
                    })}
                  </h5>
                </div>
                <div className="review">
                  <p dangerouslySetInnerHTML={{ __html: review.review }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
        <button className="review-btn" onClick={() => setReviewForm(true)}>
          Add Review
        </button>
      </div>
    </section>
  );
}

export default Reviews;
