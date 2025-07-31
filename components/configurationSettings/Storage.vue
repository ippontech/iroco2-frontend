<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { multiplyToString } from "./mappers";

const GB_IN_MB = 1024;

const model = defineModel<string>({ required: true });

const storage = ref(multiplyToString(model.value, 1 / GB_IN_MB));

const handleValueChange = () => {
  model.value = multiplyToString(storage.value, GB_IN_MB);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <span>Stockage :</span>
    <Input
      v-model="storage"
      unit="Go"
      @update:model-value="handleValueChange"
    />
  </div>
</template>
