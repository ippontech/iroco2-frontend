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
import { InfrastructureSidebarMenu } from "#components";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

let wrapper: VueWrapper;

describe("InfrastructureSidebarMenu Component", () => {
  beforeEach(() => {
    mockNuxtImport("useRoute", () => {
      return () => ({
        params: {
          infrastructureID: "test-infra-123",
        },
      });
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("should render component when mounted", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { InfrastructureSidebarMenu },
        template: `<InfrastructureSidebarMenu />`,
      }),
    );

    // when
    const container = wrapper.find("div");

    // then
    expect(container.exists()).toBe(true);
  });

  it("should display infrastructure title when component is rendered", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { InfrastructureSidebarMenu },
        template: `<InfrastructureSidebarMenu />`,
      }),
    );

    // when
    const title = wrapper.find("span");

    // then
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Infrastructure");
  });

  it("should render sidebar item when component is displayed", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { InfrastructureSidebarMenu },
        template: `<InfrastructureSidebarMenu />`,
      }),
    );

    // when
    const sidebarItem = wrapper.findComponent({ name: "SidebarItem" });

    // then
    expect(sidebarItem.exists()).toBe(true);
  });
});
