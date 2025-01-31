import "./PlanetDetails.scss";

import { Planet, TradeCodeDescriptions } from "../../models/stellarModels";
import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import JumpTimeTable from "../../components/JumpTimeTable/JumpTimeTable";
import UWPTable from "../../components/UWPTable/UWPTable";
import { compileSectorData } from "../../data/dataLoader";
import { getStarportInfo } from "../../models/starportModel";
import { useParams } from "react-router-dom";

const PlanetDetails: React.FC = () => {
  // Extract the planet name from the URL
  const { planetName } = useParams<{ planetName: string }>();
  const [mapExists, setMapExists] = useState(false);

  // Get all planets and create a lookup table
  const planets = compileSectorData();
  const planetLookup = new Map<string, Planet>();

  planets.forEach((planet) => {
    planetLookup.set(planet.name.toLowerCase(), planet); // Use lowercase for case-insensitive matching
  });

  // Retrieve the planet's data using the name from the URL
  const planet = planetName ? planetLookup.get(planetName.toLowerCase()) : null;
  const starportInfo = getStarportInfo(planet.uwp);
  const portTypes = getPortTypes(planet);

  // Handle the case where the planet is not found
  if (!planet) {
    return <div>Planet not found</div>;
  }

  const mapFileName = `${planet?.name}-${planet.uwp}.png`;
  const mapSrc = `${import.meta.env.BASE_URL}images/planetMaps/${mapFileName}`;

  useEffect(() => {
    const img = new Image();
    img.src = mapSrc;
    img.onload = () => setMapExists(true);
    img.onerror = () => setMapExists(false);
  }, [mapSrc]);

  return (
    <div className="planet-details">
      <div className="planet-details__header bottom-border">
        <h2 className="planet-details__name">{planet.name}</h2>
        <div className="uwp-container">
          <UWPTable uwp={planet.uwp} tradeCodes={planet.tradeCodes} />
        </div>
      </div>

      <div className="planet-details__columns">
        {/* Economic Data */}
        <div className="planet-details__economic">
          <h2 className="">Economic Information</h2>
          <h3>Starport</h3>
          <ul>
            <li>
              <strong>Class:</strong> {starportInfo?.class}
            </li>
            <li>
              <strong>Quality:</strong> {starportInfo?.quality}
            </li>
            {portTypes && (
              <li>
                <strong>Types:</strong> {portTypes}
              </li>
            )}
            <li>
              <strong>Berthing Fees (weekly):</strong> {getBerthingFees(planet.berthing, planet.uwp)}
            </li>
            <li>
              <strong>Shipyard:</strong> {starportInfo?.shipyard}
            </li>
            <li>
              <strong>Repair Capabilities:</strong> {starportInfo?.repair}
            </li>
            <li>
              <strong>Fuel Available:</strong> {starportInfo?.refinedFuel ? "Refined (Cr500 / ton)" : ""}
              {starportInfo?.unrefinedFuel ? "Unrefined (Cr100 / ton)" : ""}
            </li>
            {starportInfo?.refinedFuel && (
              <li>
                <strong>Max Refined Fuel Per Day:</strong> {starportInfo?.maxRefinedFuelPerDay}
              </li>
            )}
            <li>
              <strong>Total Docking Space:</strong> {starportInfo?.dockingSpace}
            </li>
          </ul>
          {planet.gasGiants.length > 0 && (
            <>
              <h3>Gas Giant{planet.gasGiants.length > 1 ? "s" : ""}</h3>
              <ul>
                {planet.gasGiants?.map((planet) => {
                  return <li key={planet}>{planet}</li>;
                })}
              </ul>
            </>
          )}
          <h3>Trade Classifications and Remarks</h3>
          <ul>
            {planet.tradeCodes?.map((code) => {
              const tradeInfo = TradeCodeDescriptions[code];
              return (
                <li key={code}>
                  <strong>{tradeInfo.name}</strong>: {tradeInfo.description}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Planetary Metrics */}
        <div className="planet-details__metrics">
          <h2 className="">Planetary Metrics</h2>
          <ul>
            {planet.moons?.length > 0 && (
              <li>
                <strong>Moons:</strong> {planet.moons.join(", ")}
              </li>
            )}
            {planet.moons?.length === 0 && (
              <li>
                <strong>Moons:</strong> None
              </li>
            )}
            {planet.diameter && (
              <li>
                <strong>Diameter:</strong> {planet.diameter} km
              </li>
            )}
            {planet.gravity && (
              <li>
                <strong>Gravity:</strong> {planet.gravity} G
              </li>
            )}
            {planet.orbitalPeriod && (
              <li>
                <strong>Orbital Period:</strong> {planet.orbitalPeriod}
              </li>
            )}
            {planet.distanceFromStarAU && (
              <li>
                <strong>Distance from Star:</strong> {planet.distanceFromStarAU} AU
              </li>
            )}
            {planet.temperatures && (
              <li>
                <strong>Day/Night Temps:</strong> {planet.temperatures.daytime}°C / {planet.temperatures.nighttime}°C
              </li>
            )}
          </ul>

          {planet.diameter && <JumpTimeTable diameterKm={planet.diameter} />}
        </div>
      </div>

      {mapExists && (
        <>
          <h2 className="planet-details__map--heading  bottom-border">Surface Map</h2>
          <img className="planet-details__map" src={mapSrc} alt={`${planet.name} Map`} />
        </>
      )}

      {planet.description.length > 0 && (
        <>
          <h2 className=" bottom-border">Planetary Description</h2>
          <div
            className="planet-details__description"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(planet.description.join("")) }}
          />
        </>
      )}
    </div>
  );
};

const getPortTypes = (planet: Planet) => {
  if (planet.uwp[0] === "X") return null;
  if (planet.bases.includes("Highport")) return "Highport & Lowport";
  return "Lowport Only";
};

const getBerthingFees = (fee: number | undefined, uwp: string) => {
  if (fee === 0 || uwp[0] === "X" || uwp[0] === "E") return "none";
  if (fee) return `Cr${fee / 10} per ton`;

  return "unknown";
};

export default PlanetDetails;
