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
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { Mock } from "vitest";
import type { AWSDataCenterApiClient } from "~/service/api/AWSDataCenterApiClient";
import type InfrastructureApiClient from "~/service/api/infrastructureApiClient";

const AWS_UUID = vi.hoisted(() => "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

const { mockGetCloudServiceProviderID } = vi.hoisted(() => ({
  mockGetCloudServiceProviderID: vi.fn().mockResolvedValue(AWS_UUID),
}));

mockNuxtImport("useCloudServiceProviderStore", () => {
  return () => ({
    getCloudServiceProviderID: mockGetCloudServiceProviderID,
  });
});

describe("AWSDataCenterService", () => {
  let awsDataCenterService: AWSDataCenterService;
  let mockInfrastructureApiClient: InfrastructureApiClient;
  let mockAWSDataCenterApiClient: AWSDataCenterApiClient;

  beforeEach(() => {
    mockInfrastructureApiClient = {
      getInfrastructure: vi.fn().mockResolvedValue({
        id: "infra1",
        defaultRegion: "region2",
      }),
    } as unknown as InfrastructureApiClient;

    mockAWSDataCenterApiClient = {
      getAllAWSDataCenter: vi.fn(),
    } as unknown as AWSDataCenterApiClient;

    awsDataCenterService = new AWSDataCenterService(
      mockInfrastructureApiClient,
      mockAWSDataCenterApiClient,
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
    (mockAWSDataCenterApiClient.getAllAWSDataCenter as Mock).mockResolvedValue(
      mockRegions,
    );

    // Act
    const regions = await awsDataCenterService.getAllAWSDataCenter();

    // Assert
    expect(regions).toEqual(mockRegions);
    expect(mockAWSDataCenterApiClient.getAllAWSDataCenter).toHaveBeenCalledWith(
      AWS_UUID,
    );
  });

  it("fetches the correct region by infrastructure ID", async () => {
    // Arrange
    (mockAWSDataCenterApiClient.getAllAWSDataCenter as Mock).mockResolvedValue(
      mockRegions,
    );

    // Act
    const region =
      await awsDataCenterService.getRegionByInfrastructureId("infra1");

    // Assert
    expect(region).toEqual(mockRegions[1]);
    expect(mockAWSDataCenterApiClient.getAllAWSDataCenter).toHaveBeenCalled();
    expect(mockInfrastructureApiClient.getInfrastructure).toHaveBeenCalledWith(
      "infra1",
    );
  });

  it("returns undefined if no region matches the default region", async () => {
    // Arrange
    (mockAWSDataCenterApiClient.getAllAWSDataCenter as Mock).mockResolvedValue([
      { id: "region1", name: "Region 1", csp: AWS_UUID },
      { id: "region3", name: "Region 3", csp: AWS_UUID },
    ]);

    // Act
    const region =
      await awsDataCenterService.getRegionByInfrastructureId("infra1");

    // Assert
    expect(region).toBeUndefined();
    expect(mockAWSDataCenterApiClient.getAllAWSDataCenter).toHaveBeenCalled();
    expect(mockInfrastructureApiClient.getInfrastructure).toHaveBeenCalledWith(
      "infra1",
    );
  });
});
