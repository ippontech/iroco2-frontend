<script setup lang="ts">
import { multiplyToString } from "./mappers";

const SECONDS_IN_HOUR = 3600000;

const seconds = defineModel<string>({ required: true });

const hours = ref(multiplyToString(seconds.value, 1 / SECONDS_IN_HOUR));

const handleValueChange = (newValue: number) => {
  seconds.value = multiplyToString(newValue, SECONDS_IN_HOUR);
};
</script>

<template>
  <div class="w-full">
    <SliderNumber
      label="Temps de fonctionnement journalier"
      :default-value="Number(hours)"
      :step="1"
      unit="heures"
      :min="0"
      :step-values="Array.from({ length: 25 }, (_, i) => i)"
      @update:selected-value="handleValueChange"
    />
  </div>
</template>
