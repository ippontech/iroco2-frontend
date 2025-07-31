<template>
  <nuxt-link to="/" class="flex items-center">
    <img
      src="../assets/static/no_bg_iroco.png"
      alt="Logo"
      class="h-12 mr-2 m-0 p-0 gap-0 flex-auto"
      :class="variant === 'black' ? 'invert' : ''"
    />
    <div class="grid">
      <div class="flex items-center">
        <span class="text-2xl font-bold">IroCO</span>
        <span class="text-xl font-bold align-sub pt-2">2&nbsp;</span>
      </div>
      <span class="mt-[-0.5rem] font-extralight text-sm">by Ippon</span>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: "black" | "white" }>(), {
  variant: "white",
});
</script>
