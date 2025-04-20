import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">AI Feedback Analyzer</Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/add-feedback"
                  className={
                    location.pathname === "/add-feedback" ? "active" : ""
                  }
                >
                  Add Feedback
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
