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
import type { Component } from "~/type/infrastructure/Component";
import type { SaveComponentRequest } from "~/type/infrastructure/SaveComponentRequest";
import type { UpdateComponentRequest } from "~/type/infrastructure/UpdateComponentRequest";

class ComponentService extends HttpFactory {
  private RESOURCE = "/api/v2/components";

  async getComponentsByInfrastructureId(id: string): Promise<Component[]> {
    const url = this.RESOURCE;
    return await this.getCall(url, undefined, { infrastructureId: id });
  }
  async saveComponent(component: SaveComponentRequest): Promise<void> {
    return await this.postCall(this.RESOURCE, component);
  }
  async deleteComponent(id: string): Promise<void> {
    return await this.deleteCall(this.RESOURCE + "/" + id);
  }

  async updateComponent(component: UpdateComponentRequest): Promise<void> {
    return await this.patchCall(this.RESOURCE, component);
  }
}

export default ComponentService;
