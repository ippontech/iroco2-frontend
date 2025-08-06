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
import InstanceNumber from "~/components/configurationSettings/InstanceNumber.vue";
import InstanceType from "~/components/configurationSettings/InstanceType.vue";
import Storage from "~/components/configurationSettings/Storage.vue";
import DailyRunningTime from "~/components/configurationSettings/DailyRunningTime.vue";
import DailyUsage from "~/components/configurationSettings/DailyUsage.vue";
import DaysOnPerMounth from "~/components/configurationSettings/DaysOnPerMounth.vue";
import type { ConfiguredValue } from "~/type/infrastructure/ConfiguredValue";
import MonthlyInvocation from "~/components/configurationSettings/MonthlyInvocation.vue";
import AverageExecTime from "~/components/configurationSettings/AverageExecTime.vue";
import ProcessorArchitecture from "~/components/configurationSettings/ProcessorArchitecture.vue";
import Memory from "~/components/configurationSettings/Memory.vue";
import VolumeNumber from "~/components/configurationSettings/VolumeNumber.vue";

interface Props {
  setting: ServiceConfigurationSetting;
}
defineProps<Props>();

const model = defineModel<ConfiguredValue>({ required: true });
</script>

<template>
  <div v-if="setting.configurationSetting.name === 'INSTANCE_NUMBER'">
    <InstanceNumber v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'INSTANCE_TYPE'">
    <InstanceType v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'STORAGE_IN_MEGA_BYTE'">
    <Storage v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'DAILY_RUNNING_TIME_IN_MS'">
    <DailyRunningTime v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'DAILY_USAGE_COUNT'">
    <DailyUsage v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'DAYS_ON_PER_MONTH'">
    <DaysOnPerMounth v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'MONTHLY_INVOCATION_COUNT'">
    <MonthlyInvocation v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'AVERAGE_EXEC_TIME_IN_MS'">
    <AverageExecTime v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'PROCESSOR_ARCHITECTURE'">
    <ProcessorArchitecture v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'MEMORY_IN_MEGA_BYTE'">
    <Memory v-model="model.value" />
  </div>
  <div v-if="setting.configurationSetting.name === 'VOLUME_NUMBER'">
    <VolumeNumber v-model="model.value" />
  </div>
</template>
