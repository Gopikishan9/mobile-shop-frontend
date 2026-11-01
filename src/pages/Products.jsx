import { useState, useEffect } from "react";

import ProductCard from "../components/ProductCard";

import API_BASE_URL from "../services/api";

const Products = () => {
  const [showFilters, setshowFilters] = useState(false);
  const [showSorts, setshowSorts] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError("")
        const response = await fetch(`${API_BASE_URL}/api/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="products">
      <div className="filters">
        <div className="filter">
          <button
            className="filter-toggle"
            onClick={() => setshowFilters(!showFilters)}
          >
            Filter
          </button>
          <div className={`filter-groups ${showFilters ? "show" : ""}`}>
            {/* Brand */}
            <div className="filter-group">
              <h4 className="filter-title">Brand</h4>

              <div className="btns">
                <button className="filter-btn">All</button>
                <button className="filter-btn">Vivo</button>
                <button className="filter-btn">Samsung</button>
                <button className="filter-btn">Apple</button>
                <button className="filter-btn">OnePlus</button>
              </div>
            </div>

            {/* Category */}
            <div className="filter-group">
              <h4 className="filter-title">Category</h4>

              <div className="btns">
                <button className="filter-btn">All</button>
                <button className="filter-btn">Smartphones</button>
                <button className="filter-btn">Tablets</button>
                <button className="filter-btn">Accessories</button>
              </div>
            </div>

            {/* RAM */}
            <div className="filter-group">
              <h4 className="filter-title">RAM</h4>

              <div className="btns">
                <button className="filter-btn">All</button>
                <button className="filter-btn">4GB</button>
                <button className="filter-btn">6GB</button>
                <button className="filter-btn">8GB</button>
                <button className="filter-btn">12GB</button>
              </div>
            </div>

            {/* Storage */}
            <div className="filter-group">
              <h4 className="filter-title">Storage</h4>

              <div className="btns">
                <button className="filter-btn">All</button>
                <button className="filter-btn">64GB</button>
                <button className="filter-btn">128GB</button>
                <button className="filter-btn">256GB</button>
                <button className="filter-btn">512GB</button>
              </div>
            </div>
          </div>
        </div>
        <div className="sorts">
          {/* Sorting */}
          <div className="sort">
            <button
              className="sort-toggle"
              onClick={() => setshowSorts(!showSorts)}
            >
              Sort
            </button>
            <div className={`sort-group ${showSorts ? "show" : ""}`}>
              <h4>Sort by</h4>
              <div className="btns">
                <button className="sort-btn">Recommended</button>
                <button className="sort-btn">Price: Low to High</button>
                <button className="sort-btn">Price: High to Low</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            // prodId={product.id}
            // prodName={product.name}
            // prodImg={product.image}
            // price={product.price}
            variant="horizontal"
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
