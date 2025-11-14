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

import { InfrastructureDeleteAlert } from "#components";
import { AlertDialogContent } from "radix-vue";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";

let wrapper: VueWrapper;

const testInfrastructure: Infrastructure = {
  id: "infra-123",
  name: "Test Infrastructure",
  cloudServiceProvider: {
    id: "aws",
    name: "AWS",
  },
  defaultRegion: "eu-west-1",
  components: [],
};

describe("InfrastructureDeleteAlert Component", () => {
  beforeEach(() => {
    wrapper = mount(
      defineComponent({
        components: { InfrastructureDeleteAlert },
        template: `
          <Suspense>
            <InfrastructureDeleteAlert
              :open="true"
              :infrastructure="infrastructure"
            />
          </Suspense>
        `,
        data() {
          return {
            infrastructure: testInfrastructure,
          };
        },
      }),
    );
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("should render alert dialog when opened", () => {
    // given
    const teleportContent = wrapper.findComponent(AlertDialogContent);

    // when
    const dialog = teleportContent.find('[role="alertdialog"]');

    // then
    expect(teleportContent.exists()).toBe(true);
    expect(dialog.exists()).toBe(true);
  });

  it("should display cancel button when dialog is opened", () => {
    // given
    const teleportContent = wrapper.findComponent(AlertDialogContent);
    const dialog = teleportContent.find('[role="alertdialog"]');

    // when
    const buttons = dialog.findAll("button");
    const cancelButton = buttons.find((btn) =>
      btn.text().includes("buttons.cancel"),
    );

    // then
    expect(cancelButton).toBeDefined();
  });

  it("should display delete action button when dialog is opened", () => {
    // given
    const teleportContent = wrapper.findComponent(AlertDialogContent);
    const dialog = teleportContent.find('[role="alertdialog"]');

    // when
    const buttons = dialog.findAll("button");
    const deleteButton = buttons.find((btn) =>
      btn.text().includes("infrastructure.alertDeleteAction"),
    );

    // then
    expect(deleteButton).toBeDefined();
  });
});
