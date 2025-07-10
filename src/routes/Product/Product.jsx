import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import ProductOverview from "../../sections/ProductOverview/ProductOverview";
import "./Product.css";

function Product() {
  const { id } = useParams();
  const { data, loading, error } = useAxios(
    `http://127.0.0.1:8000/api/products/${id}`
  );

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Assuming your product data has `name` and a categories array (WooCommerce usually does)
  const productName = data?.name || "Product";
  const categories = data?.categories || []; // array of categories

  return (
    <main className="Product">
      <BreadCrumbs productName={productName} categories={categories} />
      <ProductOverview product={data} />
    </main>
  );
}

export default Product;
