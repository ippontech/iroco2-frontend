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
import { flushPromises } from "@vue/test-utils";
import { mockNuxtImport, mountSuspended } from "@nuxt/test-utils/runtime";
import CreateComponent from "~/pages/calculatrice/infrastructure/[infrastructureID]/create-component.vue";

const {
  INFRASTRUCTURE_ID,
  SERVICE_ID,
  REGION,
  routeQuery,
  mockApi,
  mockNavigateTo,
} = vi.hoisted(() => {
  const region = {
    id: "22222222-2222-4222-8222-222222222222",
    name: "eu-west-3",
    csp: "11111111-1111-4111-8111-111111111111",
  };
  return {
    INFRASTRUCTURE_ID: "33333333-3333-4333-8333-333333333333",
    SERVICE_ID: "44444444-4444-4444-8444-444444444444",
    REGION: region,
    routeQuery: {} as Record<string, string>,
    mockNavigateTo: vi.fn(),
    mockApi: {
      componentApiClient: {
        getComponentsByInfrastructureId: vi.fn(),
        saveComponent: vi.fn(),
        updateComponent: vi.fn(),
      },
      awsDataCenter: {
        getAllAWSDataCenter: vi.fn(),
        getRegionByInfrastructureId: vi.fn(),
      },
      serviceConfigurationSettingApiClient: {
        findAllConfigurationSettingsByServiceId: vi.fn(),
      },
    },
  };
});

mockNuxtImport("navigateTo", () => mockNavigateTo);

mockNuxtImport("useRoute", () => () => ({
  params: { infrastructureID: INFRASTRUCTURE_ID },
  query: routeQuery,
}));

const EXISTING_COMPONENT = {
  id: "55555555-5555-4555-8555-555555555555",
  name: "My component",
  lastModificationDate: "2025-01-01",
  regionID: REGION.id,
  serviceID: SERVICE_ID,
  configurationValues: [],
};

describe("Create component page", () => {
  beforeAll(() => {
    useNuxtApp().provide("api", mockApi);
  });

  beforeEach(() => {
    Object.assign(routeQuery, {
      cloudServiceProviderServiceID: SERVICE_ID,
      serviceName: "EC2",
    });
    delete routeQuery.componentId;
    mockApi.componentApiClient.getComponentsByInfrastructureId.mockResolvedValue(
      [],
    );
    mockApi.awsDataCenter.getAllAWSDataCenter.mockResolvedValue([REGION]);
    mockApi.awsDataCenter.getRegionByInfrastructureId.mockResolvedValue(REGION);
    mockApi.serviceConfigurationSettingApiClient.findAllConfigurationSettingsByServiceId.mockResolvedValue(
      [],
    );
    mockApi.componentApiClient.saveComponent.mockResolvedValue(undefined);
    mockApi.componentApiClient.updateComponent.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should go back to the infrastructure when the component is saved", async () => {
    // given
    const wrapper = await mountSuspended(CreateComponent);

    // when
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    // then
    expect(mockApi.componentApiClient.saveComponent).toHaveBeenCalledTimes(1);
    expect(mockNavigateTo).toHaveBeenCalledWith(
      `/calculatrice/infrastructure/${INFRASTRUCTURE_ID}`,
    );
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });

  it.each([
    { statusCode: 400, expectedMessageKey: "apiErrors.badRequest" },
    { statusCode: 403, expectedMessageKey: "apiErrors.forbidden" },
    { statusCode: 404, expectedMessageKey: "apiErrors.notFound" },
    { statusCode: 500, expectedMessageKey: "apiErrors.unexpected" },
  ])(
    "should stay on the form and show $expectedMessageKey when saving fails with $statusCode",
    async ({ statusCode, expectedMessageKey }) => {
      // given
      mockApi.componentApiClient.saveComponent.mockRejectedValue(
        createError({
          statusCode,
          fatal: true,
        }),
      );
      const wrapper = await mountSuspended(CreateComponent);

      // when
      await wrapper.find("form").trigger("submit");
      await flushPromises();

      // then
      const alert = wrapper.find('[role="alert"]');
      expect(alert.exists()).toBe(true);
      expect(alert.text()).toContain(expectedMessageKey);
      expect(mockNavigateTo).not.toHaveBeenCalled();
    },
  );

  it("should show an error message when updating an existing component fails", async () => {
    // given
    mockApi.componentApiClient.getComponentsByInfrastructureId.mockResolvedValue(
      [EXISTING_COMPONENT],
    );
    routeQuery.componentId = EXISTING_COMPONENT.id;
    mockApi.componentApiClient.updateComponent.mockRejectedValue(
      createError({ statusCode: 404, fatal: true }),
    );
    const wrapper = await mountSuspended(CreateComponent);

    // when
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    // then
    expect(mockApi.componentApiClient.updateComponent).toHaveBeenCalledTimes(1);
    expect(wrapper.find('[role="alert"]').text()).toContain(
      "apiErrors.notFound",
    );
    expect(mockNavigateTo).not.toHaveBeenCalled();
  });

  it("should hide the previous error message when saving again succeeds", async () => {
    // given
    mockApi.componentApiClient.saveComponent.mockRejectedValueOnce(
      createError({ statusCode: 400, fatal: true }),
    );
    const wrapper = await mountSuspended(CreateComponent);
    await wrapper.find("form").trigger("submit");
    await flushPromises();
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);

    // when
    await wrapper.find("form").trigger("submit");
    await flushPromises();

    // then
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    expect(mockNavigateTo).toHaveBeenCalledTimes(1);
  });
});
