import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate=useNavigate()
  const logOut=()=> {
       localStorage.removeItem("token");
       setToken("");
       navigate("/")

  }
  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <h1>AnilFood</h1>
          {/* <img src={assets.logo} alt="AnilFood" className="logo" /> */}
        </Link>

        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => setMenu("Menu")}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => setMenu("mobile")}
            className={menu === "mobile" ? "active" : ""}
          >
            mobile
          </a>
          <a
            href="#foote"
            onClick={() => setMenu("contact")}
            className={menu === "contact" ? "active" : ""}
          >
            contact
          </a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="" />
            </Link>
            <div className={ getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}>
                  <img  src={assets.bag_icon} alt="" />
                  <p>Order</p>
                </li>
                <hr />
                <li onClick={logOut}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
