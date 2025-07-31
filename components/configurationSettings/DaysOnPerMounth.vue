<script setup lang="ts">
const model = defineModel<string>({ required: true });

const updateValue = (newValue: number) => {
  model.value = newValue.toString();
};
</script>

<template>
  <SliderNumber
    label="Nombre de jours par mois"
    class="w-full"
    :default-value="Number(model)"
    :step="1"
    unit="jours"
    :min="0"
    :step-values="Array.from({ length: 32 }, (_, i) => i)"
    @update:selected-value="updateValue"
  />
</template>
