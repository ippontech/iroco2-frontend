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
  <div>
    <div>{{ label }} :</div>
    <div class="flex items-center gap-2">
      <input
        ref="sliderIndex"
        v-model="internalSliderValue"
        type="range"
        :min="0"
        :max="stepValues.length - 1"
        :step="1"
        class="accent-black h-1/2 w-full"
        @input="handleSliderChange"
      />

      <Input
        ref="inputValue"
        v-model="internalEffectiveValue"
        type="number"
        class="w-1/3"
        :min="min"
        :step="step"
        :unit="unit"
        @change="handleInputChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  stepValues: number[];
  min: number;
  step: number;
  defaultValue: number;
  unit: string;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:selectedValue"]);

const internalEffectiveValue = ref<number>(props.defaultValue);
const internalSliderValue = ref<number>(0);
const sliderIndex = ref();
const inputValue = ref();

const handleSliderChange = () => {
  internalEffectiveValue.value = props.stepValues[sliderIndex.value.value];
  emits("update:selectedValue", internalEffectiveValue.value);
};

const handleInputChange = () => {
  const newIndex = props.stepValues.indexOf(inputValue.value.value);
  if (newIndex >= 0) {
    internalSliderValue.value = newIndex;
  }
  emits("update:selectedValue", internalEffectiveValue.value);
};

onMounted(() => {
  internalEffectiveValue.value = props.defaultValue;
  sliderIndex.value.value = props.stepValues.indexOf(props.defaultValue);
});
</script>
