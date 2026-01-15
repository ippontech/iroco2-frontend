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
import { Availability } from "~/type/Availability";
import type { ServiceCatalog } from "~/type/ServiceCatalog";
import type { ServiceDescription } from "~/type/ServiceDescription";
import ApiClient from "~/service/api/apiClient";

class CatalogApiClient extends ApiClient {
  private readonly RESOURCE = "/api/public/v2/catalog";

  async getAllServices(): Promise<ServiceCatalog[]> {
    const tab = Object.values(Availability);

    const services = await this.getCall<ServiceCatalog[]>(
      `${this.RESOURCE}/services`,
    );

    return services.sort(
      (a, b) => tab.indexOf(a.availability) - tab.indexOf(b.availability),
    );
  }
  async getById(id: string): Promise<ServiceDescription> {
    return await this.getCall(`${this.RESOURCE}/services/${id}`);
  }
}

export default CatalogApiClient;
