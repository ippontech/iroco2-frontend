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

import { Textarea } from "#components";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

let wrapper: VueWrapper;

describe("Textarea Component", () => {
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("renders with default props", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Textarea },
        template: `<Textarea />`,
      }),
    );

    // when
    const textarea = wrapper.find("textarea");

    // then
    expect(textarea.exists()).toBe(true);
  });

  it("accepts defaultValue prop", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Textarea },
        template: `<Textarea default-value="default content" />`,
      }),
    );

    // when
    const textarea = wrapper.find("textarea");

    // then
    expect(textarea.element.value).toBe("default content");
  });

  it("accepts modelValue prop with v-model", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Textarea },
        data() {
          return { content: "initial content" };
        },
        template: `<Textarea v-model="content" />`,
      }),
    );

    // when
    const textarea = wrapper.find("textarea");

    // then
    expect(textarea.element.value).toBe("initial content");
  });

  it("emits update:modelValue when content changes", async () => {
    // given
    const emitHandler = vi.fn();
    wrapper = mount(
      defineComponent({
        components: { Textarea },
        template: `<Textarea @update:modelValue="handleUpdate" />`,
        methods: {
          handleUpdate: emitHandler,
        },
      }),
    );

    // when
    const textarea = wrapper.find("textarea");
    await textarea.setValue("new content");

    // then
    expect(emitHandler).toHaveBeenCalledWith("new content");
  });

  it("updates model value when textarea changes", async () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Textarea },
        data() {
          return { content: "" };
        },
        template: `<Textarea v-model="content" />`,
      }),
    );

    // when
    const textarea = wrapper.find("textarea");
    await textarea.setValue("updated content");

    // then
    expect(wrapper.vm.content).toBe("updated content");
  });

  it("handles disabled state", () => {
    // given
    wrapper = mount(
      defineComponent({
        components: { Textarea },
        template: `<Textarea disabled />`,
      }),
    );

    // when
    const textarea = wrapper.find("textarea");

    // then
    expect(textarea.attributes("disabled")).toBeDefined();
  });
});
