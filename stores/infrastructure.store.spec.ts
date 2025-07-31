import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";

const { infrastructures } = vi.hoisted(() => ({
  infrastructures: [
    {
      id: "1",
      name: "mon infrastructure",
      cloudServiceProvider: { id: "1", name: "AWS" },
      defaultRegion: "eu-west-3",
      components: [],
    },
    {
      id: "2",
      name: "mon infrastructure 2",
      cloudServiceProvider: { id: "2", name: "Azure" },
      defaultRegion: "eu-west-3",
      components: [],
    },
  ],
}));

const { mockGetInfrastructures } = vi.hoisted(() => ({
  mockGetInfrastructures: vi.fn().mockResolvedValue(infrastructures),
}));

mockNuxtImport("useNuxtApp", () => {
  return () => ({
    $api: {
      infrastructureService: {
        getInfrastructures: mockGetInfrastructures,
      },
    },
  });
});

describe("Infrastructure store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch infrastructure", async () => {
    // Arrange
    const store = useInfrastructuresStore();

    // Act
    await store.fetchInfrastructures();

    // Assert
    expect(mockGetInfrastructures).toHaveBeenCalledTimes(1);
    expect(store.infrastructures).toEqual(infrastructures);
  });
});
