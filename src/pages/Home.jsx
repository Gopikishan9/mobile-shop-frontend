import React from "react";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import API_BASE_URL from "../services/api";

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
    <div className="home">
      <section className="hero">
        <img src="./slider/one.png" alt="slider-img" />
      </section>
      <section className="categories">
        <h3>Category</h3>
        <div className="cards">
          <CategoryCard
            name="Mobiles"
            category="smartphones"
            imgSrc="./icons/smartphone.png"
          />
          <CategoryCard
            name="Laptops"
            category="laptops"
            imgSrc="./icons/laptop.png"
          />
          <CategoryCard
            name="Headphones"
            category="headphones"
            imgSrc="./icons/headphones.png"
          />
          <CategoryCard
            name="Earbuds"
            category="earbuds"
            imgSrc="./icons/earphone.png"
          />
        </div>
      </section>
      <section className="featured">
        <h3>Featured</h3>
        <div className="cards">
          {products
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
