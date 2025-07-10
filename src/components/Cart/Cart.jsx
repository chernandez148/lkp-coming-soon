import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp, IoTrashOutline } from "react-icons/io5";
import { removeFromCart } from "../../redux/slices/cartSlice";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch(); // Move this here
  const cartData = useSelector((state) => state.cart.items);

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  console.log(cartData);

  return (
    <div className="Cart">
      <div className="cart-header">
        <p>Your cart</p>
        <button>
          <IoCloseSharp color="black" />
        </button>
      </div>
      <div className="items">
        {cartData.map((item) => {
          return (
            <div className="item" key={item.id}>
              <div className="item-description">
                <img src={item.image} width={75} alt={item.name} />
                <div className="item-name">
                  <h5>{item.name}</h5>
                  <p>{item.author}</p>
                </div>
              </div>
              <div className="item-price">
                <button onClick={() => removeItem(item.id)}>
                  <IoTrashOutline color="black" size={16} />
                </button>
                <h5>${item.price}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
