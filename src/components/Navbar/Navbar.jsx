import "./Navbar.css";
import Logo from "../../assets/images/LEFTKOAST-LOGO.png";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectCurrentUser } from "../../redux/slices/userSlice";
import Cart from "../Cart/Cart";

function Navbar() {
  const user = useSelector(selectCurrentUser);
  const cartData = useSelector((state) => state.cart.items);
  const [toggleCart, setToggleCart] = useState(false);

  const openCart = () => {
    setToggleCart(true);
  };

  console.log(user);

  return (
    <nav className="Navbar">
      <img src={Logo} width={50} />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/browser">Browser</Link>
        </li>
        <li>
          <Link to="/library">Library</Link>
        </li>
      </ul>
      <ul>
        <li>
          <button>
            <IoIosSearch size={20} />
          </button>
        </li>
        <li className="cart-btn">
          <button onClick={openCart}>
            <IoCartSharp size={20} />
          </button>
          <span>{cartData.length}</span>
        </li>
        <li className="login-btn">
          {user ? (
            <button>
              <Link to="/profile">
                {user?.slug} <FaUserCircle size={20} />
              </Link>
            </button>
          ) : (
            <button>
              <Link to="/login">
                Login <FaUserCircle size={20} />
              </Link>
            </button>
          )}
        </li>
      </ul>
      <Cart toggleCart={toggleCart} setToggleCart={setToggleCart} />
    </nav>
  );
}

export default Navbar;
