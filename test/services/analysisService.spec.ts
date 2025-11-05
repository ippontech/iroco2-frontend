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
import AnalysisService from "~/service/analysisService";

const ANALYSIS_API_URL = "/api/analysis";

const MOCK_ANALYSIS_1 = {
  status: "COMPLETED",
  id: "analysis-1",
  dateCreation: "2025-01-01T00:00:00Z",
  co2Gr: 1500,
};

const MOCK_ANALYSIS_2 = {
  status: "PENDING",
  id: "analysis-2",
  dateCreation: "2025-01-02T00:00:00Z",
  co2Gr: 2500000,
};

const EXPECTED_HTTP_CALL_PARAMS = {
  method: "GET",
  body: undefined,
  query: undefined,
  params: undefined,
};

describe("AnalysisService", () => {
  let analysisService: AnalysisService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    analysisService = new AnalysisService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllAnalyses", () => {
    it("should convert CO2 to best unit when fetching all analyses", async () => {
      // given
      mockFetch.mockResolvedValue([MOCK_ANALYSIS_1, MOCK_ANALYSIS_2]);

      const expected = [
        {
          ...MOCK_ANALYSIS_1,
          co2Converted: { noUnitValue: 2, unit: "kg" },
        },
        {
          ...MOCK_ANALYSIS_2,
          co2Converted: { noUnitValue: 3, unit: "tonne(s)" },
        },
      ];

      // when
      const result = await analysisService.getAllAnalyses();

      // then
      expect(result).toEqual(expected);
      expect(mockFetch).toHaveBeenCalledWith(
        ANALYSIS_API_URL,
        expect.objectContaining(EXPECTED_HTTP_CALL_PARAMS),
      );
    });

    it("should return empty array when no analyses exist", async () => {
      // given
      mockFetch.mockResolvedValue([]);

      // when
      const result = await analysisService.getAllAnalyses();

      // then
      expect(result).toEqual([]);
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAnalysisById", () => {
    const ANALYSIS_ID = "analysis-123";
    const MOCK_PAYLOAD_A = {
      name: "Lambda Function A",
      carbonGramFootprint: 300,
    };
    const MOCK_PAYLOAD_B = {
      name: "Lambda Function B",
      carbonGramFootprint: 200,
    };

    it("should aggregate carbon footprint when fetching analysis details", async () => {
      // given
      mockFetch.mockResolvedValue({
        status: "COMPLETED",
        id: ANALYSIS_ID,
        dateCreation: "2025-01-01T00:00:00Z",
        co2Gr: 500,
        payloads: [MOCK_PAYLOAD_A, MOCK_PAYLOAD_B],
      });

      const expected = {
        totalCO2Converted: { noUnitValue: 500, unit: "g" },
        relativeCarbonFootprintList: [
          { label: "Lambda Function A", co2Gr: 300, percentage: 60 },
          { label: "Lambda Function B", co2Gr: 200, percentage: 40 },
        ],
        totalCO2Gr: 500,
      };

      // when
      const result = await analysisService.getAnalysisById(ANALYSIS_ID);

      // then
      expect(result).toEqual(expected);
      expect(mockFetch).toHaveBeenCalledWith(
        `${ANALYSIS_API_URL}/${ANALYSIS_ID}`,
        expect.objectContaining(EXPECTED_HTTP_CALL_PARAMS),
      );
    });

    it("should return zero totals when analysis has no payloads", async () => {
      // given
      const analysisId = "analysis-789";
      mockFetch.mockResolvedValue({
        status: "COMPLETED",
        id: analysisId,
        dateCreation: "2025-01-01T00:00:00Z",
        co2Gr: 0,
        payloads: [],
      });

      // when
      const result = await analysisService.getAnalysisById(analysisId);

      // then
      expect(result.totalCO2Gr).toBe(0);
      expect(result.relativeCarbonFootprintList).toHaveLength(0);
    });

    it("should sort payloads by highest carbon footprint percentage first when fetching analysis", async () => {
      // given
      const analysisId = "analysis-sort";
      mockFetch.mockResolvedValue({
        status: "COMPLETED",
        id: analysisId,
        dateCreation: "2025-01-01T00:00:00Z",
        co2Gr: 1000,
        payloads: [
          { name: "Service A", carbonGramFootprint: 100 },
          { name: "Service B", carbonGramFootprint: 500 },
          { name: "Service C", carbonGramFootprint: 400 },
        ],
      });

      // when
      const result = await analysisService.getAnalysisById(analysisId);

      // then
      expect(result.relativeCarbonFootprintList[0].label).toBe("Service B");
      expect(result.relativeCarbonFootprintList[1].label).toBe("Service C");
      expect(result.relativeCarbonFootprintList[2].label).toBe("Service A");
    });
  });

  describe("deleteAnalysis", () => {
    const ANALYSIS_TO_DELETE_ID = "analysis-to-delete";

    it("should call DELETE endpoint when deleting analysis", async () => {
      // given
      mockFetch.mockResolvedValue(undefined);

      // when
      await analysisService.deleteAnalysis(ANALYSIS_TO_DELETE_ID);

      // then
      expect(mockFetch).toHaveBeenCalledWith(
        `${ANALYSIS_API_URL}/${ANALYSIS_TO_DELETE_ID}`,
        expect.objectContaining({
          method: "DELETE",
          body: undefined,
          query: undefined,
        }),
      );
    });
  });
});
