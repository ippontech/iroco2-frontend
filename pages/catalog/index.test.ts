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
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Catalog from "~/pages/catalog/index.vue";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { catalogResponse } from "./mockResponse";

let wrapper: VueWrapper;

const { mockGetAllService } = vi.hoisted(() => ({
  mockGetAllService: vi.fn(),
}));

describe("Catalog page", async () => {
  beforeEach(() => {
    mockNuxtImport("useNuxtApp", () => {
      return () => ({
        $api: {
          catalogService: {
            getAllServices:
              mockGetAllService.mockResolvedValue(catalogResponse),
          },
        },
      });
    });

    wrap();
  });

  afterEach(() => {
    mockGetAllService.mockClear();
  });

  it("should render", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should call catalog api once", async () => {
    expect(mockGetAllService).toHaveBeenCalledTimes(1);
  });
});

function wrap() {
  wrapper = mount(
    defineComponent({
      components: { Catalog },
      template: `
        <Suspense>
        <Catalog/>
        </Suspense>`,
    }),
  );
}
