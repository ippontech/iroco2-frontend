<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  unit?: string;
  type?: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <div
    class="flex items-center gap-2 w-full h-10 rounded-md overflow-hidden border border-input bg-background pl-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  >
    <input
      v-model="modelValue"
      :type="props.type"
      :class="
        cn(
          'flex-grow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none',
          props.class,
        )
      "
    />
    <span
      v-if="unit"
      class="bg-muted min-w-12 h-10 inline-flex items-center justify-center border-l"
      >{{ unit }}</span
    >
  </div>
</template>
