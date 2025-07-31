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
export { default as Carousel } from "./Carousel.vue";
export { default as CarouselContent } from "./CarouselContent.vue";
export { default as CarouselItem } from "./CarouselItem.vue";
export { default as CarouselPrevious } from "./CarouselPrevious.vue";
export { default as CarouselNext } from "./CarouselNext.vue";
export { useCarousel } from "./useCarousel";

export type { EmblaCarouselType as CarouselApi } from "embla-carousel";
