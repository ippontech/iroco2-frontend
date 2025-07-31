<script setup lang="ts">
import { Input } from "~/components/ui/input";

const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <span>Mémoire allouée :</span>
    <Input v-model="model" unit="Mo" />
  </div>
</template>
