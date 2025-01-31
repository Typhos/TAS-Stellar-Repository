import "./StellarTravelTime.scss";

import React, { useState } from "react";

const orbitTable = {
  1: 0.39,
  2: 0.72,
  3: 1.0,
  4: 1.52,
  5: 5.2,
  6: 9.58,
  7: 19.22,
  8: 30.05,
};

const accelerations = [1, 2, 3, 4, 5, 6];
const G = 9.81;
const AU_TO_KM = 150_000_000;

const standardDistances = [
  { label: "Surface to Orbit", value: 10000 },
  { label: "Surface to Moon", value: 400000 },
  { label: "Close Neighbor World", value: 45000000 },
  { label: "Far Neighbor World", value: 255000000 },
  { label: "Close Gas Giant", value: 600000000 },
  { label: "Far Gas Giant", value: 900000000 },
];

const convertSecondsToTime = (totalSeconds) => {
  let remainingSeconds = Math.ceil(totalSeconds);
  const days = Math.floor(remainingSeconds / 86400);
  remainingSeconds %= 86400;
  const hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  return { days, hours, minutes };
};

const calculateTravelTime = (distanceKm, accelerationG) => {
  const acceleration = accelerationG * G;
  const timeSeconds = 2 * Math.sqrt((distanceKm * 1000) / acceleration);
  return convertSecondsToTime(timeSeconds);
};

const StellarTravelTime = () => {
  const [activeTab, setActiveTab] = useState("distance");

  // Separate State for Each Tab
  const [distanceKm, setDistanceKm] = useState(standardDistances[0].value);
  const [startOrbit, setStartOrbit] = useState(3);
  const [endOrbit, setEndOrbit] = useState(5.2);
  const [orbitDistance, setOrbitDistance] = useState(Math.abs((orbitTable[3] - orbitTable[5]) * AU_TO_KM));

  const getInterpolatedAU = (orbit) => {
    const baseAU = orbitTable[Math.floor(orbit)] ?? 0;
    const nextAU = orbitTable[Math.ceil(orbit)] ?? baseAU;
    return baseAU + (orbit % 1) * (nextAU - baseAU);
  };

  const updateAU = (start, end) => {
    setStartOrbit(start);
    setEndOrbit(end);
    const startAUInterp = getInterpolatedAU(start);
    const endAUInterp = getInterpolatedAU(end);
    setOrbitDistance(Math.abs(startAUInterp - endAUInterp) * AU_TO_KM);
  };

  return (
    <div className="stellar-calculator">
      <h2>Travel Time Calculator</h2>

      {/* Tabs */}
      <div className="tabs">
        <button className={activeTab === "distance" ? "active" : ""} onClick={() => setActiveTab("distance")}>
          Use Distance (KM)
        </button>
        <button className={activeTab === "orbit" ? "active" : ""} onClick={() => setActiveTab("orbit")}>
          Use Orbital Positions
        </button>
      </div>

      {/* Distance Mode */}
      {activeTab === "distance" ? (
        <>
          <h3>Travel Distance</h3>
          <div className="input-group">
            <label className="kmLabel">
              <input
                className="kmInput"
                type="number"
                step="10000"
                value={distanceKm}
                onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
              />
              km
            </label>
          </div>

          <div className="preset-buttons">
            {standardDistances.map(({ label, value }) => (
              <button key={label} onClick={() => setDistanceKm(value)}>
                {label}
              </button>
            ))}
          </div>
        </>
      ) : (
        /* Orbital Mode */
        <>
          <h3>Move Between Orbits</h3>
          <div className="input-group">
            <label>
              Starting Position
              <input
                type="number"
                step="0.1"
                value={startOrbit}
                onChange={(e) => updateAU(parseFloat(e.target.value), endOrbit)}
              />
            </label>

            <label>
              Destination Position
              <input
                type="number"
                step="0.1"
                value={endOrbit}
                onChange={(e) => updateAU(startOrbit, parseFloat(e.target.value))}
              />
            </label>
          </div>
        </>
      )}

      {/* Travel Times Table */}
      <table>
        <thead>
          <tr>
            <th className="tableTitle" colSpan={2}>
              Travel Times
            </th>
          </tr>
          <tr>
            <th className="acceleration">Acceleration (G)</th>
            <th className="time">Time to Destination</th>
          </tr>
        </thead>
        <tbody>
          {accelerations.map((accG) => {
            const { days, hours, minutes } = calculateTravelTime(
              activeTab === "distance" ? distanceKm : orbitDistance,
              accG
            );
            return (
              <tr key={accG}>
                <td className="acceleration">{accG}G</td>
                <td className="time">
                  {days > 0 && `${days}d `}
                  {hours > 0 && `${hours}h `}
                  {minutes > 0 || (days === 0 && hours === 0) ? `${minutes}m` : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StellarTravelTime;
