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
import ComponentService from "./componentService";
import HttpFactory from "./factory/httpFactory";
import type { Region } from "~/type/Region";
import InfrastructureService from "~/service/infrastructureService";

class AWSDataCenterService extends HttpFactory {
  private readonly RESOURCE = "/api/cloud-service-providers";
  private readonly componentService: ComponentService;
  private readonly infrastructureService: InfrastructureService;

  constructor(fetcher: $Fetch) {
    super(fetcher);
    this.componentService = new ComponentService(fetcher);
    this.infrastructureService = new InfrastructureService(fetcher);
  }

  async getAllAWSDataCenter(): Promise<Region[]> {
    const cspId =
      await useCloudServiceProviderStore().getCloudServiceProviderID("AWS");

    return await this.getCall<Region[]>(`${this.RESOURCE}/${cspId}/regions`);
  }

  async getRegionByInfrastructureId(infrastructureId: string) {
    const infrastructure =
      await this.infrastructureService.getInfrastructure(infrastructureId);
    const regions = await this.getAllAWSDataCenter();
    const currentRegion = regions.find(
      (region) => region.id === infrastructure.defaultRegion,
    );
    return currentRegion;
  }
}

export default AWSDataCenterService;
