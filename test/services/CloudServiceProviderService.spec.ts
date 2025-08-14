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
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { Mock } from "vitest";
import CloudServiceProviderSvc from "~/service/CloudServiceProviderService";
import type { CloudServiceProvider } from "~/type/infrastructure/CloudServiceProvider";
import type { CloudServiceProviderService } from "~/type/infrastructure/CloudServiceProviderService";

const AWS_UUID = vi.hoisted(() => "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

const { mockGetCloudServiceProviderID } = vi.hoisted(() => ({
  mockGetCloudServiceProviderID: vi.fn().mockResolvedValue(AWS_UUID),
}));

mockNuxtImport("useCloudServiceProviderStore", () => {
  return () => ({
    getCloudServiceProviderID: mockGetCloudServiceProviderID,
  });
});

describe("CloudServiceProviderService", () => {
  let cloudServiceProviderService: CloudServiceProviderSvc;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    cloudServiceProviderService = new CloudServiceProviderSvc(
      mockFetch as unknown as $Fetch,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches all AWS data centers", async () => {
    // Arrange
    const cloudServiceProviders: CloudServiceProvider[] = [
      {
        id: AWS_UUID,
        name: "AWS",
      },
    ];
    mockFetch.mockResolvedValue(cloudServiceProviders);

    // Act
    const result = await cloudServiceProviderService.getCloudServiceProviders();

    // Assert
    expect(result).toEqual(cloudServiceProviders);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/cloud-service-providers",
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: undefined,
        params: undefined,
      }),
    );
  });

  it("fetches the services from cloud service provider", async () => {
    // Arrange
    const services: CloudServiceProviderService[] = [
      {
        id: "EC2 Id",
        name: "EC2",
        description: "EC2 Description",
        shortname: "EC2",
      },
    ];
    mockFetch.mockResolvedValue(services);

    // Act
    const result =
      await cloudServiceProviderService.getCloudServiceProviderServices();

    // Assert
    expect(result).toEqual(services);
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/cloud-service-providers/${AWS_UUID}/services`,
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: undefined,
        params: undefined,
      }),
    );
    expect(mockGetCloudServiceProviderID).toHaveBeenCalledWith("AWS");
  });
});
