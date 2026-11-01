import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/Footer";

import Login from "./auth/Login";
import Admin from "./admin/Admin";
import User from "./user/User";

import ScrollToTop from "./components/ScrollToTop";
import CategorizedProducts from "./pages/CategorizedProducts";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:categoryName" element={<CategorizedProducts />} />
        <Route path="/product/:prodId" element={<ProductDetails />} />
        {/* <Route path="/offers" element={<Offers />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
