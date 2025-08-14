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
import type { $Fetch } from "ofetch";
import type { Mock } from "vitest";
import IrocalcCarbonService from "~/service/carbonService";

describe("CarbonService", () => {
  let carbonService: IrocalcCarbonService;
  let mockFetch: Mock;
  const infraId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

  beforeEach(() => {
    mockFetch = vi.fn();
    carbonService = new IrocalcCarbonService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("estimates carbon footprint", async () => {
    // Arrange
    mockFetch.mockResolvedValue([
      {
        componentName: "My EC2",
        serviceName: "EC2",
        co2Gr: 300,
      },
      {
        componentName: "My S3",
        serviceName: "S3",
        co2Gr: 200,
      },
    ]);
    const expected = {
      totalCO2Converted: { noUnitValue: 500, unit: "g" },
      relativeCarbonFootprintList: [
        { label: "My EC2", co2Gr: 300, percentage: 60 },
        { label: "My S3", co2Gr: 200, percentage: 40 },
      ],
      totalCO2Gr: 500,
    };

    // Act
    const result = await carbonService.estimateCarbonFootPrint(infraId);

    // Assert
    expect(result).toEqual(expected);
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/v2/infrastructures/${infraId}/carbon-footprint`,
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: undefined,
        params: undefined,
      }),
    );
  });

  it("compares carbon footprint by region", async () => {
    // Arrange
    mockFetch.mockResolvedValue([
      { region: "Region 1", co2Gr: 100 },
      { region: "Region 2", co2Gr: 200 },
    ]);
    const expected = [
      { region: "Region 1", co2Gr: 100, co2PercentageDiff: -80 },
      { region: "Region 2", co2Gr: 200, co2PercentageDiff: -60 },
    ];

    // Act
    const result = await carbonService.compareCarbonFootPrintbByRegion(
      infraId,
      500,
    );

    // Assert
    expect(result).toEqual(expected);
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/v2/infrastructures/${infraId}/byregion-carbon-footprint`,
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: undefined,
        params: undefined,
      }),
    );
  });
});
