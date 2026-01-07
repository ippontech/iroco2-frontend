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
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { useCloudServiceProviderStore } from "~/stores/cloud-service-provider.store";

const { cloudServiceProviders } = vi.hoisted(() => ({
  cloudServiceProviders: [
    { id: "1", name: "AWS" },
    { id: "2", name: "Azure" },
  ],
}));

const { mockGetCloudServiceProviders } = vi.hoisted(() => ({
  mockGetCloudServiceProviders: vi
    .fn()
    .mockResolvedValue(cloudServiceProviders),
}));

mockNuxtImport("useNuxtApp", () => {
  return () => ({
    $api: {
      cloudServiceProviderService: {
        getCloudServiceProviders: mockGetCloudServiceProviders,
      },
    },
  });
});

describe("Cloud service provider store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch cloud service providers", async () => {
    // Arrange
    const store = useCloudServiceProviderStore();

    // Act
    await store.fetchCloudServiceProviders();

    // Assert
    expect(mockGetCloudServiceProviders).toHaveBeenCalledTimes(1);
    expect(store.cloudServiceProviders).toEqual(cloudServiceProviders);
  });

  it("should get cloud service provider id by name", async () => {
    // Arrange
    const store = useCloudServiceProviderStore();
    store.cloudServiceProviders = cloudServiceProviders;

    // Act
    const cspId = await store.getCloudServiceProviderID("Azure");

    // Assert
    expect(cspId).toEqual("2");
  });
});
