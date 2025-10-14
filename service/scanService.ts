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
import HttpFactory from "./factory/httpFactory";
import type { EstimatedScan, Scan, ScanDetails } from "~/type/Scan";

class ScanService extends HttpFactory {
  private readonly RESOURCE = "/api/scanner";
  async getAllScans(): Promise<Scan[]> {
    const scans = await this.getCall<Scan[]>(this.RESOURCE);
    const scansWithCO2Converted = scans.map((scan) => ({
      ...scan,
      co2Converted: convertEstimateToBestMassUnit(scan.co2Gr),
    }));
    return scansWithCO2Converted;
  }

  async getScanById(scanId: string): Promise<EstimatedScan> {
    const scans = await this.getCall<ScanDetails>(`${this.RESOURCE}/${scanId}`);

    const estimated = scans.payloads.map((p) => ({
      label: p.name,
      co2Gr: p.carbonGramFootprint,
    }));

    const { relativeCarbonFootprintList, totalCO2Gr } =
      aggregateCarbonFootPrint(estimated);

    const totalCO2Converted = convertEstimateToBestMassUnit(totalCO2Gr);

    return {
      totalCO2Converted,
      relativeCarbonFootprintList,
    };
  }
}

export default ScanService;
