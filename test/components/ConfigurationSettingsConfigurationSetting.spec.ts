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
  it("only instance number parameter should be visible when configurationSetting set to INSTANCE_NUMBER", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id001",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "INSTANCE_NUMBER",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(true);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only instance type parameter should be visible when configurationSetting is set to INSTANCE_TYPE", async () => {
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
      id: "id002",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "INSTANCE_TYPE",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(true);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only storage parameter should be visible when configurationSetting is set to STORAGE_IN_MEGA_BYTE", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id003",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "STORAGE_IN_MEGA_BYTE",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(true);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only daily running time parameter should be visible when configurationSetting is set to DAILY_RUNNING_TIME_IN_MS", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id004",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "DAILY_RUNNING_TIME_IN_MS",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(true);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only daily usage time parameter should be visible when configurationSetting is set to DAILY_USAGE_COUNT", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id005",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "DAILY_USAGE_COUNT",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(true);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only days on parameter should be visible when configurationSetting is set to DAYS_ON_PER_MONTH", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id006",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "DAYS_ON_PER_MONTH",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(true);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only monthly invocation parameter should be visible when configurationSetting is set to MONTHLY_INVOCATION_COUNT", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id007",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "MONTHLY_INVOCATION_COUNT",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(true);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only average execution parameter should be visible when configurationSetting is set to AVERAGE_EXEC_TIME_IN_MS", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id008",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "AVERAGE_EXEC_TIME_IN_MS",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(true);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only processor architecture parameter should be visible when configurationSetting is set to PROCESSOR_ARCHITECTURE", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id009",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "PROCESSOR_ARCHITECTURE",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(true);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only memory parameter should be visible when configurationSetting is set to MEMORY_IN_MEGA_BYTE", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id010",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "MEMORY_IN_MEGA_BYTE",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(true);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(false);
  });

  it("only volume number parameter should be visible when configurationSetting is set to VOLUME_NUMBER", async () => {
    const setting: ServiceConfigurationSetting = {
      id: "id011",
      defaultValue: "",
      configurationSetting: {
        id: "idConfigurationSetting",
        name: "VOLUME_NUMBER",
      },
    };

    const wrapper = wrap(setting);

    const instanceNumber = wrapper.findComponent(
      ConfigurationSettingsInstanceNumber,
    );
    expect(instanceNumber.exists()).toBe(false);

    const instanceType = wrapper.findComponent(
      ConfigurationSettingsInstanceType,
    );
    expect(instanceType.exists()).toBe(false);

    const storage = wrapper.findComponent(ConfigurationSettingsStorage);
    expect(storage.exists()).toBe(false);

    const runningTime = wrapper.findComponent(
      ConfigurationSettingsDailyRunningTime,
    );
    expect(runningTime.exists()).toBe(false);

    const usage = wrapper.findComponent(ConfigurationSettingsDailyUsage);
    expect(usage.exists()).toBe(false);

    const daysOn = wrapper.findComponent(ConfigurationSettingsDaysOnPerMounth);
    expect(daysOn.exists()).toBe(false);

    const monthlyInvocation = wrapper.findComponent(
      ConfigurationSettingsMonthlyInvocation,
    );
    expect(monthlyInvocation.exists()).toBe(false);

    const averageExecutionTime = wrapper.findComponent(
      ConfigurationSettingsAverageExecTime,
    );
    expect(averageExecutionTime.exists()).toBe(false);

    const processorArchitecture = wrapper.findComponent(
      ConfigurationSettingsProcessorArchitecture,
    );
    expect(processorArchitecture.exists()).toBe(false);

    const memory = wrapper.findComponent(ConfigurationSettingsMemory);
    expect(memory.exists()).toBe(false);

    const volumeNumber = wrapper.findComponent(
      ConfigurationSettingsVolumeNumber,
    );
    expect(volumeNumber.exists()).toBe(true);
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
