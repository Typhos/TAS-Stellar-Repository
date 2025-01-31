import "./JumpTimeTable.scss";

import React from "react";

interface JumpTimeTableProps {
  diameterKm: number; // Planet diameter in km
}

const JumpTimeTable: React.FC<JumpTimeTableProps> = ({ diameterKm }) => {
  // Jump point is 100 diameters away
  const jumpDistanceKm = 50 * diameterKm; // 50 diameters in km (since it's radius)
  const jumpDistanceMeters = jumpDistanceKm * 1000; // Convert km to meters

  // Standard gravity values
  const accelerations = [1, 2, 3, 4, 5, 6]; // G-Forces
  const G = 9.81; // Earth's gravity in m/s²

  // Function to calculate time to jump point
  const calculateTime = (accelerationG: number) => {
    const acceleration = accelerationG * G; // Convert G to m/s²
    const timeSeconds = 2 * Math.sqrt(jumpDistanceMeters / acceleration); // Formula
    return convertSecondsToTime(timeSeconds);
  };

  // Convert seconds to days, hours, and minutes (rounding seconds up)
  const convertSecondsToTime = (totalSeconds: number) => {
    let remainingSeconds = Math.ceil(totalSeconds); // Round up
    const days = Math.floor(remainingSeconds / 86400);
    remainingSeconds %= 86400;
    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds %= 3600;
    const minutes = Math.floor(remainingSeconds / 60);

    return { days, hours, minutes };
  };

  return (
    <table border={1} cellPadding={8} className="jumpTimeTable">
      <thead>
        <tr>
          <th className="tableTitle" colSpan={2}>
            Time to Jump Point
          </th>
        </tr>
        <tr>
          <th className="acceleration">Acceleration (G)</th>
          <th className="time">Time</th>
        </tr>
      </thead>
      <tbody>
        {accelerations.map((accG) => {
          const { days, hours, minutes } = calculateTime(accG);
          return (
            <tr key={accG}>
              <td className="acceleration">{accG}G</td>
              <td className="time">
                {days > 0 && `${days}d `}
                {hours > 0 && `${hours}h `}
                {minutes > 0 || (days === 0 && hours === 0) ? `${minutes}m` : "0m"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default JumpTimeTable;
