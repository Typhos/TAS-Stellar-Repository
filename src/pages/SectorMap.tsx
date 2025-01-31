import React from "react";
import SectorMap from "../components/SectorMap/SectorMap";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h2 className="sectorName">Sector: Malcari Drift</h2>
      <SectorMap />
    </div>
  );
};

export default HomePage;
