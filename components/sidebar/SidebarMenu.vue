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
  <aside
    class="flex flex-col bg-iroco-greenish-white items-start py-8 px-4 h-screen border-r border-r-slate"
  >
    <IroCOLogo variant="black" />

    <nav class="mt-12 flex flex-col w-full h-full">
      <span
        class="uppercase font-bold font-title text-sm text-iroco-greenish-white brightness-50 pb-2"
        >Dashboard</span
      >
      <SidebarItem
        to="/calculatrice"
        icon="ph:calculator"
        text="Calculatrice"
      />
      <SidebarItem to="/cur" icon="ph:chart-pie-slice" text="Analyse CUR" />
      <SidebarItem to="/scanner" icon="ph:chart-bar" text="Scanner" />
      <Separator class="my-4" />

      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0 translate-y-[30px]"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0 translate-y-[30px]"
      >
        <slot></slot>
      </Transition>
      <div class="mt-auto">
        <Separator class="my-4" />
        <SidebarItem
          to="/token"
          icon="ph:circles-four-duotone"
          text="Intégration Cloud"
        />
      </div>
    </nav>
  </aside>
</template>
