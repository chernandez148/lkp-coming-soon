import "./Navbar.css";
import Logo from "../../assets/images/LEFTKOAST-LOGO.png";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";

function Navbar() {
  const cartData = useSelector((state) => state.cart.items);

  console.log(cartData);

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
          <button>
            <IoCartSharp size={20} />
          </button>
          <span>{cartData.length}</span>
        </li>
        <li className="login-btn">
          <button>
            Login <FaUserCircle size={20} />
          </button>
        </li>
      </ul>
      <Cart />
    </nav>
  );
}

export default Navbar;
