// Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");

    // Clear local storage
    localStorage.removeItem("doctorData");
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("reviewFormData_")) {
        localStorage.removeItem(key);
      }
    }

    setIsLoggedIn(false);
    setUsername("");
    // Optional: reload page if you want a hard reset
    // window.location.reload();
  };

  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const storedEmail = sessionStorage.getItem("email");
    const storedName = sessionStorage.getItem("name");

    if (token) {
      setIsLoggedIn(true);
      if (storedEmail) {
        // Extract part before @
        const usernamePart = storedEmail.split("@")[0];
        setUsername(usernamePart);
      } else {
        setUsername(storedName || "User");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
        </Link>
        <span>.</span>
      </div>

      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>

      <ul className={click ? "nav__links active" : "nav__links"}>
        <li className="link"><Link to="/">Home</Link></li>
        <li className="link"><Link to="/search/doctors">Appointments</Link></li>
        <li className="link"><Link to="/healthblog">Health Blog</Link></li>
        <li className="link"><Link to="/reviews">Reviews</Link></li>

        {isLoggedIn ? (
          <>
            <li className="link">
              <span className="welcome-text">Welcome, {username}</span>
            </li>
            <li className="link">
              <button className="btn2" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup"><button className="btn1">Sign Up</button></Link>
            </li>
            <li className="link">
              <Link to="/login"><button className="btn1">Login</button></Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


