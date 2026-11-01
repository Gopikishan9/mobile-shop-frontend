import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";
import Specification from "../components/Specification";
import API_BASE_URL from "../services/api";

function ProductDetails() {
  // useParam url se id leta hai
  const { prodId } = useParams();
  const id = Number(prodId);

  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const [response, response2] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products/${id}`),
          fetch(`${API_BASE_URL}/api/products`),
        ]);

        if (!response.ok) {
          throw new Error(`Product not found with id: ${id}`);
        }

        if (!response2.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const allProducts = await response2.json();

        setProduct(data);
        setProducts(allProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const [ram, setRam] = useState("8GB");
  const [rom, setRom] = useState("128GB");

  const [selectedId, setSelectedId] = useState(1);

  const getStyle = (id) => ({
    width: "fit-content",
    padding: "10px 20px",
    margin: "7px 10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "inline-block",
    cursor: "pointer",
    backgroundColor: selectedId === id ? "#eb7125" : "#ffffff",
    color: selectedId === id ? "#ffffff" : "#000000",
    transition: "background-color 0.2s ease",
  });

  const navigate = useNavigate();

  // Order using whatsapp
  const WhatsAppButton = () => {
    const phone = "919076588408";
    const message = `Hello, I want to know more about your product. ${product.name} (${ram}, ${rom})`;
    // without message
    // window.open(`https://wa.me/${phone}`)
    // with message
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`);
  };

  if (loading) {
  return <p>Loading product...</p>;
}

if (error) {
  return <p>Error: {error}</p>;
}

if (!product) {
  return <p>Product Not Found!</p>;
}

  return (
    <div className="product-details">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <p className="brand">{product.brand}</p>
        <h1 className="product-name">{product.name}</h1>
        <div className="price">
          <span className="old-price">₹{product.oldPrice}</span>
          <span className="current-price">₹{product.price}</span>
        </div>
      </div>

      <div className="variants">
        {/* <div className="variant-group">
          <h3>RAM</h3>
          <div className="variant-options">
            <button>8GB</button>
            <button>12GB</button>
          </div>
        </div> */}

        <div className="variant-group">
          <h3>Storage</h3>
          <div className="variant-options storage">
            <div
              className="storage"
              onClick={() => (setSelectedId(1), setRam("8"), setRom("128GB"))}
              style={getStyle(1)}
            >
              <span>8GB</span> | <span>128GB</span>
            </div>
            <div
              className="storage"
              onClick={() => (setSelectedId(2), setRam("8GB"), setRom("256GB"))}
              style={getStyle(2)}
            >
              <span>8GB</span> | <span>256GB</span>
            </div>
            <div
              className="storage"
              onClick={() => (
                setSelectedId(3),
                setRam("12GB"),
                setRom("256GB")
              )}
              style={getStyle(3)}
            >
              <span>12GB</span> | <span>256GB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="specifications">
        <h2>Key Specifications</h2>

        <div style={{ display: "flex", gap: "48px" }}>
          <span>
            <b>Category : </b>
          </span>
          <span> {product.category}</span>
        </div>

        {Object.entries(product.specifications || {}).map(([key, value]) => (
          <Specification key={key} keyName={key} valueName={String(value)} />
        ))}
      </div>

      <div className="description">
        <h2>Description</h2>

        <p>{product.description}</p>
      </div>

      {/* Related  */}
      <section className="related-products">
        <h2>You May Also Like</h2>
        <div className="cards">
          {products
            .filter(
              (item) =>
                !(item.id === product.id) && item.category === product.category,
            )
            .slice(0, 4)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>

      {/* Fixed Action Buttons */}
      <div className="book">
        {/* <button className="add-cart">Add to Cart</button> */}
        {/* <button
          className="order"
          onClick={() => navigate(`/checkout/${product.id}`)}
          quantity={"hellow"}
        >
          Order Now
        </button> */}
        <button className="whatsapp" onClick={WhatsAppButton}>
          Order using whatsapp
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
