import React from "react";
import OrderForm from "../../sections/OrderForm/OrderForm";
import OrderSummary from "../../sections/OrderSummary/OrderSummary";
import "./Checkout.css";

function Checkout() {
  return (
    <main className="Checkout">
      <OrderForm />
      <OrderSummary />
    </main>
  );
}

export default Checkout;
