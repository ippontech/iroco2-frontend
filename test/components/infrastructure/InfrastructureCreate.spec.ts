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
import type { VueWrapper } from "@vue/test-utils";
import { flushPromises } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import { InfrastructureCreate, RecapRegionSelector } from "#components";
import { DialogContent, DialogRoot } from "radix-vue";

const { REGION, mockApi } = vi.hoisted(() => ({
  REGION: {
    id: "22222222-2222-4222-8222-222222222222",
    name: "eu-west-3",
    csp: "11111111-1111-4111-8111-111111111111",
  },
  mockApi: {
    awsDataCenter: {
      getAllAWSDataCenter: vi.fn(),
    },
    infrastructureApiClient: {
      createNewInfra: vi.fn(),
      getInfrastructures: vi.fn(),
    },
  },
}));

mockNuxtImport("useI18n", () => () => ({ t: (key: string) => key }));

const openDialogAndSubmit = async (wrapper: VueWrapper) => {
  await wrapper.find("button").trigger("click");
  await vi.waitFor(() =>
    expect(
      wrapper
        .findComponent(DialogContent)
        .findComponent(RecapRegionSelector)
        .exists(),
    ).toBe(true),
  );
  const dialog = wrapper.findComponent(DialogContent);
  await dialog.find("input").setValue("My infrastructure");
  dialog.findComponent(RecapRegionSelector).vm.$emit("update:region", REGION);
  await dialog.find("form").trigger("submit");
  await vi.waitFor(() =>
    expect(mockApi.infrastructureApiClient.createNewInfra).toHaveBeenCalled(),
  );
  await flushPromises();
  return dialog;
};

describe("InfrastructureCreate component", () => {
  beforeAll(() => {
    useNuxtApp().provide("api", mockApi);
  });

  beforeEach(() => {
    mockApi.awsDataCenter.getAllAWSDataCenter.mockResolvedValue([REGION]);
    mockApi.infrastructureApiClient.createNewInfra.mockResolvedValue({});
    mockApi.infrastructureApiClient.getInfrastructures.mockResolvedValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should refresh the infrastructures and notify the parent when the infrastructure is created", async () => {
    // given
    const wrapper = await mountSuspended(InfrastructureCreate);

    // when
    await openDialogAndSubmit(wrapper);

    // then
    expect(mockApi.infrastructureApiClient.createNewInfra).toHaveBeenCalledWith(
      {
        cloudServiceProvider: REGION.csp,
        defaultRegion: REGION.id,
        name: "My infrastructure",
      },
    );
    expect(
      mockApi.infrastructureApiClient.getInfrastructures,
    ).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted("infraCreated")).toHaveLength(1);
  });

  it.each([
    { statusCode: 400, expectedMessageKey: "apiErrors.badRequest" },
    { statusCode: 403, expectedMessageKey: "apiErrors.forbidden" },
    { statusCode: 404, expectedMessageKey: "apiErrors.notFound" },
    { statusCode: 503, expectedMessageKey: "apiErrors.unexpected" },
  ])(
    "should show $expectedMessageKey when the creation fails with $statusCode",
    async ({ statusCode, expectedMessageKey }) => {
      // given
      mockApi.infrastructureApiClient.createNewInfra.mockRejectedValue(
        createError({
          statusCode,
          fatal: true,
        }),
      );
      const wrapper = await mountSuspended(InfrastructureCreate);

      // when
      const dialog = await openDialogAndSubmit(wrapper);

      // then
      const alert = dialog.find('[role="alert"]');
      expect(alert.exists()).toBe(true);
      expect(alert.text()).toContain(expectedMessageKey);
      expect(wrapper.emitted("infraCreated")).toBeUndefined();
      expect(
        mockApi.infrastructureApiClient.getInfrastructures,
      ).not.toHaveBeenCalled();
    },
  );

  it("should not show the previous error when the dialog is reopened", async () => {
    // given
    mockApi.infrastructureApiClient.createNewInfra.mockRejectedValue(
      createError({
        statusCode: 400,
        fatal: true,
      }),
    );
    const wrapper = await mountSuspended(InfrastructureCreate);
    const dialog = await openDialogAndSubmit(wrapper);
    expect(dialog.find('[role="alert"]').exists()).toBe(true);

    // when
    const closeButton = dialog
      .findAll("button")
      .find((button) => button.text() === "Close");
    await closeButton!.trigger("click");
    await vi.waitFor(() =>
      expect(wrapper.findComponent(DialogRoot).props("open")).toBe(false),
    );
    await wrapper.find("button").trigger("click");
    await vi.waitFor(() =>
      expect(wrapper.findComponent(DialogRoot).props("open")).toBe(true),
    );

    // then
    expect(
      wrapper.findComponent(DialogContent).find('[role="alert"]').exists(),
    ).toBe(false);
  });
});
