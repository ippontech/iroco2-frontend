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
  <nav class="flex p-4 items-center justify-end w-full text-sm">
    <div class="flex items-center gap-4">
      <NuxtLink
        :to="useRuntimeConfig().public.urlDocs"
        class="flex gap-2 items-center text-black/70 hover:bg-slate-200/50 px-2 py-2 rounded"
      >
        <Icon name="ph:article" />
        {{ $t("help.documentation") }}
      </NuxtLink>

      <div v-if="useRuntimeConfig().public.authActivate == 'false'">
        {{ $t("nav.demo") }}
      </div>
      <DropdownMenu v-else>
        <DropdownMenuTrigger class="flex items-center gap-2 group">
          <span class="font-medium group-hover:underline underline-offset-4">
            {{ user?.username }}
          </span>
          <div
            class="rounded-full w-10 h-10 bg-iroco-greenish-white text-black flex items-center justify-center font-bold p-0"
          >
            <Icon name="ph:user-fill" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem class="gap-2 cursor-pointer" @click="logout">
            <Icon name="ph:sign-out-bold" />
            {{ $t("auth.logout") }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useClerk } from "vue-clerk";

const { user, signOut } = useClerk();
const logout = async () => {
  await signOut({ redirectUrl: "/login" });
};
</script>
