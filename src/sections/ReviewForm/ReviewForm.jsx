import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ReviewForm.css";
import { useParams } from "react-router-dom";

function ReviewForm({ setReviewForm, reviewForm }) {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState("");
  const [hoverRating, setHoverRating] = React.useState(0);

  console.log(id);

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    rating: Yup.number()
      .min(1, "Please select a rating")
      .required("Rating is required"),
    review: Yup.string()
      .required("Review is required")
      .min(10, "Review must be at least 10 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      rating: 0,
      review: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await fetch(
          "http://localhost:8000/api/products/reviews",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product_id: id,
              review: values.review,
              reviewer: values.name,
              reviewer_email: values.email,
              rating: values.rating,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to submit review");
        }

        setSubmitMessage("Review submitted successfully!");
        setTimeout(() => {
          setReviewForm(false);
          setSubmitMessage("");
          formik.resetForm();
        }, 2000);
      } catch (error) {
        console.error("Error submitting review:", error);
        setSubmitMessage(
          error.message || "Error submitting review. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <section
      className="ReviewForm"
      style={{ display: reviewForm ? "flex" : "none" }}
    >
      <button className="close-button" onClick={() => setReviewForm(false)}>
        <IoCloseSharp size={22} />
      </button>
      <div className="review-form-wrapper">
        <h3>Add Review</h3>

        {submitMessage && (
          <div
            className={`submit-message ${
              submitMessage.includes("Error") ? "error" : "success"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Your Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <button
                    type="button"
                    key={ratingValue}
                    onClick={() => formik.setFieldValue("rating", ratingValue)}
                    onMouseEnter={() => setHoverRating(ratingValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <span
                      className={`star ${
                        ratingValue <= (hoverRating || formik.values.rating)
                          ? "on"
                          : "off"
                      }`}
                    >
                      &#9733;
                    </span>
                  </button>
                );
              })}
            </div>
            {formik.touched.rating && formik.errors.rating ? (
              <div className="error-message">{formik.errors.rating}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="review">Your Review</label>
            <textarea
              id="review"
              name="review"
              value={formik.values.review}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.review && formik.errors.review ? (
              <div className="error-message">{formik.errors.review}</div>
            ) : null}
          </div>

          <button type="submit" disabled={isSubmitting || !formik.isValid}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReviewForm;
