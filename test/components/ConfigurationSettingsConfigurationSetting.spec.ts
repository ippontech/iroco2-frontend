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
import {
  ConfigurationSettingsAverageExecTime,
  ConfigurationSettingsConfigurationSetting,
  ConfigurationSettingsDailyRunningTime,
  ConfigurationSettingsDailyUsage,
  ConfigurationSettingsDaysOnPerMounth,
  ConfigurationSettingsInstanceNumber,
  ConfigurationSettingsInstanceType,
  ConfigurationSettingsMemory,
  ConfigurationSettingsMonthlyInvocation,
  ConfigurationSettingsProcessorArchitecture,
  ConfigurationSettingsStorage,
  ConfigurationSettingsVolumeNumber,
} from "#components";
import { mount } from "@vue/test-utils";
import type { ServiceConfigurationSetting } from "~/type/infrastructure/ServiceConfigurationSetting";

describe("ConfigurationSettingsConfigurationSetting component", () => {
  const configurationSettingsComponentTable = [
    ConfigurationSettingsInstanceNumber,
    ConfigurationSettingsStorage,
    ConfigurationSettingsDailyRunningTime,
    ConfigurationSettingsDailyUsage,
    ConfigurationSettingsDaysOnPerMounth,
    ConfigurationSettingsMonthlyInvocation,
    ConfigurationSettingsAverageExecTime,
    ConfigurationSettingsProcessorArchitecture,
    ConfigurationSettingsMemory,
    ConfigurationSettingsVolumeNumber,
  ];

  it.each`
    parameterName               | configurationSettingName      | configurationSettingComponent
    ${"instance number"}        | ${"INSTANCE_NUMBER"}          | ${ConfigurationSettingsInstanceNumber}
    ${"storage"}                | ${"STORAGE_IN_MEGA_BYTE"}     | ${ConfigurationSettingsStorage}
    ${"daily running time"}     | ${"DAILY_RUNNING_TIME_IN_MS"} | ${ConfigurationSettingsDailyRunningTime}
    ${"daily usage count"}      | ${"DAILY_USAGE_COUNT"}        | ${ConfigurationSettingsDailyUsage}
    ${"days on"}                | ${"DAYS_ON_PER_MONTH"}        | ${ConfigurationSettingsDaysOnPerMounth}
    ${"monthly invocation"}     | ${"MONTHLY_INVOCATION_COUNT"} | ${ConfigurationSettingsMonthlyInvocation}
    ${"average execution"}      | ${"AVERAGE_EXEC_TIME_IN_MS"}  | ${ConfigurationSettingsAverageExecTime}
    ${"processor architecture"} | ${"PROCESSOR_ARCHITECTURE"}   | ${ConfigurationSettingsProcessorArchitecture}
    ${"memory"}                 | ${"MEMORY_IN_MEGA_BYTE"}      | ${ConfigurationSettingsMemory}
    ${"volume number"}          | ${"VOLUME_NUMBER"}            | ${ConfigurationSettingsVolumeNumber}
  `(
    "only $parameterName parameter should be visible when configurationSetting is set to $configurationSettingName",
    async ({ configurationSettingName, configurationSettingComponent }) => {
      const setting: ServiceConfigurationSetting = {
        id: "id",
        defaultValue: "",
        configurationSetting: {
          id: "idConfigurationSetting",
          name: configurationSettingName,
        },
      };

      const wrapper = wrap(setting);

      const component = wrapper.findComponent(configurationSettingComponent);
      expect(component.exists()).toBe(true);

      for (const anyConfigurationSettingComponent of configurationSettingsComponentTable) {
        if (anyConfigurationSettingComponent != configurationSettingComponent) {
          const differentComponent = wrapper.findComponent(
            anyConfigurationSettingComponent,
          );
          expect(differentComponent.exists()).toBe(false);
        }
      }
    },
  );

  it("only 'instance type' parameter should be visible when configurationSetting is set to 'INSTANCE_TYPE'", async () => {
    mockNuxtImport("useNuxtApp", () => {
      return () => ({
        $api: {
          instanceType: {
            getAllInstanceByType: mockGetAllInstanceByType,
          },
        },
      });
    });

    const { EC2InstanceType } = vi.hoisted(() => ({
      EC2InstanceType: [{ name: "instance type" }],
    }));

    const { mockGetAllInstanceByType } = vi.hoisted(() => ({
      mockGetAllInstanceByType: vi.fn().mockResolvedValue(EC2InstanceType),
    }));

    const setting: ServiceConfigurationSetting = {
      id: "id",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "INSTANCE_TYPE",
      },
    };

    const wrapper = wrap(setting);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(true);

    for (const anyConfigurationSettingComponent of configurationSettingsComponentTable) {
      if (
        anyConfigurationSettingComponent != ConfigurationSettingsInstanceType
      ) {
        const differentComponent = wrapper.findComponent(
          anyConfigurationSettingComponent,
        );
        expect(differentComponent.exists()).toBe(false);
      }
    }
  });
});

function wrap(setting: ServiceConfigurationSetting) {
  return mount(ConfigurationSettingsConfigurationSetting, {
    props: {
      setting,
      modelValue: {
        id: "",
        value: "",
      },
    },
  });
}
