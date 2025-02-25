export interface UWPStarport {
  class: string;
  quality: string;
  shipyard: string;
  repair: string;
  refinedFuel: boolean;
  unrefinedFuel: boolean;
  maxRefinedFuelPerDay: string;
  dockingSpace: string;
}

export interface UWPSize {
  code: string;
  diameter: string;
  gravity: string;
  atmosphereRetention: boolean;
}

export interface UWPAtmosphere {
  code: string;
  description: string;
  pressure: string;
  composition: string;
  breathable: boolean;
}

export interface UWPHydrographics {
  code: string;
  percentage: string;
  type: string; // e.g., Water, Methane, Ammonia
  description: string;
}

export interface UWPPopulation {
  code: string;
  populationRange: string;
  description: string;
}

export interface UWPGovernment {
  code: string;
  description: string;
  structure: string;
  controlLevel: string;
}

export interface UWPLawLevel {
  code: string;
  restrictions: string;
  enforcementLevel: string;
}

export interface UWPTechLevel {
  code: string;
  description: string;
  type: string;
  era: string;
}

export const SizeData: Record<string, UWPSize> = {
  "0": { code: "0", diameter: "< 1,000 km", gravity: "0.00 G", atmosphereRetention: false },
  "1": { code: "1", diameter: "1,600 km", gravity: "0.05 G", atmosphereRetention: false },
  "2": { code: "2", diameter: "3,200 km", gravity: "0.15 G", atmosphereRetention: false },
  "3": { code: "3", diameter: "4,800 km", gravity: "0.25 G", atmosphereRetention: true },
  "4": { code: "4", diameter: "6,400 km", gravity: "0.35 G", atmosphereRetention: true },
  "5": { code: "5", diameter: "8,000 km", gravity: "0.45 G", atmosphereRetention: true },
  "6": { code: "6", diameter: "9,600 km", gravity: "0.70 G", atmosphereRetention: true },
  "7": { code: "7", diameter: "11,200 km", gravity: "0.90 G", atmosphereRetention: true },
  "8": { code: "8", diameter: "12,800 km", gravity: "1.00 G", atmosphereRetention: true },
  "9": { code: "9", diameter: "14,400 km", gravity: "1.25 G", atmosphereRetention: true },
  A: { code: "A", diameter: "> 16,000 km", gravity: "1.40 G", atmosphereRetention: true },
};

export const AtmosphereData: Record<string, UWPAtmosphere> = {
  "0": { code: "0", description: "None", pressure: "0", composition: "-", breathable: false },
  "1": { code: "1", description: "Trace", pressure: "<0.1 atm", composition: "Trace gases", breathable: false },
  "2": {
    code: "2",
    description: "Very Thin, Tainted",
    pressure: "0.1-0.42 atm",
    composition: "Tainted",
    breathable: false,
  },
  "3": { code: "3", description: "Very Thin", pressure: "0.1-0.42 atm", composition: "Clean", breathable: false },
  "4": { code: "4", description: "Thin, Tainted", pressure: "0.43-0.7 atm", composition: "Tainted", breathable: false },
  "5": { code: "5", description: "Thin", pressure: "0.43-0.7 atm", composition: "Clean", breathable: true },
  "6": { code: "6", description: "Standard", pressure: "0.71-1.49 atm", composition: "Clean", breathable: true },
  "7": {
    code: "7",
    description: "Standard, Tainted",
    pressure: "0.71-1.49 atm",
    composition: "Tainted",
    breathable: false,
  },
  "8": { code: "8", description: "Dense", pressure: "1.5-2.49 atm", composition: "Clean", breathable: true },
  "9": {
    code: "9",
    description: "Dense, Tainted",
    pressure: "1.5-2.49 atm",
    composition: "Tainted",
    breathable: false,
  },
  A: { code: "A", description: "Exotic", pressure: "Varies", composition: "Exotic gases", breathable: false },
  B: { code: "B", description: "Corrosive", pressure: "Varies", composition: "Corrosive gases", breathable: false },
  C: { code: "C", description: "Insidious", pressure: "Varies", composition: "Lethal gases", breathable: false },
  D: { code: "D", description: "Dense, High", pressure: ">2.5 atm", composition: "Varies", breathable: false },
  E: { code: "E", description: "Ellipsoid", pressure: "Varies", composition: "Varies", breathable: false },
  F: { code: "F", description: "Thin, Low", pressure: "Varies", composition: "Varies", breathable: false },
};

