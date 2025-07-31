import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import Catalog from "~/pages/catalog/index.vue";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { catalogResponse } from "./mockResponse";

let wrapper: VueWrapper;

const { mockGetAllService } = vi.hoisted(() => ({
  mockGetAllService: vi.fn(),
}));

describe("Catalog page", async () => {
  beforeEach(() => {
    mockNuxtImport("useNuxtApp", () => {
      return () => ({
        $api: {
          catalogService: {
            getAllServices:
              mockGetAllService.mockResolvedValue(catalogResponse),
          },
        },
      });
    });

    wrap();
  });

  afterEach(() => {
    mockGetAllService.mockClear();
  });

  it("should render", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should call catalog api once", async () => {
    expect(mockGetAllService).toHaveBeenCalledTimes(1);
  });
});

function wrap() {
  wrapper = mount(
    defineComponent({
      components: { Catalog },
      template: `
        <Suspense>
        <Catalog/>
        </Suspense>`,
    }),
  );
}
