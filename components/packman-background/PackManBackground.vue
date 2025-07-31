<!-- CustomCard.vue -->
<script setup lang="ts">
import type { HTMLAttributes } from "vue";

interface Props {
  class?: HTMLAttributes["class"];
}
const props = defineProps<Props>();
</script>

<template>
  <div class="image">
    <div :class="`h-full w-full ${props.class}`">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.image {
  position: relative;
  height: 30vh;
}
.image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 30px;
  background-repeat: repeat;
  background-image: url("@/assets/static/pacman.png");
  opacity: 0.1;
}
</style>