export const HydrographicsData: Record<string, UWPHydrographics> = {
  "0": { code: "0", percentage: "0%", type: "None", description: "Desert world" },
  "1": { code: "1", percentage: "10%", type: "Liquid", description: "Sparse water bodies" },
  "2": { code: "2", percentage: "20%", type: "Liquid", description: "Small seas and lakes" },
  "3": { code: "3", percentage: "30%", type: "Liquid", description: "Significant seas" },
  "4": { code: "4", percentage: "40%", type: "Liquid", description: "Large seas and lakes" },
  "5": { code: "5", percentage: "50%", type: "Liquid", description: "Moderate ocean coverage" },
  "6": { code: "6", percentage: "60%", type: "Liquid", description: "Considerable oceans" },
  "7": { code: "7", percentage: "70%", type: "Liquid", description: "Extensive ocean coverage" },
  "8": { code: "8", percentage: "80%", type: "Liquid", description: "Vast oceans" },
  "9": { code: "9", percentage: "90%", type: "Liquid", description: "Nearly complete ocean world" },
  A: { code: "A", percentage: "100%", type: "Liquid", description: "Water world or equivalent" },
};

export const PopulationData: Record<string, UWPPopulation> = {
  "0": { code: "0", populationRange: "None", description: "Uninhabited" },
  "1": { code: "1", populationRange: "1-10", description: "Few inhabitants" },
  "2": { code: "2", populationRange: "Dozens", description: "Small outpost or village" },
  "3": { code: "3", populationRange: "Hundreds", description: "Small community" },
  "4": { code: "4", populationRange: "Thousands", description: "Small town" },
  "5": { code: "5", populationRange: "Tens of thousands", description: "Town or small city" },
  "6": { code: "6", populationRange: "Hundreds of thousands", description: "City" },
  "7": { code: "7", populationRange: "Millions", description: "Large city" },
  "8": { code: "8", populationRange: "Tens of millions", description: "Metropolis" },
  "9": { code: "9", populationRange: "Hundreds of millions", description: "Megalopolis" },
  A: { code: "A", populationRange: "Billions", description: "Planet-wide population" },
};

export const GovernmentData: Record<string, UWPGovernment> = {
  "0": { code: "0", description: "None", structure: "Anarchy", controlLevel: "None" },
  "1": {
    code: "1",
    description: "Corporation",
    structure: "Corporate rule",
    controlLevel: "Moderate",
  },
  "2": { code: "2", description: "Participating Democracy", structure: "Democratic", controlLevel: "Variable" },
  "3": { code: "3", description: "Self-Perpetuating Oligarchy", structure: "Oligarchic", controlLevel: "High" },
  "4": { code: "4", description: "Representative Democracy", structure: "Republic", controlLevel: "Moderate" },
  "5": { code: "5", description: "Feudal Technocracy", structure: "Feudal", controlLevel: "Variable" },
  "6": { code: "6", description: "Captive Government", structure: "Puppet state", controlLevel: "High" },
  "7": { code: "7", description: "Balkanization", structure: "Fragmented", controlLevel: "Varied" },
  "8": { code: "8", description: "Civil Service Bureaucracy", structure: "Bureaucratic", controlLevel: "Moderate" },
  "9": { code: "9", description: "Impersonal Bureaucracy", structure: "Bureaucratic", controlLevel: "High" },
  A: { code: "A", description: "Charismatic Dictator", structure: "Dictatorship", controlLevel: "High" },
};

export const LawLevelData: Record<string, UWPLawLevel> = {
  "0": { code: "0", restrictions: "No restrictions", enforcementLevel: "None" },
  "1": { code: "1", restrictions: "Personal concealable weapons banned", enforcementLevel: "Low" },
  "2": { code: "2", restrictions: "Portable energy weapons banned", enforcementLevel: "Moderate" },
  "3": { code: "3", restrictions: "Military weapons banned", enforcementLevel: "Moderate" },
  "4": { code: "4", restrictions: "Light assault weapons banned", enforcementLevel: "High" },
  "5": { code: "5", restrictions: "Personal armor restricted", enforcementLevel: "High" },
  "6": { code: "6", restrictions: "All weapons banned", enforcementLevel: "Very High" },
  "7": { code: "7", restrictions: "All technology strictly controlled", enforcementLevel: "Extremely High" },
  "8": { code: "8", restrictions: "Full surveillance and monitoring", enforcementLevel: "Totalitarian" },
  "9": { code: "9", restrictions: "Complete prohibition of all private property", enforcementLevel: "Absolute" },
  A: { code: "A", restrictions: "Severe personal restrictions", enforcementLevel: "Absolute Totalitarian" },
  B: { code: "B", restrictions: "Extreme surveillance with genetic tracking", enforcementLevel: "Omnipresent" },
  C: { code: "C", restrictions: "Mind control enforcement", enforcementLevel: "Psychologically Absolute" },
  D: { code: "D", restrictions: "Implanted behavioral controls", enforcementLevel: "Technologically Enforced" },
  E: { code: "E", restrictions: "Total bio-digital monitoring", enforcementLevel: "Digital Panopticon" },
  F: { code: "F", restrictions: "Complete societal automation of laws", enforcementLevel: "Automated Absolute" },
};

