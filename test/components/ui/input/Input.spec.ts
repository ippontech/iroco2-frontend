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

import { Input } from "#components";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

let wrapper: VueWrapper;

describe("Input Component", () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("should use default value when the 'default-value' prop is set", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Input },
        template: `<Input default-value="test default" />`,
      }),
    );

    // when
    const input = wrapper.find("input");

    // then
    expect(input.element.value).toBe("test default");
  });

  it("should use 'v-model' when 'v-model' is provided", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Input },
        data() {
          return { value: "test model value" };
        },
        template: `<Input v-model="value" />`,
      }),
    );

    // when
    const input = wrapper.find("input");

    // then
    expect(input.element.value).toBe("test model value");
  });

  it("should emit 'update:modelValue' when the input value changes", async () => {
    // given
    const emitHandler = vi.fn();
    wrapper = mount(
      defineComponent({
        components: { Input },
        template: `<Input @update:modelValue="handleUpdate" />`,
        methods: {
          handleUpdate: emitHandler,
        },
      }),
    );

    // when
    const input = wrapper.find("input");
    await input.setValue("updated value");

    // then
    expect(emitHandler).toHaveBeenCalledWith("updated value");
  });

  it("should update model value when the input value changes", async () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Input },
        data() {
          return { value: "" };
        },
        template: `<Input v-model="value" />`,
      }),
    );

    // when
    const input = wrapper.find("input");
    await input.setValue("new value");

    // then
    expect(wrapper.vm.value).toBe("new value");
  });

  it("should render 'unit' when the 'unit' prop is set", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Input },
        template: `<Input unit="kg" />`,
      }),
    );

    // when
    const unitSpan = wrapper.find("span");

    // then
    expect(unitSpan.exists()).toBe(true);
    expect(unitSpan.text()).toBe("units.kg");
  });

  it("should not render 'unit' span when the 'unit' prop is not provided", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Input },
        template: `<Input />`,
      }),
    );

    // when
    const unitSpan = wrapper.find("span");

    // then
    expect(unitSpan.exists()).toBe(false);
  });

  it("should pass the 'type' prop to the input when the 'type' prop is provided", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Input },
        template: `<Input type="email" />`,
      }),
    );

    // when
    const input = wrapper.find("input");

    // then
    expect(input.attributes("type")).toBe("email");
  });

  it("should handle number type when the 'type' prop is set to number", async () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Input },
        data() {
          return { value: 0 };
        },
        template: `<Input v-model="value" type="number" />`,
      }),
    );

    // when
    const input = wrapper.find("input");
    await input.setValue("123");

    // then
    expect(wrapper.vm.value).toBe(123);
    expect(input.attributes("type")).toBe("number");
  });
});
