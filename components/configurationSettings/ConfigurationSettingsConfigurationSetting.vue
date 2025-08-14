<!-- prettier-ignore -->
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

<script setup lang="ts">
import type { ServiceConfigurationSetting } from "~/type/infrastructure/ServiceConfigurationSetting";
import type { ConfiguredValue } from "~/type/infrastructure/ConfiguredValue";

interface Props {
  setting: ServiceConfigurationSetting;
}
defineProps<Props>();

const model = defineModel<ConfiguredValue>({ required: true });
</script>

<template>
  <div v-if="setting.configurationSetting.name === 'INSTANCE_NUMBER'">
    <ConfigurationSettingsInstanceNumber v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'INSTANCE_TYPE'">
    <ConfigurationSettingsInstanceType v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'STORAGE_IN_MEGA_BYTE'">
    <ConfigurationSettingsStorage v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'DAILY_RUNNING_TIME_IN_MS'">
    <ConfigurationSettingsDailyRunningTime v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'DAILY_USAGE_COUNT'">
    <ConfigurationSettingsDailyUsage v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'DAYS_ON_PER_MONTH'">
    <ConfigurationSettingsDaysOnPerMounth v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'MONTHLY_INVOCATION_COUNT'">
    <ConfigurationSettingsMonthlyInvocation v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'AVERAGE_EXEC_TIME_IN_MS'">
    <ConfigurationSettingsAverageExecTime v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'PROCESSOR_ARCHITECTURE'">
    <ConfigurationSettingsProcessorArchitecture v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'MEMORY_IN_MEGA_BYTE'">
    <ConfigurationSettingsMemory v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'VOLUME_NUMBER'">
    <ConfigurationSettingsVolumeNumber v-model="model.value" />
  </div>
</template>
