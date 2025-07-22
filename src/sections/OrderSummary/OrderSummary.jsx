import React from "react";
import { useSelector } from "react-redux";
import "./OrderSummary.css";

function OrderSummary() {
  const cartData = useSelector((state) => state.cart.items);

  // Calculate subtotal
  const subtotal = cartData.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  return (
    <section className="OrderSummary">
      <h3>YOUR ORDER</h3>

      {cartData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartData.map((item, index) => (
          <div className="item" key={index}>
            <div className="item-info">
              <img src={item.image} width={80} alt={item.name} />
              <div className="item-description">
                <p>{item.name}</p>
                <p>{item.author}</p>
                {item.category && (
                  <img src={item.category} width={18} alt="category icon" />
                )}
              </div>
            </div>
            <p>${parseFloat(item.price).toFixed(2)}</p>
          </div>
        ))
      )}

      <div className="sub-total">
        <h3>Subtotal:</h3>
        <h3>${subtotal.toFixed(2)}</h3>
      </div>
    </section>
  );
}

export default OrderSummary;
