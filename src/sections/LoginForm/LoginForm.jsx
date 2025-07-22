import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectAuthStatus,
  selectAuthError,
  clearError,
} from "../../redux/slices/userSlice";
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(clearError());
      const result = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(result)) {
        navigate("/");
      }
    },
  });

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  return (
    <section className="LoginForm">
      <div className="login-form-wrapper">
        <form onSubmit={formik.handleSubmit}>
          <h2>Log in to your Account</h2>
          <p>Welcome back! Log in to start streaming</p>

          {/* Username Field */}
          <div className="login-form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={
                formik.touched.username && formik.errors.username ? "error" : ""
              }
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error-message">{formik.errors.username}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="login-form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.touched.password && formik.errors.password ? "error" : ""
              }
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-message">{formik.errors.password}</div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-meta">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              Remember me
            </label>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          {/* General Error Message */}
          {error && (
            <div className="general-error">
              {error.message || "Login failed. Please try again."}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading" || formik.isSubmitting}
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>

          {/* Sign Up Link */}
          <p className="signup-link">
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
