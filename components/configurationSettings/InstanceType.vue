<script setup lang="ts">
import InstanceSelector from "~/components/select/InstanceSelector.vue";
import { ref, type Ref } from "vue";

const { $api } = useNuxtApp();

const instanceTypes: Ref<string[]> = ref([]);
const isInstanceEmpty = ref(false);

$api.instanceType.getAllInstanceByType("EC2").then((responses) => {
  instanceTypes.value = responses.map((response) => response.name);
});

const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="">Type d'instance :</div>
    <span v-if="isInstanceEmpty" class="text-red-500 text-sm font-bold"
      >Veuillez sélectionner une instance</span
    >
    <InstanceSelector
      v-model="model"
      :instance-types="instanceTypes"
      :class="{ 'border border-red-500': isInstanceEmpty }"
    />
  </div>
</template>
