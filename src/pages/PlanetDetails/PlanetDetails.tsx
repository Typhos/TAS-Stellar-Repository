import "./PlanetDetails.scss";

import {
  AtmosphereData,
  GovernmentData,
  HydrographicsData,
  LawLevelData,
  PopulationData,
  SizeData,
  TechLevelData,
} from "../../models/uwpModel";
import { Planet, TradeCodeDescriptions } from "../../models/stellarModels";
import React, { useEffect, useState } from "react";

import DOMPurify from "dompurify";
import JumpTimeTable from "../../components/JumpTimeTable/JumpTimeTable";
import { compileSectorData } from "../../data/dataLoader";
import { formatPopulation } from "../../utils/helpers";
import { getStarportInfo } from "../../models/starportModel";
import { useParams } from "react-router-dom";

const PlanetDetails: React.FC = () => {
  const { planetName } = useParams<{ planetName: string }>();
  const [mapExists, setMapExists] = useState(false);

  const planets = compileSectorData();
  const planetLookup = new Map<string, Planet>();

  planets.forEach((planet) => {
    planetLookup.set(planet.name.toLowerCase(), planet);
  });

  const planet = planetName ? planetLookup.get(planetName.toLowerCase()) : null;
  const starportInfo = getStarportInfo(planet?.uwp);

  if (!planet) {
    return <div>Planet not found</div>;
  }

  const mapFileName = `${planet.name}-${planet.uwp}.png`;
  const mapSrc = `${import.meta.env.BASE_URL}images/planetMaps/${mapFileName}`;

  useEffect(() => {
    const img = new Image();
    img.src = mapSrc;
    img.onload = () => setMapExists(true);
    img.onerror = () => setMapExists(false);
  }, [mapSrc]);

  return (
    <div className="planet-details">
      <header className="planet-details__header">
        <h1>{planet.name}</h1>
        <p className="planet-details__header--uwp">
          <span className="uwp-code">{planet.uwp}</span> {planet.tradeCodes?.join(" ")}
        </p>
      </header>

      {planet.alert && (
        <section className={`planet-details__alert-status ${planet.alert === "Amber" ? "amber" : "red"}`}>
          {/* <span className="advisory"></span>{" "} */}
          <span className={planet.alert === "Amber" ? "amber" : "red"}>Travel Code {planet.alert}</span>
        </section>
      )}

      <section
        className="planet-details__description"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(planet.introduction) }}
      />

      <aside className="planet-details__sidebar">
        <table className="starport-table">
          <thead>
            <tr>
              <th className="tableTitle" colSpan={2}>
                Starport Overview
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Class</th>
              <td>
                {starportInfo?.quality} ({starportInfo?.class})
              </td>
            </tr>
            {starportInfo?.class !== "X" && (
              <>
                <tr>
                  <th>Berthing Fee</th>
                  <td>{planet.berthing ? `${getBerthingFees(planet.berthing, planet.uwp)} per week` : "unknown"}</td>
                </tr>
                <tr>
                  <th>Traffic</th>
                  <td>{planet.weeklyTraffic ? `${planet.weeklyTraffic} ships per week` : "unknown"}</td>
                </tr>
                <tr>
                  <th>Shipyard</th>
                  <td>{starportInfo?.shipyard}</td>
                </tr>
                <tr>
                  <th>Repair Capabilities</th>
                  <td>{starportInfo?.repair}</td>
                </tr>
                <tr>
                  <th>Fuel</th>
                  <td>{starportInfo?.refinedFuel ? "Refined" : "Unrefined"}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <JumpTimeTable diameterKm={planet.diameter} />
      </aside>

      <section className="planet-details__overview">
        <h2>World Profile</h2>
        <ul className="overview-grid">
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Starport Class</h4>
            <p className="overview-grid__value">
              {starportInfo?.quality} ({starportInfo?.class})
            </p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Size</h4>
            <p className="overview-grid__value">
              {planet.diameter ? planet.diameter?.toLocaleString().concat(" km") : SizeData[planet.uwp[1]]?.diameter} (
              {planet.gravity ? planet.gravity + " G" : SizeData[planet.uwp[1]]?.gravity})
            </p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Atmosphere</h4>
            <p className="overview-grid__value">{AtmosphereData[planet.uwp[2]]?.description || "Unknown"}</p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Hydrographics</h4>
            <p className="overview-grid__value">
              ~{HydrographicsData[planet.uwp[3]]?.percentage} of surface area
              {(planet.uwp[2] === "B" || planet.uwp[2] === "C") && <i> (Non-water surface liquids)</i>}
            </p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Population</h4>
            <p className="overview-grid__value">
              {planet.population
                ? formatPopulation(planet.population)
                : PopulationData[planet.uwp[4]]?.populationRange || "Unknown"}
            </p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Government</h4>
            <p className="overview-grid__value">
              {planet.government ? planet.government : GovernmentData[planet.uwp[5]]?.description || "Unknown"}
            </p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Law Level</h4>
            <p className="overview-grid__value">{LawLevelData[planet.uwp[6]]?.restrictions || "Unknown"}</p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Tech Level</h4>
            <p className="overview-grid__value">
              {TechLevelData[planet.uwp[8]]?.type} - {TechLevelData[planet.uwp[8]]?.era || "Unknown"}
            </p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Orbit Distance</h4>
            <p className="overview-grid__value">{planet.distanceFromStarAU} AU</p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Orbital Period</h4>
            <p className="overview-grid__value">{planet.orbitalPeriod}</p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Daytime Temp</h4>
            <p className="overview-grid__value">{planet.temperatures.daytime}°C</p>
          </li>
          <li className="overview-grid__item">
            <h4 className="overview-grid__title">Nighttime Temp</h4>
            <p className="overview-grid__value">{planet.temperatures.nighttime}°C</p>
          </li>
        </ul>
      </section>

      <section className="planet-details__tradeCodes">
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
      </section>

      <h2>Planetary & System Details</h2>
      <div className="planet-details__metrics">
        {planet.bases.length > 0 && (
          <div>
            <h3 className="no-underline">System Base{planet.bases.length > 1 ? "s" : ""}</h3>
            <ul>
              {planet.bases?.map((base) => {
                switch (base) {
                  case "Army":
                    return <li>Imperial Army garrison</li>;
                  case "Navy":
                    return <li>Imperial Navy base</li>;
                  case "Scout":
                    return <li>Scout Services outpost</li>;
                  case "Pirate":
                    return <li>Pirate stronghold</li>;
                }
              })}
            </ul>
          </div>
        )}

        {/* RINGS */}
        {planet.rings?.length > 0 && (
          <p>
            <strong>Planetary Ring{planet.rings?.length > 1 ? "s" : ""}:</strong> {planet.rings.join(", ")}
          </p>
        )}

        {/* MOONS */}
        {planet.moons?.length > 0 && (
          <div>
            <h3>Moon{planet.moons?.length > 1 ? "s" : ""}</h3>
            <ol>
              {planet.moons?.map((moon) => {
                return <li key={moon}>{moon}</li>;
              })}
            </ol>
          </div>
        )}
        {planet.moons?.length === 0 && (
          <div>
            <h3>Moons</h3>
            <ul>
              <li>No significant satellites</li>
            </ul>
          </div>
        )}

        {/* GAS GIANTS */}
        {planet.gasGiants.length > 0 && (
          <div>
            <h3 className="no-underline">
              Gas Giant{planet.gasGiants.length > 1 ? "s" : ""} ({planet.gasGiants.length})
            </h3>
            <ul>
              {planet.gasGiants?.map((planet) => {
                return <li key={planet}>{planet}</li>;
              })}
            </ul>
          </div>
        )}

        {planet.gasGiants?.length === 0 && (
          <div>
            <h3>Gas Giants</h3>
            <ul>
              <li>None in system</li>
            </ul>
          </div>
        )}
      </div>

      {mapExists && (
        <figure className="planet-details__map">
          <img src={mapSrc} alt={`${planet.name} Map`} />
          <figcaption>Surface Map of {planet.name}</figcaption>
        </figure>
      )}

      {planet.details.length > 0 && (
        <section className="planet-details__description">
          {planet.details.map((section, index) => (
            <article
              key={index}
              className="planet-details__description-section"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section) }}
            />
          ))}
        </section>
      )}
    </div>
  );
};

const getPortTypes = (planet: Planet) => {
  if (!planet) return null;
  if (planet.uwp[0] === "X") return null;
  if (planet.bases.includes("Highport")) return "Highport & Downport";
  return "Downport Only";
};

const getBerthingFees = (fee: number | undefined, uwp: string) => {
  if (fee === 0 || uwp[0] === "X" || uwp[0] === "E") return "none";
  if (fee) return `Cr${fee / 100} per ton`;

  return "unknown";
};

export default PlanetDetails;
