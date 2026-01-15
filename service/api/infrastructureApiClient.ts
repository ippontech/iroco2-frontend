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
import type { InfrastructureRequest } from "~/type/infrastructure/InfrastructureRequest";
import ApiClient from "./apiClient";
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";

class InfrastructureApiClient extends ApiClient {
  private readonly RESOURCE = "/api/v2/infrastructures";

  async createNewInfra(
    infrastructure: InfrastructureRequest,
  ): Promise<Infrastructure> {
    return await this.postCall<Infrastructure>(this.RESOURCE, infrastructure);
  }

  async getInfrastructures(): Promise<Infrastructure[]> {
    return await this.getCall<Infrastructure[]>(this.RESOURCE);
  }

  async deleteInfra(id: string): Promise<void> {
    const url = this.RESOURCE + "/" + id;
    return await this.deleteCall(url);
  }

  async getInfrastructure(id: string): Promise<Infrastructure> {
    const url = this.RESOURCE + "/" + id;
    return await this.getCall(url);
  }
}

export default InfrastructureApiClient;
