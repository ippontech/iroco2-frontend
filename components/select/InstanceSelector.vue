<template>
  <Selector
    placeholder="instance"
    :values="props.instanceTypes"
    :default-selected-value="selectedInstance"
    @update:value="handleSelect"
  />
</template>

<script setup lang="ts">
import Selector from "~/components/recap/Selector.vue";

const emits = defineEmits(["update:instance"]);

const props = defineProps<{
  instanceTypes: string[];
}>();

const selectedInstance = defineModel<string | undefined>({
  required: true,
});

const handleSelect = (instance: string) => {
  selectedInstance.value = instance;
  emits("update:instance", instance);
};
</script>
