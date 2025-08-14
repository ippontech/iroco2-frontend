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
import type { Mock } from "vitest";
import TokenService from "~/service/tokenService";
import type { $Fetch } from "ofetch";
import type { GetTokenRequest } from "~/type/GetTokenRequest";

describe("tokenService", () => {
  let tokenService: TokenService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    tokenService = new TokenService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it("fetch the token", async () => {
    //Arrange
    const token = "dummyToken";
    mockFetch.mockResolvedValue(token);
    const getTokenRequest: GetTokenRequest = {
      aws_account_id: "123456789012",
      expire_in_seconds: 3600,
    };

    //Act
    const result = await tokenService.getToken(getTokenRequest);
    //Assert
    expect(result).toEqual(token);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/v1/token/generate",
      expect.objectContaining({
        method: "POST",
        body: getTokenRequest,
      }),
    );
  });
});
