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

const { infrastructures } = vi.hoisted(() => ({
  infrastructures: [
    {
      id: "1",
      name: "mon infrastructure",
      cloudServiceProvider: { id: "1", name: "AWS" },
      defaultRegion: "eu-west-3",
      components: [],
    },
    {
      id: "2",
      name: "mon infrastructure 2",
      cloudServiceProvider: { id: "2", name: "Azure" },
      defaultRegion: "eu-west-3",
      components: [],
    },
  ],
}));

const { mockGetInfrastructures } = vi.hoisted(() => ({
  mockGetInfrastructures: vi.fn().mockResolvedValue(infrastructures),
}));

mockNuxtImport("useNuxtApp", () => {
  return () => ({
    $api: {
      infrastructureService: {
        getInfrastructures: mockGetInfrastructures,
      },
    },
  });
});

describe("Infrastructure store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch infrastructure", async () => {
    // Arrange
    const store = useInfrastructuresStore();

    // Act
    await store.fetchInfrastructures();

    // Assert
    expect(mockGetInfrastructures).toHaveBeenCalledTimes(1);
    expect(store.infrastructures).toEqual(infrastructures);
  });
});
