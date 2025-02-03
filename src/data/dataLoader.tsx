import { Planet, SubSector } from "../models/stellarModels";

import hegir from "./sub-sectors/hegirSubsector.json";
import karvess from "./sub-sectors/karvessSubsector.json";
import ulara from "./sub-sectors/ularaSubsector.json";

const subsectors: SubSector[] = [ulara, karvess, hegir]; // List all subsectors here

/**
 * Merge all subsector data into a single JSON object.
 * Planets from all subsectors are combined into one array.
 */
export const compileSectorData = () => {
  return subsectors.flatMap((subsector: SubSector) => subsector.planets);
};

/**
 * Get a specific planet's profile by name.
 * Returns the first match found or null if not found.
 */
export const getPlanetByName = (planetName: string) => {
  const sectorData = compileSectorData();
  return sectorData.find((planet: Planet) => planet.name.toLowerCase() === planetName.toLowerCase()) || null;
};
