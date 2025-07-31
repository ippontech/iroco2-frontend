<script setup lang="ts">
import NuxtColors from "~/type/NuxtColors";

definePageMeta({
  middleware: ["auth"],
});

const notificationHandler = useToast();
const { $api } = useNuxtApp();

const clearCache = async () => {
  await $api.adminService.evictRegionCache().then(() =>
    notificationHandler.add({
      title: "Le cache des régions a été vidé.",
      color: NuxtColors.success,
    }),
  );
};
</script>

<template>
  <form class="background-container">
    <!-- Ellipse 1 -->
    <div class="background-svg" />
    <div class="main-content">
      <p class="text-3xl font-semibold text-center my-8">
        Supervision applicative
      </p>
      <p class="text-xl text-center text-balance px-8 my-8">
        Cette page offre aux administrateurs tout le nécéssaire pour gérer
        l'application (gestion du cache, maintenance, messages aux utilisateurs,
        ...).
      </p>
      <div
        class="container flex flex-col gap-12 mx-auto max-sm:w-full max-md:w-2/3"
      >
        <div
          class="flex justify-between gap-8 max-md:flex-col text-xs lg:text-sm"
        ></div>
        <div class="flex justify-between mb-20">
          <div
            class="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h5
              class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >
              Cache des régions
            </h5>
            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Ce cache permet d'avoir la liste des régions des CSP en mémoire.
            </p>
            <ul>
              <li><b>TTL : </b>6 heures</li>
              <li><b>Suppression programmée : </b>Aucune</li>
            </ul>

            <div class="inline-flex rounded-md shadow-sm mt-6" role="group">
              <button
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                @click="clearCache"
              >
                <svg
                  class="w-3 h-3 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                  />
                </svg>
                Vider le cache
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.background-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
}

.background-svg {
  position: absolute;
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/static/background_pricing.svg");
}

.main-content {
  position: relative;
  z-index: 1;
}
</style>
