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
import type { ofetch } from "ofetch";

class HttpFactory {
  private $fetch: typeof ofetch;

  constructor(fetcher: typeof ofetch) {
    this.$fetch = fetcher;
  }

  protected async deleteCall(
    url: string,
    data?: object,
    params?: object,
    extras = {},
  ): Promise<void> {
    return this.call("DELETE", url, data, params, extras);
  }

  protected async patchCall(
    url: string,
    data?: object,
    params?: object,
    extras = {},
  ): Promise<void> {
    return this.call("PATCH", url, data, params, extras);
  }

  protected async putCall(
    url: string,
    data?: object,
    params?: object,
    extras = {},
  ): Promise<void> {
    return this.call("PUT", url, data, params, extras);
  }

  protected async postCall<T>(
    url: string,
    data?: object,
    extras = {},
  ): Promise<T> {
    return this.call("POST", url, data, extras);
  }

  protected async getCall<T>(
    url: string,
    query?: object,
    params?: object,
    extras = {},
  ): Promise<T> {
    return this.call("GET", url, undefined, query, params, extras);
  }

  private async call<T>(
    method: string,
    url: string,
    data?: object,
    query?: object,
    params?: object,
    extras = {},
  ): Promise<T> {
    return await this.$fetch(url, {
      method,
      body: data,
      ...extras,
      query: query,
      params: params,
    });
  }
}

export default HttpFactory;
