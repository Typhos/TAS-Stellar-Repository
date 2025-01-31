import "./styles/App.scss";

import React, { useLayoutEffect } from "react";
import { Route, HashRouter as Router, Routes, useLocation } from "react-router-dom";

import HomePage from "./pages/SectorMap";
import PageLayout from "./components/Layout/PageLayout";
import PlanetDetails from "./pages/PlanetDetails/PlanetDetails";
import PlanetList from "./pages/PlanetList/PlanetList";
import StellarTravelTime from "./pages/StellarTravelTime/StellarTravelTime";

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/planet/:planetName" element={<PlanetDetails />} />
            <Route path="/planet-list" element={<PlanetList />} />
            <Route path="/stellar-travel-time" element={<StellarTravelTime />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
}
