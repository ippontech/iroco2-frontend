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
