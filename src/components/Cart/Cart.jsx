import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp, IoTrashOutline } from "react-icons/io5";
import { removeFromCart } from "../../redux/slices/cartSlice";
import "./Cart.css";

function Cart({ toggleCart, setToggleCart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart.items);

  const closeCart = () => setToggleCart(false);

  const removeItem = (id) => dispatch(removeFromCart(id));

  const totalPrice = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={`Cart ${toggleCart ? "open" : ""}`}>
      <div className="cart-header">
        <p>Your Cart ({cartData.length})</p>
        <button onClick={closeCart}>
          <IoCloseSharp size={22} />
        </button>
      </div>
      <div className="items">
        {cartData.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartData.map((item) => (
            <div className="item" key={item.id}>
              <div className="item-description">
                <img src={item.image} width={75} alt={item.name} />
                <div className="item-name">
                  <h5>{item.name}</h5>
                  {item.author && <p>{item.author}</p>}
                  {item.category && (
                    <img
                      src={item.category}
                      alt="category icon"
                      title="Category"
                    />
                  )}
                </div>
              </div>
              <div className="item-price">
                <button onClick={() => removeItem(item.id)}>
                  <IoTrashOutline color="black" size={16} />
                </button>
                <h5>${item.price.toFixed(2)}</h5>
              </div>
            </div>
          ))
        )}
      </div>
      {cartData.length > 0 && (
        <div className="cart-footer">
          <h4>Sub Total: ${totalPrice.toFixed(2)}</h4>
          <button
            className="checkout-btn"
            onClick={() => {
              navigate("/checkout");
              setToggleCart(false);
            }}
          >
            Proceed to Checkout
          </button>
          <p>Taxes are calculated at checkout</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
