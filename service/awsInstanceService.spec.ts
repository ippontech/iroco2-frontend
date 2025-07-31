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
import type { Mock } from "vitest";
import AWSInstanceService from "./awsInstanceService";
import type { EC2InstanceType } from "~/type/ec2InstanceType";

describe("AWSInstanceService", () => {
  let awsInstanceService: AWSInstanceService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    awsInstanceService = new AWSInstanceService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockEC2Instances: EC2InstanceType[] = [
    { name: "a1.2xlarge" },
    { name: "a1.4xlarge" },
    { name: "a1.large" },
    { name: "a1.medium" },
    { name: "a1.metal" },
    { name: "a1.xlarge" },
    { name: "c1.medium" },
    { name: "c1.xlarge" },
    { name: "c3.2xlarge" },
    { name: "c3.4xlarge" },
    { name: "c3.8xlarge" },
  ];

  it("fetches all AWS instance services for EC2", async () => {
    // Arrange
    const givenServiceInstance = "EC2";
    mockFetch.mockResolvedValue(mockEC2Instances);

    // Act
    const EC2Instances =
      await awsInstanceService.getAllInstanceByType(givenServiceInstance);

    // Assert
    expect(EC2Instances).toEqual(mockEC2Instances);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/awsInstanceType",
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: {
          serviceShortName: givenServiceInstance,
        },
        params: undefined,
      }),
    );
  });
});
