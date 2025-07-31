import CustomCard from "~/components/card/CustomCard.vue";
import { it, expect, describe } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";

describe("<CustomCard>", async () => {
  const childrenBody = "Composant enfant";

  it("shoud render children", async () => {
    const component = await mountSuspended(CustomCard, {
      slots: { default: () => childrenBody },
    });

    expect(component.text()).toMatch(childrenBody);
  });
});
