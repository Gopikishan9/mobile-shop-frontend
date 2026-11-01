import React from "react";

import { Link } from "react-router-dom";

const ProductCard = ({ product, variant = "card" }) => {
  const description = product.description;
  const characterLimit = 50;

  return (
    <div className={`product-card ${variant}`}>
      <Link to={`/product/${product.id}`}>
        <div className="img">
          <img src={product.image} alt="" className={product.name} />
        </div>
        <div className="details">
          <p className="product-name">{product.name}</p>
          <div className="price">
            <p className="old-price">₹{product.oldPrice}</p>
            <p className="current-price">₹{product.price}</p>
          </div>
          {variant === "horizontal" && (
            <p className="desc">
              {/* {description.length > characterLimit
                ? `${description.substring(0, characterLimit)}`
                : description} */}
                {description}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
