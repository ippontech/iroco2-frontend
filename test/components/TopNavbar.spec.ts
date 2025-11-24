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
import { TopNavbar } from "#components";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

let wrapper: VueWrapper;

const mockSignOut = vi.fn().mockResolvedValue(undefined);
const mockUser = { username: "test-user" };

vi.mock("vue-clerk", () => ({
  useClerk: vi.fn(() => ({
    user: { value: mockUser },
    signOut: mockSignOut,
  })),
}));

describe("TopNavbar Component", () => {
  beforeEach(() => {
    mockNuxtImport("useRuntimeConfig", () => {
      return () => ({
        public: {
          authActivate: "true",
          urlDocs: "https://docs.example.com",
        },
      });
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    mockSignOut.mockClear();
  });

  it("should render navigation when component is mounted", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { TopNavbar },
        template: `<TopNavbar />`,
      }),
    );

    // when
    const nav = wrapper.find("nav");

    // then
    expect(nav.exists()).toBe(true);
  });

  it("should display documentation link when component is rendered", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { TopNavbar },
        template: `<TopNavbar />`,
      }),
    );

    // when
    const docLink = wrapper.find("a");

    // then
    expect(docLink.exists()).toBe(true);
    expect(docLink.attributes("href")).toBe("https://docs.example.com");
  });

  it("should display demo text when auth is disabled", () => {
    // given
    mockNuxtImport("useRuntimeConfig", () => {
      return () => ({
        public: {
          authActivate: "false",
          urlDocs: "https://docs.example.com",
        },
      });
    });

    wrapper = mount(
      defineComponent({
        components: { TopNavbar },
        template: `<TopNavbar />`,
      }),
    );

    // when
    const content = wrapper.text();

    // then
    expect(content).toContain("nav.demo");
  });
});
