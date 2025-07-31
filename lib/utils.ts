import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { UnitValue } from "~/type/UnitValue";

import {
  MassUnit,
  massUnitDetailsMap,
  type MassUnitDetails,
} from "~/type/MassUnit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertEstimateToBestMassUnit(totalCO2Gr: number): UnitValue {
  const massUnitDetailsList: Array<MassUnitDetails> = [
    massUnitDetailsMap[MassUnit.MEGATONNE],
    massUnitDetailsMap[MassUnit.KILOTONNE],
    massUnitDetailsMap[MassUnit.TONNE],
    massUnitDetailsMap[MassUnit.KILOGRAM],
    massUnitDetailsMap[MassUnit.GRAM],
  ];

  for (const massUnitDetails of massUnitDetailsList) {
    if (totalCO2Gr >= massUnitDetails.value) {
      return {
        noUnitValue: Math.round(totalCO2Gr / massUnitDetails.value),
        unit: massUnitDetails.symbol,
      };
    }
  }

  return {
    noUnitValue: Math.round(totalCO2Gr),
    unit: "g",
  };
}

type CarbonFootPrint = {
  label: string;
  co2Gr: number;
};

export type RelativeCarbonFootprint = CarbonFootPrint & {
  percentage: number;
};
export function aggregateCarbonFootPrint(components: CarbonFootPrint[]) {
  const totalCO2Gr = components.reduce(
    (acc, carbonFootPrint) => acc + carbonFootPrint.co2Gr,
    0,
  );

  const addPercent = components.map((carbonFootPrint) => ({
    ...carbonFootPrint,
    percentage: (carbonFootPrint.co2Gr / totalCO2Gr) * 100,
  }));

  const relativeCarbonFootprintList: RelativeCarbonFootprint[] =
    addPercent.sort((a, b) => b.percentage - a.percentage);

  return { relativeCarbonFootprintList, totalCO2Gr };
}
