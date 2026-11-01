import { useEffect, useState } from "react";
import "./Admin.css";
import API_BASE_URL from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken("");
    setRole("");

    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
  };

  const [activeTab, setActiveTab] = useState("Dashboard");

  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    inStock: true,
    description: "",
    specifications: "{}",
    image: null,
  });

  const menuItems = ["Dashboard", "Products"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
            ? files[0] || null
            : value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    let specifications;

    try {
      specifications = JSON.parse(form.specifications);
      if (
        !specifications ||
        typeof specifications !== "object" ||
        Array.isArray(specifications)
      ) {
        throw new Error();
      }
    } catch {
      setFormError(
        'Specifications must be a valid JSON object, e.g. {"RAM":"8GB"}',
      );
      return;
    }

    if (!form.image) {
      setFormError("Please select a product image.");
      return;
    }

    const data = new FormData();

    data.append("name", form.name);
    data.append("brand", form.brand);
    data.append("price", form.price);
    data.append("oldPrice", form.oldPrice);
    data.append("category", form.category);
    data.append("inStock", String(form.inStock));
    data.append("description", form.description);
    data.append("image", form.image);

    data.append("specifications", JSON.stringify(specifications));

    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: data,
      });

      if (!response.ok) {
        const errorBody = await response.text();

        console.error("Product creation error:", {
          status: response.status,
          body: errorBody,
        });

        throw new Error(
          `Product creation failed (${response.status}): ${
            errorBody || "No error details returned by backend."
          }`,
        );
      }

      const createdProduct = await response.json();

      setProducts((prev) => [...prev, createdProduct]);
      setFormSuccess("Product added successfully!");

      setForm({
        name: "",
        brand: "",
        price: "",
        oldPrice: "",
        category: "",
        inStock: true,
        description: "",
        specifications: "{}",
        image: null,
      });

      e.target.reset();
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSaving(false);
    }
  };

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

  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");

  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      return payload.exp && payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  const normalizedRole = role
    .trim()
    .toUpperCase()
    .replace(/^ROLE_/, "");

  if (isTokenValid(token) && normalizedRole === "ADMIN") {
    return (
      <div className="admin-container">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h2 className="admin-logo">Mobile Shop</h2>
          <p className="admin-subtitle">Admin Panel</p>

          <nav className="admin-nav">
            {menuItems.map((item) => (
              <button
                key={item}
                className={`admin-nav-item ${activeTab === item ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item);
                  setShowAddForm(false);
                }}
              >
                {item}
              </button>
            ))}
          </nav>

          <button className="admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <header className="admin-header">
            <div>
              <h1>{activeTab}</h1>
              <p>Welcome to your admin panel</p>
            </div>
          </header>

          {showAddForm && (
            <form className="admin-product-form" onSubmit={handleAddProduct}>
              <h3>Add New Product</h3>

              <div className="admin-form-grid">
                <label>
                  Product Name *
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Brand *
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Price *
                  <input
                    name="price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Old Price
                  <input
                    name="oldPrice"
                    type="number"
                    min="0"
                    value={form.oldPrice}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  Category *
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  Product Image *
                  <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="admin-stock-field">
                  <input
                    name="inStock"
                    type="checkbox"
                    checked={form.inStock}
                    onChange={handleChange}
                  />
                  In Stock
                </label>

                <label className="admin-description-field">
                  Description *
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="admin-description-field">
                  Specifications (JSON)
                  <textarea
                    name="specifications"
                    value={form.specifications}
                    onChange={handleChange}
                    placeholder='{"RAM":"8GB","Storage":"256GB"}'
                    required
                  />
                </label>
              </div>

              {formError && <p className="admin-form-error">{formError}</p>}
              {formSuccess && (
                <p className="admin-form-success">{formSuccess}</p>
              )}

              <button
                className="admin-primary-btn"
                type="submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
            </form>
          )}

          {activeTab === "Dashboard" && (
            <section className="admin-dashboard">
              <div className="admin-card">
                <h3>Total Products</h3>
                <p>{products.length}</p>
              </div>

              <div className="admin-card">
                <h3>In Stock</h3>
                <p>
                  {
                    products.filter((product) => product.inStock === true)
                      .length
                  }
                </p>
              </div>

              <div className="admin-card">
                <h3>Out of Stock</h3>
                <p>
                  {
                    products.filter((product) => product.inStock === false)
                      .length
                  }
                </p>
              </div>

              <div className="admin-section">
                <h2>Quick Actions</h2>
                <button
                  className="admin-primary-btn"
                  onClick={() => setActiveTab("Products")}
                >
                  Manage Products
                </button>
              </div>
            </section>
          )}

          {activeTab === "Products" && (
            <section className="admin-section">
              <div className="admin-section-header">
                <h2>Product Management</h2>

                <button
                  className="admin-primary-btn"
                  onClick={() => {
                    setShowAddForm((prev) => !prev);
                    setFormError("");
                    setFormSuccess("");
                  }}
                >
                  {showAddForm ? "Cancel" : "+ Add Product"}
                </button>
              </div>

              {loading ? (
                <p>Loading products...</p>
              ) : error ? (
                <p className="admin-form-error">{error}</p>
              ) : products.length === 0 ? (
                <div className="admin-empty-state">
                  <h3>No products found</h3>
                  <p>Click "+ Add Product" to add your first product.</p>
                </div>
              ) : (
                <div className="admin-products-list">
                  {products.map((product) => (
                    <div className="admin-product-item" key={product.id}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="admin-product-image"
                      />

                      <div className="product-need">
                        <div className="admin-product-info">
                          <h3>{product.name}</h3>
                          <p>{product.brand}</p>
                          <p>₹{product.price}</p>
                          <p>{product.category}</p>
                          <p>
                            Stock:{" "}
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </p>
                        </div>
                        {/* <div className="update-delete-btn">
                      <button>Update</button>
                      <button>Delete</button>
                    </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    );
  } else {
    return (
      <div
        className="user"
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Chal Hatt sale</h2>
        <p style={{ fontSize: "12px" }}>(Fuck you 🫶)</p>
        <h2>Access Denied</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }
}
