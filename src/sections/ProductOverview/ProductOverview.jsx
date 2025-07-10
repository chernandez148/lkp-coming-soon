import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { IoCart } from "react-icons/io5";
import StarRating from "../../components/StarRating/StarRating";
import "./ProductOverview.css";

function ProductOverview({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.regular_price),
        image: product.images?.[0]?.src || "",
        quantity: 1,
      })
    );
  };

  return (
    <section className="ProductOverview">
      <div className="product-image">
        <img src={product.images?.[0]?.src || ""} />
      </div>
      <div className="product-details">
        <p>{product.categories[0].name}</p>
        <div className="product-title">
          <h1 className="product-name">{product.name}</h1>
          <h3>${product.regular_price}</h3>
        </div>
        <h4>{product.meta_data[0].value}</h4>
        <StarRating rating={product.average_rating} />
        <div
          className="product-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="product-buttons">
          <button onClick={addToCartHandler}>
            <IoCart size={18} /> Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductOverview;
