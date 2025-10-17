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

import { Button } from "#components";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

let wrapper: VueWrapper;

describe("Button Component", () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("renders with default props", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Button },
        template: `<Button>Click me</Button>`,
      }),
    );

    // when
    const button = wrapper.find("button");

    // then
    expect(button.exists()).toBe(true);
  });

  it("accepts as prop to render different element", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Button },
        template: `<Button as="a">Link Button</Button>`,
      }),
    );

    // when
    const element = wrapper.find("a");

    // then
    expect(element.exists()).toBe(true);
  });

  it("handles disabled state", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Button },
        template: `<Button disabled>Disabled</Button>`,
      }),
    );

    // when
    const button = wrapper.find("button");

    // then
    expect(button.attributes("disabled")).toBeDefined();
  });
});