export const TechLevelData: Record<string, UWPTechLevel> = {
  "0": {
    code: "0",
    type: "Primitive",
    era: "Stone Age",
    description:
      "No technology. TL0 worlds have only discovered the simplest tools and principles and are on par with Earth’s Stone Age.",
  },
  "1": {
    code: "1",
    type: "Primitive",
    era: "Bronze or Iron Age",
    description: "Science is mostly superstition but manufacture weapons and work metals.",
  },
  "2": {
    code: "2",
    type: "Primitive",
    era: "Renaissance",
    description:
      "A greater understanding of chemistry, physics, biology and astronomy as well as the scientific method.",
  },
  "3": {
    code: "3",
    type: "Primitive",
    era: "Industrial revolution",
    description:
      "Steam power, primitive firearms now dominate the battlefield. This is roughly comparable to the early 19th Century.",
  },
  "4": {
    code: "4",
    type: "Industrial",
    era: "Mechanized Age",
    description:
      "The transition to industrial revolution is complete, bringing plastics, radio and other such inventions. Roughly comparable to the late 19th/early 20th Century.",
  },
  "5": {
    code: "5",
    type: "Industrial",
    era: "Broadcast Age",
    description:
      "Widespread electrification, telecommunications and internal combustion. At the high end of the TL, atomics and primitive computing appear. Roughly on a par with the mid-20th Century.",
  },
  "6": {
    code: "6",
    type: "Industrial",
    era: "Atomic Age",
    description:
      "Brings the development of fission power and more advanced computing. Advances in materials technology and rocketry bring about the dawn of the space age.",
  },
  "7": {
    code: "7",
    type: "Pre-Stellar",
    era: "Space Age",
    description:
      "A pre-stellar society can reach orbit reliably and has telecommunications satellites. Computers and integrated circuits become ubiquitous.",
  },
  "8": {
    code: "8",
    type: "Pre-Stellar",
    era: "Information Age",
    description:
      "Possible to reach other worlds in the same star system, although terraforming or full colonization are not within the culture's capacity. Permanent space habitats become possible. Fusion power becomes commercially viable.",
  },
  "9": {
    code: "9",
    type: "Pre-Stellar",
    era: "Gravitics Age",
    description:
      "Development of gravity manipulation, which makes space travel vastly safer and faster. This research leads to development of the jump drive, which occurs near the end of this Tech Level. TL9 cultures can colonise other worlds, although travelling to a colony is often a one-way trip.",
  },
  A: {
    code: "A",
    type: "Early Stellar",
    era: "Basic Fusion Age",
    description:
      "With the advent of commonly available jump drives, nearby systems are opened up. Orbital habitats and factories become common. Interstellar travel and trade lead to an economic boom. Colonies become much more viable.",
  },
  B: {
    code: "A",
    type: "Early Stellar",
    era: "Fusion Plus Age",
    description:
      "The first true artificial intelligences become possible, as computers are able to model synaptic networks. Gravsupported structures reach to the heavens. Jump-2 travel becomes possible, allowing easier travel beyond the one jump stellar mains.",
  },
  C: {
    code: "A",
    type: "Early Stellar",
    era: "Positronics Age",
    description:
      "Planetwide weather control revolutionises terraforming and agriculture. Portable plasma weapons and carriermounted fusion guns make the battlefield untenable for unarmoured combatants. Jump-3 travel is developed.",
  },
  D: {
    code: "A",
    type: "Early Stellar",
    era: "Cloning Age",
    description:
      "Battle dress appears on the battlefield in response to new weapons, heralding the pinnacle of personal armour and making infantry the equivalent of less advanced armoured vehicles. Cloning of body parts becomes easy. Jump-4 travel appears.",
  },
  E: {
    code: "A",
    type: "Early Stellar",
    era: "Geneering Age",
    description: "Fusion weapons become portable. Flying cities appear. Jump-5 drives are built.",
  },
  F: {
    code: "A",
    type: "Early Stellar",
    era: "Anagathics Age",
    description:
      "Black globe generators suggest a new direction for defensive technologies, while the development of synthetic anagathics means that human lifespan is now vastly increased.",
  },
};
