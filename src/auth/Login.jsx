
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API_BASE_URL from "../services/api"

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      if (!data.token || !data.role) {
        throw new Error("Login response mein token ya role missing hai.");
      }

      // Token aur actual backend role save karo
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Navbar ko authentication update notify karo
      window.dispatchEvent(new Event("authChanged"));

      const normalizedRole = data.role
        .trim()
        .toUpperCase()
        .replace(/^ROLE_/, "");

      if (normalizedRole === "ADMIN") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <p className="login-subtitle">
          Login to your Akash Mobile Mart account
        </p>

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <button
          className="login-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}

export default Login;
