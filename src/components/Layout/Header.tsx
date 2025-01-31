import { Link, useLocation } from "react-router-dom";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__shell">
        <h1 className="header__appName">TAS Stellar Repository</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">🗺️ Sector Map</Link>
            </li>
            <li>
              <Link to="/planet-list">📃 Planet List</Link>
            </li>
            <li>
              <Link to="/stellar-travel-time">🚀 Stellar Travel</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
