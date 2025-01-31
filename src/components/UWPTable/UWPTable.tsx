import "./UWPTable.scss"; // Import SASS styles

import React from "react";

const UWPTable: React.FC<{ uwp: string; tradeCodes: string[] | undefined }> = ({ uwp, tradeCodes }) => {
  if (!uwp || uwp.length < 9) return <div>Invalid UWP Code</div>;

  // Split UWP while keeping the "-" separator
  const uwpParts = uwp.split(""); // ["C", "3", "5", "2", "6", "3", "3", "-", "8"]

  return (
    <table className="uwp-table">
      <tbody>
        <tr>
          {uwpParts.map((char, index) => (
            <td key={index} className={char === "-" ? "uwp-dash" : "uwp-cell"}>
              {char}
            </td>
          ))}
          <td className="uwp-dash"></td>
          <td key="tradeCodes" className="uwp-cell trade-codes">
            {tradeCodes?.join(" ")}
          </td>
        </tr>
        <tr className="uwp-table__explanations">
          <td>Starport</td>
          <td>Size</td>
          <td>Atmo</td>
          <td>Hydro</td>
          <td>Pop</td>
          <td>Gov</td>
          <td>Law</td>
          <td></td>
          <td>Tech</td>
          <td></td>
          <td className="uwp-table__tradeCodes" colSpan={tradeCodes?.length}>
            Trade Codes
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UWPTable;
