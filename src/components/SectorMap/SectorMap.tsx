import "./SectorMap.scss";

import { Planet, xBoatRoute } from "../models/stellarModels";
import React, { useEffect, useState } from "react";

import asteroidFieldIcon from "/images/asteroidField.png";
import { compileSectorData } from "../../data/dataLoader";
import gasGiantIcon from "/images/gasGiant.png";
import { useNavigate } from "react-router-dom";
import xBoatRoutes from "../../data/xBoatRoutes.json";

const HEX_SIZE = 60; // Radius of the hex
const ROWS = 10; // Number of rows
const COLUMNS = 16; // Number of columns

const getHexCoords = (col: number, row: number) => {
  // Calculate x and y for flat-top hexes
  const x = col * (HEX_SIZE * 1.5);
  const y = row * (Math.sqrt(3) * HEX_SIZE) + (col % 2 ? (Math.sqrt(3) * HEX_SIZE) / 2 : 0);
  return { x, y };
};

const SectorMap: React.FC = () => {
  const navigate = useNavigate();
  const planets = compileSectorData();

  // Convert planet data into a lookup table for fast access
  const planetLookup = new Map<string, Planet>();
  planets.forEach((planet) => {
    planetLookup.set(`${planet.col},${planet.row}`, planet);
  });

  return (
    <div className="sector-map-container">
      <svg className="sector-map" viewBox="-60 -80 1500 1150" preserveAspectRatio="xMidYMid meet">
        {/* <svg className="sector-map" viewBox="-60 -80 1500 2200" preserveAspectRatio="xMidYMid meet"> */}
        {/* Render the xBoat routes as lines */}
        {xBoatRoutes.map((route: xBoatRoute, index: number) => {
          const startCoords = getHexCoords(route.start.col, route.start.row);
          const endCoords = getHexCoords(route.end.col, route.end.row);

          // Calculate the adjusted start and end points
          const { startX, startY, endX, endY } = getOffsetCoords(startCoords, endCoords);

          return (
            <line key={`route-${index}`} x1={startX} y1={startY} x2={endX} y2={endY} stroke="green" strokeWidth={3} />
          );
        })}

        {Array.from({ length: ROWS }).map((_, row) =>
          Array.from({ length: COLUMNS }).map((_, col) => {
            const { x, y } = getHexCoords(col, row);
            const points = createHexPoints(x, y, HEX_SIZE);
            const planet = planetLookup.get(`${col},${row}`);

            return (
              <g key={`${col}-${row}`}>
                {/* Hex outline (always rendered) */}
                <polygon points={points} fill="none" stroke="gray" />

                {/* If a planet exists, render it */}
                {planet && (
                  <>
                    {/* Planet Circle */}
                    {planet.uwp[1] !== "0" && (
                      <circle
                        cx={x}
                        cy={y}
                        r={10}
                        fill={getPlanetColor(planet.uwp, planet.tradeCodes)}
                        stroke={getStrokeColor(planet.uwp)}
                        onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                      />
                    )}

                    {/* Asteroid Field */}
                    {planet.uwp[1] === "0" && (
                      <image
                        href={asteroidFieldIcon}
                        x={x - 25}
                        y={y - 25}
                        width="50"
                        height="50"
                        onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                      />
                    )}

                    {/*Alert Ring */}
                    {planet.alert && (
                      <path
                        d={createArcPath(x, y, 46)} // ✅ Uses the updated arc function
                        stroke={planet.alert === "Amber" ? "#ffbf00" : "#ff0000"}
                        strokeWidth={2}
                        fill="none"
                        onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                      />
                    )}

                    {/* Starport Class */}
                    <text
                      x={x}
                      y={y - 20}
                      textAnchor="middle"
                      fontSize="20"
                      fontWeight="bold"
                      fill="white"
                      onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                    >
                      {planet.uwp ? planet.uwp[0] : "?"}
                    </text>

                    {/* UWP Code */}
                    <text
                      x={x}
                      y={y + 30}
                      textAnchor="middle"
                      fontSize="12"
                      fill="white"
                      onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                    >
                      {planet.uwp}
                    </text>

                    {/* Planet Name */}
                    <text
                      x={x}
                      y={y + 45}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill="white"
                      onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                    >
                      {planet.name}
                    </text>

                    {/* Gas Giant Icon */}
                    {planet.gasGiants.length > 0 && (
                      <image
                        href={gasGiantIcon}
                        x={x + HEX_SIZE / 3}
                        y={y - HEX_SIZE / 3}
                        width="15"
                        height="15"
                        onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                      />
                    )}

                    {/* Base Icons */}
                    {planet.bases && (
                      <g>
                        {/* {planet.bases.includes("Highport") && (
                          <image
                            href={highportIcon}
                            x={x - HEX_SIZE / 2.3}
                            y={y - 35}
                            width="12"
                            height="12"
                            onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                          />
                        )} */}

                        {planet.bases.includes("Navy") && (
                          <text
                            x={x - HEX_SIZE / 2.2}
                            y={y - 24}
                            fontSize="14"
                            fill="white"
                            onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                          >
                            ★
                          </text>
                        )}

                        {planet.bases.includes("Army") && (
                          <rect
                            x={x - HEX_SIZE / 1.8}
                            y={y - 18}
                            width="8"
                            height="8"
                            fill="white"
                            onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                          />
                        )}

                        {planet.bases.includes("Scout") && (
                          <text
                            x={x - HEX_SIZE / 1.65}
                            y={y + 7}
                            fontSize="11"
                            fill="white"
                            onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                          >
                            ▲
                          </text>
                        )}
                      </g>
                    )}

                    {/* Clickable Hex Interaction */}
                    <polygon
                      points={points}
                      stroke="gray"
                      fill="transparent"
                      onClick={() => navigate(`/planet/${encodeURIComponent(planet.name.toLowerCase())}`)}
                      onMouseEnter={(e) => {
                        e.target.style.stroke = "orange";
                        e.target.style.cursor = "pointer";
                        e.target.style.fill = "#transparent";
                        e.target.style.strokeWidth = 4;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.stroke = "gray";
                        e.target.style.fill = "transparent";
                        e.target.style.strokeWidth = 1;
                      }}
                    />
                  </>
                )}
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
};

const createHexPoints = (x: number, y: number, size: number) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    points.push(`${x + size * Math.cos(angle)},${y + size * Math.sin(angle)}`);
  }
  return points.join(" ");
};

const getPlanetColor = (uwp: string, tradeCodes: string[] = []): string => {
  if (!uwp || uwp.length < 4) return "#FFFFFF"; // Default to white if UWP is invalid
  const atmosphere = uwp[2]; // 3th character of UWP (Atmosphere rating)
  const hydrographics = uwp[3]; // 4th character of UWP (Hydrographics rating)

  if (atmosphere === "0") {
    return "#000000";
  } else if (atmosphere === "B" || atmosphere === "C") {
    return "#B45F06";
  } else if (hydrographics === "0" || tradeCodes.includes("Fl")) {
    return "#FFFFFF";
  } else if (tradeCodes.includes("Ri") && tradeCodes.includes("Ag")) {
    return "#F1C232";
  } else if (tradeCodes.includes("Ag")) {
    return "#6AA84F";
  } else if (tradeCodes.includes("In")) {
    return "#808080";
  } else if (tradeCodes.includes("Ri")) {
    return "#800080";
  }

  return "#00BFFF";
};

const getStrokeColor = (uwp: string): string => {
  const atmosphere = uwp[2]; // 3th character of UWP (Atmosphere rating)
  if (atmosphere === "0") return "#ffffff";
  return "#000000";
};

// Function to compute the offset points
const getOffsetCoords = (start: { x: number; y: number }, end: { x: number; y: number }) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Calculate the total length of the line
  const length = Math.sqrt(dx * dx + dy * dy);

  // Normalize the direction vector
  const unitX = dx / length;
  const unitY = dy / length;

  // Calculate the offset distance (50% of distance from center to edge)
  const offset = HEX_SIZE / 3;

  // Adjust the start and end points by the offset
  return {
    startX: start.x + unitX * offset,
    startY: start.y + unitY * offset,
    endX: end.x - unitX * offset,
    endY: end.y - unitY * offset,
  };
};

const createArcPath = (cx: number, cy: number, r: number) => {
  const startAngle = 110; // ✅ Adjusted to start lower
  const endAngle = -110; // ✅ Ends lower on the opposite side

  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = 1; // ✅ Forces a large arc (270° coverage)

  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
};

const polarToCartesian = (cx: number, cy: number, r: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
};

export default SectorMap;
