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

import { SidebarMenu } from "#components";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

let wrapper: VueWrapper;

describe("SidebarMenu Component", () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("should render nav when no content is provided", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { SidebarMenu },
        template: `<SidebarMenu />`,
      }),
    );

    // when
    const nav = wrapper.find("nav");

    // then
    expect(nav.exists()).toBe(true);
  });

  it("should render slot content when a content is provided", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { SidebarMenu },
        template: `
          <SidebarMenu>
            <div data-testid="slot-content">Custom slot content</div>
          </SidebarMenu>
        `,
      }),
    );

    // when
    const slotContent = wrapper.find('[data-testid="slot-content"]');

    // then
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe("Custom slot content");
  });
});
