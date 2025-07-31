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
export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;
  const { $api } = useNuxtApp();

  const route = useRoute();
  const infrastructureId: string = route.params.infrastructureID as string;

  const infrastructure =
    await $api.infrastructureService.getInfrastructure(infrastructureId);
  if (infrastructure === null || infrastructure === undefined) {
    return navigateTo("/accueil");
  }
});
