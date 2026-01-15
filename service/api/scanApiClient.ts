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
import ApiClient from "./apiClient";
import type { Scan, ScanDetails } from "~/type/Scan";

class ScanApiClient extends ApiClient {
  private readonly RESOURCE = "/api/scanner";
  async getAllScans(): Promise<Scan[]> {
    return await this.getCall<Scan[]>(this.RESOURCE);
  }

  async getScanById(scanId: string): Promise<ScanDetails> {
    return await this.getCall<ScanDetails>(`${this.RESOURCE}/${scanId}`);
  }
}

export default ScanApiClient;
