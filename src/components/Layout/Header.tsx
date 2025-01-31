import React, { useState } from "react";

import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header__shell">
        <h1 className="header__appName">TAS Stellar Repository</h1>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <li className="nav-links__sectorMap">
              <Link to="/" onClick={closeMenu}>
                🗺️ Sector Map
              </Link>
            </li>
            <li className="nav-links__planetList">
              <Link to="/planet-list" onClick={closeMenu}>
                📃 Planet List
              </Link>
            </li>
            <li className="nav-links__sectorTravel">
              <Link to="/stellar-travel-time" onClick={closeMenu}>
                🚀 Stellar Travel
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
