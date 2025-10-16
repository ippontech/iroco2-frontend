# CONTRIBUTING GUIDE

**Please refer to the [principal repository](https://github.com/ippontech/iroco2/blob/main/contribute/CONTRIBUTING.md) for any contribution information about the project.**

## Vue Components

### Composition API
Iroco2's components must be created using the Composition API with the `<script setup>` syntax as described in the official documentation (https://vuejs.org/api/sfc-script-setup.html)

```vue
<template>
  <select @change="handleSelect($event.target.value)">
    <option value="" disabled>Select an option</option>
    <option v-for="value in possibleValues" :key="value" :value="value">
      {{ value }}
    </option>
  </select>
</template>

<script setup lang="ts">
  const emits = defineEmits(["update:value"]);

  const props = defineProps<{
    possibleValues: string[];
  }>();

  const handleSelect = (value: string) => {
    emits("update:value", value);
  };
</script>
```

### Testing
Iroco2's frontend aims to have an 80% test coverage. Components must be tested using Vue Test-utils (https://test-utils.vuejs.org/) along with Vitest.


```ts
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { PetAdoptionForm } from "#components";
import { NotificationService } from "#services";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";

let wrapper: VueWrapper;

// Mocked service method
const { mockSendAdoptionRequest } = vi.hoisted(() => ({
	mockSendAdoptionRequest: vi.fn().mockResolvedValue({
		success: true,
		petId: 'dog-123',
	}),
}));

describe("PetAdoptionForm Component", () => {
	beforeEach(() => {
		mockNuxtImport("useNuxtApp", () => {
			return () => ({
				$api: {
					petService: {
						sendAdoptionRequest: mockSendAdoptionRequest,
					},
				},
			});
		});

		wrapper = mount(
			defineComponent({
				components: { PetAdoptionForm },
				template: `<PetAdoptionForm petId="dog-123" />`,
			}),
		);
	});

	afterEach(() => {
		mockSendAdoptionRequest.mockClear();
	});

	it("should submit adoption request when form is filled and submitted", async () => {
		const nameInput = wrapper.find('input[data-tid="adopter-name"]');
		const emailInput = wrapper.find('input[data-tid="adopter-email"]');
		const submitButton = wrapper.find('button[data-tid="submit-adoption"]');

		// given
		await nameInput.setValue("Jane Doe");
		await emailInput.setValue("jane@example.com");

		// when
		await submitButton.trigger('click');

		// then
		expect(mockSendAdoptionRequest).toHaveBeenCalledTimes(1);
		expect(mockSendAdoptionRequest).toHaveBeenCalledWith({
			petId: 'dog-123',
			adopterName: 'Jane Doe',
			adopterEmail: 'jane@example.com'
		});
	});
});

```