/*
 * Copyright 2025 Ippon Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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
