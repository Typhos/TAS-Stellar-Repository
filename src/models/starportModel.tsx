export interface StarportInfo {
  class: string;
  quality: string;
  shipyard: string;
  repair: string;
  refinedFuel: boolean;
  unrefinedFuel: boolean;
  maxRefinedFuelPerDay: string;
  dockingSpace: string;
}

export const StarportData: Record<string, StarportInfo> = {
  A: {
    class: "A",
    quality: "Excellent",
    shipyard: "Starship",
    repair: "Overhaul",
    refinedFuel: true,
    unrefinedFuel: false,
    maxRefinedFuelPerDay: "2,500 tons",
    dockingSpace: "100,000 tons",
  },
  B: {
    class: "B",
    quality: "Good",
    shipyard: "Spacecraft",
    repair: "Overhaul",
    refinedFuel: true,
    unrefinedFuel: false,
    maxRefinedFuelPerDay: "1,000 tons",
    dockingSpace: "50,000 tons",
  },
  C: {
    class: "C",
    quality: "Routine",
    shipyard: "Small Craft",
    repair: "Major",
    refinedFuel: false,
    unrefinedFuel: true,
    maxRefinedFuelPerDay: "-",
    dockingSpace: "20,000 tons",
  },
  D: {
    class: "D",
    quality: "Poor",
    shipyard: "-",
    repair: "Minor",
    refinedFuel: false,
    unrefinedFuel: true,
    maxRefinedFuelPerDay: "-",
    dockingSpace: "400 tons",
  },
  E: {
    class: "E",
    quality: "Frontier",
    shipyard: "-",
    repair: "-",
    refinedFuel: false,
    unrefinedFuel: false,
    maxRefinedFuelPerDay: "-",
    dockingSpace: "-",
  },
  X: {
    class: "X",
    quality: "No Starport",
    shipyard: "-",
    repair: "-",
    refinedFuel: false,
    unrefinedFuel: false,
    maxRefinedFuelPerDay: "-",
    dockingSpace: "-",
  },
};

/**
 * Utility function to retrieve starport information from a UWP.
 * @param uwp The Universal World Profile string.
 * @returns StarportInfo object for the given UWP.
 */
export const getStarportInfo = (uwp: string | undefined | null): StarportInfo | null => {
  if (!uwp || uwp.length === 0) return null;
  const starportClass = uwp.charAt(0).toUpperCase(); // First letter of UWP is the Starport class
  return StarportData[starportClass] || null;
};
