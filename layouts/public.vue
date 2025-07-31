<template>
  <NavBar class="z-10" />
  <main class="min-h-screen">
    <NuxtPage />
  </main>
  <footer class="h-48 w-full bg-iroco-dark-green text-white grid items-center">
    <div class="container flex py-4">
      <IroCOLogo />
    </div>
  </footer>
</template>
<script setup lang="ts">
import NavBar from "~/components/navbar/NavBar.vue";
</script>
