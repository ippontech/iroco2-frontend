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
import { NavBar } from "#components";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

let wrapper: VueWrapper;

const mockSignOut = vi.fn().mockResolvedValue(undefined);
const mockRoutePath = { value: "/" };

vi.mock("vue-router", () => ({
  useRoute: vi.fn(() => ({
    path: mockRoutePath.value,
  })),
}));

vi.mock("vue-clerk", () => ({
  SignedIn: defineComponent({
    name: "SignedIn",
    template: "<div class='signed-in'><slot /></div>",
  }),
  SignedOut: defineComponent({
    name: "SignedOut",
    template: "<div class='signed-out'><slot /></div>",
  }),
  SignInButton: defineComponent({
    name: "SignInButton",
    template: "<div class='sign-in-button'><slot /></div>",
  }),
  useClerk: vi.fn(() => ({
    signOut: mockSignOut,
  })),
}));

describe("NavBar Component", () => {
  beforeEach(() => {
    mockNuxtImport("useRuntimeConfig", () => {
      return () => ({
        public: {
          authActivate: "false",
          urlDocs: "https://docs.example.com",
        },
      });
    });

    mockRoutePath.value = "/";
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    mockSignOut.mockClear();
  });

  it("should render navigation bar when component is mounted", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { NavBar },
        template: `<NavBar />`,
      }),
    );

    // when
    const nav = wrapper.find("nav");

    // then
    expect(nav.exists()).toBe(true);
    expect(nav.classes()).toContain("bg-iroco-dark-green");
  });

  it("should apply blur effect when on login page", () => {
    // given
    mockRoutePath.value = "/login";

    wrapper = mount(
      defineComponent({
        components: { NavBar },
        template: `<NavBar />`,
      }),
    );

    // when
    const content = wrapper.find(".blur-md");

    // then
    expect(content.exists()).toBe(true);
  });

  it("should render resources dropdown when component is displayed", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { NavBar },
        template: `<NavBar />`,
      }),
    );

    // when
    const button = wrapper.find("button");

    // then
    expect(button.exists()).toBe(true);
  });
});
