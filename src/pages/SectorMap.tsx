import React, { useEffect } from "react";

import SectorMap from "../components/SectorMap/SectorMap";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (isMobile) {
      navigate("/planet-list", { replace: true });
    }
  }, [isMobile, navigate]);

  return (
    <>
      {!isMobile && (
        <>
          <h2 className="sectorName">Sector: Malcari Drift</h2>
          <SectorMap />
        </>
      )}
    </>
  );
};

export default HomePage;
