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
import { AlertAddAnalysis } from "#components";
import { AlertDialogContent } from "radix-vue";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";

let wrapper: VueWrapper;

const { mockUploadFile } = vi.hoisted(() => ({
  mockUploadFile: vi.fn().mockResolvedValue({}),
}));

mockNuxtImport("useNuxtApp", () => {
  return () => ({
    $api: {
      curApiClient: {
        uploadFile: mockUploadFile,
      },
    },
  });
});

describe("AddAnalysisAlert component", () => {
  beforeEach(() => {
    mockNuxtImport("useNuxtApp", () => {
      return () => ({
        $api: {
          curApiClient: {
            uploadFile: mockUploadFile,
          },
        },
      });
    });

    wrapper = wrap();
  });

  afterEach(() => {
    mockUploadFile.mockClear();
  });

  it("renders correctly when opened", async () => {
    const teleportContent = wrapper.findComponent(AlertDialogContent);
    const dialog = teleportContent.find('[role="alertdialog"]');

    expect(teleportContent.exists()).toBe(true);
    expect(dialog.exists()).toBe(true);

    const title = dialog.find("h2");
    expect(title.text()).toContain("alerts.addAnalysis.title");
  });

  it("disables the Add button initially", async () => {
    const teleportContent = wrapper.findComponent(AlertDialogContent);
    const dialog = teleportContent.find('[role="alertdialog"]');
    const addButton = dialog.find("[data-tid=add-analysis-button]");
    expect(addButton.attributes("disabled")).toBeDefined();
  });

  it("enables the Add button when a file is selected", async () => {
    const teleportContent = wrapper.findComponent(AlertDialogContent);
    const dialog = teleportContent.find('[role="alertdialog"]');
    const fileInput = dialog.find('input[type="file"]');
    const testFile = new File(["test-content"], "test.csv", {
      type: "text/csv",
    });
    Object.defineProperty(fileInput.element, "files", {
      value: [testFile],
      writable: false,
    });
    await fileInput.trigger("change");

    const addButton = dialog.find("[data-tid=add-analysis-button]");
    expect(addButton.attributes("disabled")).toBeUndefined();
  });

  it("calls the upload function", async () => {
    const teleportContent = wrapper.findComponent(AlertDialogContent);
    const dialog = teleportContent.find('[role="alertdialog"]');
    const fileInput = dialog.find('input[type="file"]');

    const testFile = new File(["test-content"], "test.csv", {
      type: "text/csv",
    });
    Object.defineProperty(fileInput.element, "files", {
      value: [testFile],
      writable: false,
    });
    await fileInput.trigger("change");

    const addButton = dialog.find("[data-tid=add-analysis-button]");
    await addButton.trigger("click");

    expect(mockUploadFile).toHaveBeenCalledTimes(1);
    expect(mockUploadFile).toHaveBeenCalledWith(testFile);
  });
});

function wrap() {
  return mount(
    defineComponent({
      components: { AlertAddAnalysis },
      template: `
        <Suspense>
          <AlertAddAnalysis :modelValue="true" />
        </Suspense>
      `,
    }),
  );
}
