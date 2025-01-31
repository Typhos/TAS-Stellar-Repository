import "./PlanetList.scss";

import React, { useState } from "react";

import { Link } from "react-router-dom"; // Assuming you're using React Router
import { compileSectorData } from "../../data/dataLoader"; // Assuming this is how sector data is retrieved

const PlanetList: React.FC = () => {
  const planets = compileSectorData(); // Fetch sector data

  const [sortField, setSortField] = useState<"name" | "uwp" | "alert" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sorting logic
  const sortedPlanets = [...planets].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField] || "";
    const valB = b[sortField] || "";
    return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  // Handle sorting
  const handleSort = (field: "name" | "uwp" | "alert") => {
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  return (
    <div className="planet-list">
      <h2 className="planet-list__title">Systems of the Malcari Drift</h2>
      <table className="planet-list__table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Systems Name</th>
            <th onClick={() => handleSort("uwp")}>UWP</th>
            <th className="noClick">Trade Codes</th>
            <th onClick={() => handleSort("alert")}>Alert</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlanets.map((planet) => (
            <tr key={planet.name}>
              <td>
                <Link to={`/planet/${planet.name.toLowerCase()}`} className="planet-list__link">
                  {planet.name}
                </Link>
              </td>
              <td>{planet.uwp}</td>
              <td>{planet.tradeCodes ? planet.tradeCodes.join(", ") : "-"}</td>
              <td className={planet.alert ? `alert-${planet.alert.toLowerCase()}` : ""}>{planet.alert || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanetList;
