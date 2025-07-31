<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
const { $router } = useNuxtApp();
const redirectToRoot = () => {
  $router.push("/");
};
definePageMeta({
  isPrivate: false,
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-full h-auto sm:w-1/2 lg:w-1/4 text-center">
      <img src="~/assets/static/error-logo-1.png" alt="Logo" />
      <p class="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">Ooops !</p>
      <p class="mt-4 text-xs sm:text-sm md:text-base">
        <span v-if="!props.error?.data" class="font-bold">{{
          props.error?.statusCode
        }}</span>
        <span v-if="!props.error?.data"> - </span>
        {{ props.error?.message }}
      </p>
      <Button variant="black" class="mt-12" @click="redirectToRoot()"
        >Retourner sur Iroco<sub class="text-xs">2</sub></Button
      >
    </div>
  </div>
</template>
