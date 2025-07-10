import React from "react";
import { Link } from "react-router-dom";
import "./BreadCrumbs.css";

function BreadCrumbs({ productName, categories }) {
  const category = categories.length > 0 ? categories[0] : null;

  return (
    <nav className="BreadCrumbs" aria-label="breadcrumb">
      <Link to="/">Home</Link>
      {category && (
        <>
          {" > "}
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        </>
      )}
      {" > "}
      <p aria-current="page">{productName}</p>
    </nav>
  );
}

export default BreadCrumbs;
