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

<script setup lang="ts">
import { useProvideCarousel } from "./useCarousel";
import type {
  CarouselEmits,
  CarouselProps,
  WithClassAsProps,
} from "./interface";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
  orientation: "horizontal",
});

const emits = defineEmits<CarouselEmits>();

const carouselArgs = useProvideCarousel(props, emits);

defineExpose(carouselArgs);

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
  const nextKey = props.orientation === "vertical" ? "ArrowDown" : "ArrowRight";

  if (event.key === prevKey) {
    event.preventDefault();
    carouselArgs.scrollPrev();

    return;
  }

  if (event.key === nextKey) {
    event.preventDefault();
    carouselArgs.scrollNext();
  }
}
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    @keydown="onKeyDown"
  >
    <slot v-bind="carouselArgs" />
  </div>
</template>
