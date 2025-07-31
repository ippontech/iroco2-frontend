<script setup lang="ts">
import { CpuArchitectureTypeEnum } from "~/enum/CpuArchitectureType";

const cpuArchitectureType = Object.values(CpuArchitectureTypeEnum).map(
  (value) => ({
    label: value,
  }),
);

const model = defineModel<string>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="">Architecture processeur :</div>
    <Select v-model="model">
      <SelectTrigger>
        <SelectValue :placeholder="model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="archi in cpuArchitectureType"
            :key="archi.label"
            :value="archi.label"
          >
            {{ archi.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
