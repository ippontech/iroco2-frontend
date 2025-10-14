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
import HttpFactory from "~/service/factory/httpFactory";
import type { CarbonFootprintEstimateComponent } from "~/type/CarbonFootprintEstimateComponent";
import type { RegionCarbonFootprint } from "~/type/RegionCarbonFootprint";

class IrocalcCarbonService extends HttpFactory {
  private readonly RESOURCE = "/api/v2/infrastructures";

  async estimateCarbonFootPrint(infrastructureId: string) {
    const url = `${this.RESOURCE}/${infrastructureId}/carbon-footprint`;

    const estimated = (
      await this.getCall<CarbonFootprintEstimateComponent[]>(url)
    ).map((e) => ({
      label: e.componentName,
      co2Gr: e.co2Gr,
    }));

    const { relativeCarbonFootprintList, totalCO2Gr } =
      aggregateCarbonFootPrint(estimated);

    const totalCO2Converted = convertEstimateToBestMassUnit(totalCO2Gr);

    return { totalCO2Converted, relativeCarbonFootprintList, totalCO2Gr };
  }

  async compareCarbonFootPrintbByRegion(
    infrastructureId: string,
    totalCO2Gr: number,
  ) {
    const url = `${this.RESOURCE}/${infrastructureId}/byregion-carbon-footprint`;

    const estimatedCO2ByRegion =
      await this.getCall<RegionCarbonFootprint[]>(url);

    const estimatedCO2WithPercentDiff = estimatedCO2ByRegion.map(
      (estimate) => ({
        ...estimate,
        co2PercentageDiff: Math.round(
          (100 * (estimate.co2Gr - totalCO2Gr)) / totalCO2Gr,
        ),
      }),
    );

    return estimatedCO2WithPercentDiff.sort((a, b) => a.co2Gr - b.co2Gr);
  }
}

export default IrocalcCarbonService;
