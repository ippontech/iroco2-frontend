<template>
  <div v-if="props.token" class="flex">
    <input
      class="p-2 border rounded-l-lg bg-white"
      :type="inputType"
      readonly
      :value="props.token"
    />
    <button
      type="button"
      class="border px-2 hover:bg-gray-200"
      @click="changeInputType"
    >
      <Icon class="w-5 h-5" name="ph:eye" />
    </button>
    <button
      type="button"
      class="border rounded-r-lg px-2 hover:bg-gray-200"
      @click="copyToken"
    >
      <Icon class="w-5 h-5" name="ph:clipboard" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  token: string;
}
const props = defineProps<Props>();

const inputType = ref("password");

const changeInputType = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
const copyToken = async () => {
  if (props.token) await navigator.clipboard.writeText(props.token);
};
</script>
