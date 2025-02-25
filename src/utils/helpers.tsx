// Formats large population numbers into "sane" notation
export const formatPopulation = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`; // 1 decimal, removes .0 if whole number
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`; // 1 decimal, removes .0 if whole number
  } else {
    return num.toLocaleString(); // Normal formatting for smaller numbers
  }
};

// Converts a string into a URL-safe format
export const normalizeStringForURL = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

// Capitalizes the first letter of a string
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Converts degrees to radians (useful for SVG calculations)
export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};
