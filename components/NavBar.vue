<!-- prettier-ignore -->
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
  <nav class="bg-iroco-dark-green sticky top-0 p-1 h-16 flex items-center">
    <div
      class="w-full mx-auto flex items-center justify-between text-iroco-white"
      :class="{ 'blur-md': isLoginPage }"
    >
      <IroCOLogo />

      <div class="flex items-center gap-4 max-md:gap-0">
        <UDropdown :items="ressources" :popper="{ placement: 'bottom-start' }">
          <Button class="max-md:px-1" variant="ghost">
            <span>Ressources</span>
            <UIcon name="i-heroicons-chevron-down-20-solid" />
          </Button>

          <template #item="{ item }">
            <nuxt-link
              class="w-full h-full text-black flex justify-flex"
              :to="item.link"
            >
              {{ item.label }}
            </nuxt-link>
          </template>
        </UDropdown>
      </div>

      <div
        v-if="useRuntimeConfig().public.authActivate == 'false'"
        class="flex items-center justify-end"
      >
        <NuxtLink to="/calculatrice">
          <Button variant="link" class="text-white">Dashboard Demo</Button>
        </NuxtLink>
      </div>
      <div v-else>
        <SignedOut>
          <SignInButton>
            <NuxtLink
              to="/login"
              class="text-white transition-all hover:outline rounded-full px-4 py-2"
            >
              Connexion
            </NuxtLink>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div class="flex items-center justify-end">
            <NuxtLink to="/calculatrice">
              <Button variant="link" class="text-white">Dashboard</Button>
            </NuxtLink>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div
                  class="rounded-full w-10 h-10 bg-iroco-greenish-white text-black flex items-center justify-center font-bold p-0"
                >
                  <Icon name="ph:user-fill" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem class="gap-2" @click="logout">
                  <Icon name="ph:sign-out-bold" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SignedIn>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { SignedIn, SignedOut, SignInButton, useClerk } from "vue-clerk";
import IroCOLogo from "~/components/IroCOLogo.vue";

const route = useRoute();
const isLoginPage = computed(() => route.path === "/login");

const ressources = [
  [
    {
      label: "Documentation",
      link: useRuntimeConfig().public.urlDocs,
    },
    {
      label: "Catalogue",
      link: "/catalog",
    },
  ],
];

const clerk = useClerk();

const logout = async () => {
  await clerk.signOut({ redirectUrl: "/login" });
};
</script>
