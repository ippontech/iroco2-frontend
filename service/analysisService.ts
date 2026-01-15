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

import type { ReportStatus } from "~/type/ReportStatus";
import type { Payload } from "~/type/Payload";
import type { AnalysisApiClient } from "~/service/api/analysisApiClient";

export type Analysis = {
  status: ReportStatus;
  id: string;
  dateCreation: string;
  co2Gr: number;
};

export type AnalysisDetails = Analysis & {
  payloads: Payload[];
};

class AnalysisService {
  private readonly analysisApiClient: AnalysisApiClient;

  constructor(analysisApiClient: AnalysisApiClient) {
    this.analysisApiClient = analysisApiClient;
  }

  async getAllAnalyses() {
    const analyses = await this.analysisApiClient.getAllAnalyses();
    return analyses.map((analysis) => ({
      ...analysis,
      co2Converted: convertEstimateToBestMassUnit(analysis.co2Gr),
    }));
  }

  async getAnalysisById(analysisId: string) {
    const estimated = (
      await this.analysisApiClient.getAnalysisById(analysisId)
    ).payloads.map((p) => ({
      label: p.name,
      co2Gr: p.carbonGramFootprint,
    }));

    const { relativeCarbonFootprintList, totalCO2Gr } =
      aggregateCarbonFootPrint(estimated);

    const totalCO2Converted = convertEstimateToBestMassUnit(totalCO2Gr);

    return { totalCO2Converted, relativeCarbonFootprintList, totalCO2Gr };
  }

  async deleteAnalysis(analysisId: string): Promise<void> {
    return await this.analysisApiClient.deleteAnalysis(analysisId);
  }
}

export default AnalysisService;
