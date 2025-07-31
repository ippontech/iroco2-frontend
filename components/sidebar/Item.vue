<template>
  <NuxtLink
    :to="to"
    class="flex gap-4 items-center rounded-sm py-2 px-4 text-sm"
    active-class="bg-iroco-greenish-white brightness-90"
  >
    <Icon :name="icon" />
    <span>{{ text }}</span>
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{
  to: string;
  icon: string;
  text: string;
}>();
</script>
