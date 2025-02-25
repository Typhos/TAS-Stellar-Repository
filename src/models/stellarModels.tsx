export interface Planet {
  name: string;
  col: number;
  row: number;
  uwp: string;
  gasGiants: string[];
  tradeCodes?: string[];
  berthing?: number;
  weeklyTraffic?: number;
  alert: string;
  moons: string[];
  rings: string[];
  bases: string[];
  population?: number;
  government?: string;
  diameter: number;
  gravity: number;
  temperatures: {
    daytime: number;
    nighttime: number;
  };
  orbitalPeriod: string;
  distanceFromStarAU: number;
  description: string;
  details: string[];
}

export interface SubSector {
  name: string;
  planets: [Planet];
}

export interface xBoatRoute {
  start: { col: number; row: number };
  end: { col: number; row: number };
}

export const TradeCodeDescriptions: Record<string, { name: string; description: string }> = {
  Ag: {
    name: "Agricultural",
    description: "Dedicated to farming and food production. Often divided into vast semi-feudal estates.",
  },
  As: {
    name: "Asteroids",
    description: "Usually mining colonies but can also be orbital factories or colonies.",
  },
  Ba: {
    name: "Barren",
    description: "Uncolonised and empty.",
  },
  Bo: {
    name: "Boiling",
    description: "Boiling world. No ice caps, little liquid water.",
  },
  Co: {
    name: "Cold",
    description: "Icy world. Little liquid water, extensive ice caps, few clouds.",
  },
  De: {
    name: "Desert",
    description: "Dry and barely habitable.",
  },
  Fl: {
    name: "Fluid Oceans",
    description: "Worlds where the surface liquid is something other than water, incompatible with Earth-derived life.",
  },
  Fr: {
    name: "Frozen",
    description: "Frozen world. No liquid water, very dry atmosphere.",
  },
  Ga: {
    name: "Garden",
    description: "Worlds that are Earth-like.",
  },
  Hi: {
    name: "High Population",
    description: "A population in the billions.",
  },
  Ho: {
    name: "Hot",
    description: "Hot world. Small or no ice caps, little liquid water. Most water in the form of clouds.",
  },
  Ht: {
    name: "High Tech",
    description: "Among the most technologically advanced in Charted Space.",
  },
  Ic: {
    name: "Ice-Capped",
    description: "Worlds with most of their surface liquid frozen in polar ice caps and are cold and dry.",
  },
  In: {
    name: "Industrial",
    description: "Dominated by factories and cities.",
  },
  Lo: {
    name: "Low Population",
    description: "A population of only a few thousand or less.",
  },
  Lt: {
    name: "Low Tech",
    description: "Pre-industrial and cannot produce advanced goods.",
  },
  Na: {
    name: "Non-Agricultural",
    description: "Too dry or barren to support populations using conventional food production.",
  },
  Ni: {
    name: "Non-Industrial",
    description: "Too low in population to maintain an extensive industrial base.",
  },
  Po: {
    name: "Poor",
    description:
      "Lacking resources, viable land, or sufficient population to be anything other than marginal colonies.",
  },
  Ri: {
    name: "Rich",
    description: "Blessed with a stable government and viable biosphere, making them economic powerhouses.",
  },
  Tp: {
    name: "Tropical",
    description: "Wet worlds with hot, humid climates. Small or no ice caps.",
  },
  Va: {
    name: "Vacuum",
    description: "No atmosphere.",
  },
  Wa: {
    name: "Water World",
    description: "Almost entirely water-ocean across their surface.",
  },
};
