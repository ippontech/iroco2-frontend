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

type ContactRequestBody = {
  company_name: string;
  type: string;
  email: string;
  message: string;
};

class ContactApiClient extends ApiClient {
  async requestDemoEmail(body: ContactRequestBody): Promise<void> {
    const irocoCustomerRequestEndpoint =
      useRuntimeConfig().public.irocoCustomerRequestEndpoint;

    if (typeof irocoCustomerRequestEndpoint !== "string") {
      throw new TypeError("irocoCustomerRequestEndpoint must be a string");
    }

    await this.postCall(irocoCustomerRequestEndpoint, body);
  }
}

export default ContactApiClient;
