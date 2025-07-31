<template>
  <div class="container">
    <div class="flex justify-between">
      <h1 class="font-title font-bold text-3xl">Vos comptes connectés :</h1>
      <Button variant="black" @click="openModal">+ Créer une clé </Button>
    </div>
    <AddTokenAlert v-model="addTokenModelOpened" />
  </div>
</template>

<script setup lang="ts">
import AddTokenAlert from "~/components/alert/AddTokenAlert.vue";

definePageMeta({
  middleware: ["auth"],
});

const addTokenModelOpened = ref(false);

const openModal = () => {
  addTokenModelOpened.value = true;
};
</script>
