export enum MassUnit {
  GRAM = "GRAM",
  KILOGRAM = "KILOGRAM",
  TONNE = "TONNE",
  KILOTONNE = "KILOTONNE",
  MEGATONNE = "MEGATONNE",
}

export interface MassUnitDetails {
  symbol: string;
  value: number;
}

export const massUnitDetailsMap: { [key in MassUnit]: MassUnitDetails } = {
  [MassUnit.GRAM]: { symbol: "g", value: 1 },
  [MassUnit.KILOGRAM]: { symbol: "kg", value: 1000 },
  [MassUnit.TONNE]: { symbol: "tonne(s)", value: 1000000 },
  [MassUnit.KILOTONNE]: { symbol: "kt", value: 1000000000 },
  [MassUnit.MEGATONNE]: { symbol: "Mt", value: 1000000000000 },
};

export const symbolToValueMap: { [symbol: string]: number } = {};
for (const key in massUnitDetailsMap) {
  const details = massUnitDetailsMap[key as MassUnit];
  symbolToValueMap[details.symbol] = details.value;
}
