<template>
  <SignIn
    :fallback-redirect-url="redirect"
    :appearance="{
      elements: {
        footerAction: { display: 'none' },
      },
    }"
  />
</template>

<script setup lang="ts">
import { SignIn } from "vue-clerk";

definePageMeta({
  layout: "auth",
});

const route = useRoute();
const redirect = (route.query.redirect_uri as string) || "/calculatrice";
</script>
