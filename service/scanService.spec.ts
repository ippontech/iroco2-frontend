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
import type { Mock } from "vitest";
import ScanService from "./scanService";
import type { $Fetch } from "ofetch";
import type { ReportStatus } from "~/type/ReportStatus";

describe("scanService", () => {
  let scanService: ScanService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    scanService = new ScanService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("get all the scans", async () => {
    //Arrange
    const mockedScans = [
      {
        id: "4e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "CREATED" as ReportStatus,
        dateCreation: "2025-03-11T13:22:12.974826",
        co2Gr: 52,
      },
      {
        id: "5e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "SUCCESS" as ReportStatus,
        dateCreation: "2025-03-12T13:22:12.974826",
        co2Gr: 33,
      },
      {
        id: "6e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "IN_PROGRESS" as ReportStatus,
        dateCreation: "2025-03-13T13:22:12.974826",
        co2Gr: 62,
      },
    ];
    mockFetch.mockResolvedValue(mockedScans);
    const expected = [
      {
        id: "4e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "CREATED" as ReportStatus,
        dateCreation: "2025-03-11T13:22:12.974826",
        co2Gr: 52,
        co2Converted: {
          noUnitValue: 52,
          unit: "g",
        },
      },
      {
        id: "5e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "SUCCESS" as ReportStatus,
        dateCreation: "2025-03-12T13:22:12.974826",
        co2Gr: 33,
        co2Converted: {
          noUnitValue: 33,
          unit: "g",
        },
      },
      {
        id: "6e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "IN_PROGRESS" as ReportStatus,
        dateCreation: "2025-03-13T13:22:12.974826",
        co2Gr: 62,
        co2Converted: {
          noUnitValue: 62,
          unit: "g",
        },
      },
    ];

    //Act
    const result = await scanService.getAllScans();

    //Assert
    expect(result).toEqual(expected);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/scanner",
      expect.objectContaining({
        method: "GET",
      }),
    );
  });
});
