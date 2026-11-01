import React, { useEffect, useRef, useState } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";

function Navbar() {
  const menuRef = useRef();
  const searchBarRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();

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

  const isLoggedIn = isTokenValid(token);

  localStorage.setItem("isLoggedIn", isLoggedIn);

  const normalizedRole = role
    .trim()
    .toUpperCase()
    .replace(/^ROLE_/, "");

  localStorage.setItem("nrole", normalizedRole);

  const isAdmin = isLoggedIn && normalizedRole === "ADMIN";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken("");
    setRole("");

    window.dispatchEvent(new Event("authChanged"));

    navigate("/");
    toggleMenu();
  };

  useEffect(() => {
    const updateAuth = () => {
      setToken(localStorage.getItem("token") || "");
      setRole(localStorage.getItem("role") || "");
    };

    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener("authChanged", updateAuth);
    };
  }, []);

  useEffect(() => {
    menuRef.current.classList.remove("active");
    searchBarRef.current.classList.remove("active");
  }, [location.pathname]);

  const toggleMenu = (params) => {
    menuRef.current.classList.toggle("active");
    searchBarRef.current.classList.remove("active");
  };

  const toggleSearch = (params) => {
    searchBarRef.current.classList.toggle("active");
    menuRef.current.classList.remove("active");
    // navbarRef.current.classList.add("hide");
  };

  function handleUser() {
    window.alert("This page is in under progress...");
  }

  return (
    <div>
      <nav>
        <div className="navbar">
          {/* <button className="menu" onClick={ () => menuRef.current.style.display = "block"}>Menu</button> */}
          <div className="menu" onClick={toggleMenu}>
            <img src="./icons/menu.png" alt="" />
          </div>
          <h1 className="logo">Akash Mobile Mart</h1>
          <div onClick={toggleSearch} className="search-btn">
            {/* <img src={require('../assets/navbar/search.png')} alt="search btn" /> */}
            <img src="./icons/search.png" alt="Logo" />
          </div>
        </div>
        <div ref={menuRef} className="menu-items">
          <ul onClick={toggleMenu}>
            <li>
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link"
                to={"/products"}
                onClick={toggleMenu}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/offers">
                Offers
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about">
                About us
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {/* <li>
              <NavLink className={"nav-link"} to={"/signup"}>
                Signup
              </NavLink>
            </li> */}
            {isLoggedIn &&
              (isAdmin ? (
                <li>
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                <li>
                  <p className="nav-link user" onClick={handleUser}>
                    Profile
                  </p>
                </li>
              ))}
            {isLoggedIn && (
              <li onClick={toggleMenu}>
                <button
                  className="logout-btn"
                  onClick={handleLogout}
                  style={{
                    fontSize: "14px",
                    padding: "4px 0px 0",
                    margin: "7px 0 2px",
                    border: "none",
                    color: "blue",
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <div className="search-bar" ref={searchBarRef}>
        <Search />
      </div>
    </div>
  );
}

export default Navbar;
