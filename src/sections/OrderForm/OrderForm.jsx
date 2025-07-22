import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./OrderForm.css";

const validationSchema = Yup.object({
  billing: Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    address_1: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    postcode: Yup.string().required("Required"),
  }),
  line_items: Yup.array()
    .of(
      Yup.object({
        product_id: Yup.number().required("Required"),
        quantity: Yup.number().min(1).required("Required"),
      })
    )
    .min(1, "At least one product is required")
    .required(),
});

const OrderForm = () => {
  const token = useSelector((state) => state.user.token);
  const cartData = useSelector((state) => state.cart.items);

  console.log(token);

  // Construct initialValues from cart data
  const initialValues = {
    payment_method: "stripe",
    payment_method_title: "Credit Card (Stripe)",
    set_paid: true,
    billing: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address_1: "",
      city: "",
      state: "",
      postcode: "",
      country: "US",
    },
    line_items: cartData.map((item) => ({
      product_id: item.id,
      quantity: item.quantity || 1,
    })),
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!token) {
      alert("You must be logged in to place an order");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/orders",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      resetForm();

      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error("Order creation failed", error.response?.data || error);
      alert("Order creation failed. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="OrderForm">
      <h3>BILLING DETAILS</h3>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-row">
              <div className="billing-field">
                <label>First Name</label>
                <Field name="billing.first_name" />
                <ErrorMessage
                  className="error"
                  name="billing.first_name"
                  component="div"
                />
              </div>
              <div className="billing-field">
                <label>Last Name</label>
                <Field name="billing.last_name" />
                <ErrorMessage
                  className="error"
                  name="billing.last_name"
                  component="div"
                />
              </div>
            </div>

            <div className="billing-field">
              <label>Email</label>
              <Field name="billing.email" />
              <ErrorMessage
                className="error"
                name="billing.email"
                component="div"
              />
            </div>

            <div className="billing-field">
              <label>Phone</label>
              <Field name="billing.phone" />
              <ErrorMessage
                className="error"
                name="billing.phone"
                component="div"
              />
            </div>

            <div className="billing-field">
              <label>Address</label>
              <Field name="billing.address_1" />
              <ErrorMessage
                className="error"
                name="billing.address_1"
                component="div"
              />
            </div>

            <div className="form-row">
              <div className="billing-field">
                <label>City</label>
                <Field name="billing.city" />
                <ErrorMessage
                  className="error"
                  name="billing.city"
                  component="div"
                />
              </div>
              <div className="billing-field">
                <label>State</label>
                <Field name="billing.state" />
                <ErrorMessage
                  className="error"
                  name="billing.state"
                  component="div"
                />
              </div>
              <div className="billing-field">
                <label>Postcode</label>
                <Field name="billing.postcode" />
                <ErrorMessage
                  className="error"
                  name="billing.postcode"
                  component="div"
                />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Checkout"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default OrderForm;
