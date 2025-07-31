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
import AWSDataCenterService from "~/service/awsDataCenterService";
import type { $Fetch } from "ofetch";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { Mock } from "vitest";

const AWS_UUID = vi.hoisted(() => "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

const { mockGetCloudServiceProviderID, mockGetInfrastructure } = vi.hoisted(
  () => ({
    mockGetCloudServiceProviderID: vi.fn().mockResolvedValue(AWS_UUID),
    mockGetInfrastructure: vi.fn().mockResolvedValue({
      id: "infra1",
      defaultRegion: "region2",
    }),
  }),
);

mockNuxtImport("useCloudServiceProviderStore", () => {
  return () => ({
    getCloudServiceProviderID: mockGetCloudServiceProviderID,
  });
});

vi.mock("~/service/infrastructureService", () => ({
  default: vi.fn().mockImplementation(() => ({
    getInfrastructure: mockGetInfrastructure,
  })),
}));

describe("AWSDataCenterService", () => {
  let awsDataCenterService: AWSDataCenterService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    awsDataCenterService = new AWSDataCenterService(
      mockFetch as unknown as $Fetch,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockRegions = [
    { id: "region1", name: "Region 1", csp: AWS_UUID },
    { id: "region2", name: "Region 2", csp: AWS_UUID },
  ];

  it("fetches all AWS data centers", async () => {
    // Arrange
    mockFetch.mockResolvedValue(mockRegions);

    // Act
    const regions = await awsDataCenterService.getAllAWSDataCenter();

    // Assert
    expect(regions).toEqual(mockRegions);
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/cloud-service-providers/${AWS_UUID}/regions`,
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  it("fetches the correct region by infrastructure ID", async () => {
    // Arrange
    mockFetch.mockResolvedValue(mockRegions);

    // Act
    const region =
      await awsDataCenterService.getRegionByInfrastructureId("infra1");

    // Assert
    expect(region).toEqual(mockRegions[1]);
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/cloud-service-providers/${AWS_UUID}/regions`,
      expect.objectContaining({
        method: "GET",
      }),
    );
    expect(mockGetInfrastructure).toHaveBeenCalledWith("infra1");
  });

  it("returns undefined if no region matches the default region", async () => {
    // Arrange
    mockFetch.mockResolvedValue([
      { id: "region1", name: "Region 1", csp: AWS_UUID },
      { id: "region3", name: "Region 3", csp: AWS_UUID },
    ]);

    // Act
    const region =
      await awsDataCenterService.getRegionByInfrastructureId("infra1");

    // Assert
    expect(region).toBeUndefined();
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/cloud-service-providers/${AWS_UUID}/regions`,
      expect.objectContaining({
        method: "GET",
      }),
    );
    expect(mockGetInfrastructure).toHaveBeenCalledWith("infra1");
  });
});
