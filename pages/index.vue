/*
 * Copyright 2025 Ippon Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

<template>
  <header
    class="w-full min-h-[350px] h-[20vw] md:h-[40vw] 2xl:h-[35vw] bg-center-top flex justify-center bg-cover z-0"
  >
    <img
      src="assets/static/new_bg.svg"
      alt=""
      class="absolute min-h-[350px] h-[20vw] md:h-[40vw] 2xl:h-[35vw] w-screen opacity-50"
    />
    <div
      class="animate-fade flex mt-16 lg:mt-32 items-center relative flex-col gap-12"
    >
      <h1
        class="mt-8 px-12 text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl w-screen md:w-3/4 xl:w-2/3 text-center bg-gradient-to-b bg-clip-text text-transparent from-iroco-dark-green to-green-700 font-bold"
      >
        Maîtrisez les émissions CO2 de votre infrastructure cloud
      </h1>

      <div class="flex gap-4">
        <button
          class="flex items-center justify-between bg-green-700 text-white px-4 py-1 md:px-8 md:py-4 rounded-full font-bold text-xs md:text-lg"
        >
          <NuxtLink to="/calculatrice">Démarrez en quelques minutes </NuxtLink>
          <Icon name="ph:caret-right" class="w-6 h-6" />
        </button>

        <button
          class="flex items-center justify-between bg-iroco-light-green text-white px-4 py-2 md:px-8 md:py-4 rounded-full font-bold text-xs md:text-lg"
        >
          <NuxtLink to="/contact">Demander une démo</NuxtLink>
          <Icon name="ph:caret-right" class="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>

  <section
    class="bg-gradient-to-b from-iroco-greenish-white/50 to-muted mb-32 z-20 p-16"
  >
    <div class="flex flex-col mx-auto w-2/3 items-center gap-8 text-center">
      <h1 class="font-black font-title text-5xl">
        <span class="text-green-700">GreenOps</span> as a Service
      </h1>

      <p class="text-balance font-light leading-loose">
        IroCO2 vous <b>accompagne</b> dans la mise en place de votre
        <b>démarche GreenOps</b> End-to-End. <b>Mesurez</b> et
        <b>estimez</b> l'empreinte carbone de vos infrastructures Cloud. Gardez
        un œil sur vos infrastructures pour <b>comprendre</b> vos emissions.
        Profitez de <b>conseils</b> pour définir une <b>stratégie</b> de
        <b>maîtrise</b> de la tendance d'émission.
      </p>
    </div>
  </section>

  <section class="mt-[-50px] z-20 from-muted to-iroco-greenish-white/50 p-16">
    <div class="flex justify-between w-3/4 mx-auto">
      <div class="flex flex-col items-center gap-4 group">
        <div
          class="rounded-full bg-green-700 p-6 transition group-hover:scale-105"
        >
          <Icon name="ph:chart-bar" size="6rem" class="text-white" />
        </div>

        <h3 class="font-title text-2xl font-black">Mesurer</h3>
        <p class="max-w-48 text-center text-balance font-light text-sm">
          Ses émissions, partir d’un constat pour s’améliorer
        </p>
      </div>

      <div class="flex flex-col items-center gap-4 group">
        <div
          class="rounded-full bg-green-700 p-6 transition group-hover:scale-105"
        >
          <Icon name="ph:lightbulb" size="6rem" class="text-white" />
        </div>

        <h3 class="font-title text-2xl font-black">Comprendre</h3>
        <p class="max-w-48 text-center text-balance font-light text-sm">
          La nature de ses émissions et les leviers d’action
        </p>
      </div>

      <div class="flex flex-col items-center gap-4 group">
        <div
          class="rounded-full bg-green-700 p-6 transition group-hover:scale-105"
        >
          <Icon name="ph:target" size="6rem" class="text-white" />
        </div>
        <h3 class="font-title text-2xl font-black">Agir</h3>
        <p class="max-w-48 text-center text-balance font-light text-sm">
          En définissant et appliquant une stratégie GreenOps
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "public",
});
</script>
