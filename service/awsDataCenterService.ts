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
import type { Region } from "~/type/Region";
import type InfrastructureApiClient from "~/service/api/infrastructureApiClient";
import type { AWSDataCenterApiClient } from "~/service/api/AWSDataCenterApiClient";

class AWSDataCenterService {
  private readonly infrastructureApiClient: InfrastructureApiClient;
  private readonly awsDataCenterApiClient: AWSDataCenterApiClient;

  constructor(
    infrastructureApiClient: InfrastructureApiClient,
    awsDataCenterApiClient: AWSDataCenterApiClient,
  ) {
    this.infrastructureApiClient = infrastructureApiClient;
    this.awsDataCenterApiClient = awsDataCenterApiClient;
  }

  async getAllAWSDataCenter(): Promise<Region[]> {
    const cspId =
      await useCloudServiceProviderStore().getCloudServiceProviderID("AWS");

    return await this.awsDataCenterApiClient.getAllAWSDataCenter(cspId);
  }

  async getRegionByInfrastructureId(infrastructureId: string) {
    const infrastructure =
      await this.infrastructureApiClient.getInfrastructure(infrastructureId);
    const regions = await this.getAllAWSDataCenter();
    return regions.find((region) => region.id === infrastructure.defaultRegion);
  }
}

export default AWSDataCenterService;
