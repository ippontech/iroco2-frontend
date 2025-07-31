<template>
  <div class="flex flex-col transition animate-in-[fade-out_0.2s_ease-in-out]">
    <span
      class="uppercase font-bold font-title text-sm text-iroco-greenish-white brightness-50 pb-2"
    >
      Infrastructure
    </span>
    <SidebarItem
      :to="`/calculatrice/infrastructure/${infraId}`"
      icon="ph:article-bold"
      text="Vue d'ensemble"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const route = useRoute();
const infraId = computed(() => route.params.infrastructureID);
</script>
