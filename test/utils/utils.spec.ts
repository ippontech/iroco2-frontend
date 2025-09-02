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

describe("cn", () => {
  it.each([
    {
      input: ["class1", "class2"],
      expected: "class1 class2",
    },
    {
      input: [123, 456],
      expected: "123 456",
    },
    {
      input: [{ visible: true }, { hidden: false }],
      expected: "visible",
    },
    {
      input: ["class1", 123, { visible: true }, { hidden: false }],
      expected: "class1 123 visible",
    },
  ])(
    "should return the correct class name for for $input to be $expected",
    ({ input, expected }) => {
      expect(cn(...input)).toBe(expected);
    },
  );
});

describe("convertEstimateToBestMassUnit", () => {
  it.each([
    {
      input: 0,
      expected: { noUnitValue: 0, unit: "g" },
    },
    {
      input: 1234,
      expected: { noUnitValue: 1, unit: "kg" },
    },
    {
      input: 123456,
      expected: { noUnitValue: 123, unit: "kg" },
    },
    {
      input: 1234567,
      expected: { noUnitValue: 1, unit: "tonne(s)" },
    },
    {
      input: 123456789,
      expected: { noUnitValue: 123, unit: "tonne(s)" },
    },
    {
      input: 1234567890,
      expected: { noUnitValue: 1, unit: "kt" },
    },
    {
      input: 1234567890123,
      expected: { noUnitValue: 1, unit: "Mt" },
    },
  ])(
    "should return the correct mass unit for $input to be $expected.noUnitValue $expected.unit",
    ({ input, expected }) => {
      expect(convertEstimateToBestMassUnit(input)).toEqual(expected);
    },
  );
});

describe("aggregateCarbonFootPrint", () => {
  it("should correctly aggregate carbon footprints", () => {
    // Arrange
    const components = [
      { label: "Component 1", co2Gr: 100 },
      { label: "Component 2", co2Gr: 200 },
      { label: "Component 3", co2Gr: 300 },
    ];
    const expected = {
      relativeCarbonFootprintList: [
        {
          label: "Component 3",
          co2Gr: 300,
          percentage: calculPercent(300, 600),
        },
        {
          label: "Component 2",
          co2Gr: 200,
          percentage: calculPercent(200, 600),
        },
        {
          label: "Component 1",
          co2Gr: 100,
          percentage: calculPercent(100, 600),
        },
      ],
      totalCO2Gr: 600,
    };

    // Act
    const result = aggregateCarbonFootPrint(components);

    // Assert
    expect(result).toEqual(expected);
  });

  const calculPercent = (value: number, totalValue: number) => {
    return (value / totalValue) * 100;
  };
});
