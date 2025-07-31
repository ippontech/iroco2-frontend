import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import { createPinia, setActivePinia } from "pinia";
import { useCloudServiceProviderStore } from "~/stores/cloud-service-provider.store";

const { cloudServiceProviders } = vi.hoisted(() => ({
  cloudServiceProviders: [
    { id: "1", name: "AWS" },
    { id: "2", name: "Azure" },
  ],
}));

const { mockGetCloudServiceProviders } = vi.hoisted(() => ({
  mockGetCloudServiceProviders: vi
    .fn()
    .mockResolvedValue(cloudServiceProviders),
}));

mockNuxtImport("useNuxtApp", () => {
  return () => ({
    $api: {
      cloudServiceProviderService: {
        getCloudServiceProviders: mockGetCloudServiceProviders,
      },
    },
  });
});

describe("Cloud service provider store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch cloud service providers", async () => {
    // Arrange
    const store = useCloudServiceProviderStore();

    // Act
    await store.fetchCloudServiceProviders();

    // Assert
    expect(mockGetCloudServiceProviders).toHaveBeenCalledTimes(1);
    expect(store.cloudServiceProviders).toEqual(cloudServiceProviders);
  });

  it("should get cloud service provider name by id", async () => {
    // Arrange
    const store = useCloudServiceProviderStore();
    store.cloudServiceProviders = cloudServiceProviders;

    // Act
    const cspName = await store.getCloudServiceProviderName("1");

    // Assert
    expect(cspName).toEqual("AWS");
  });

  it("should get cloud service provider id by name", async () => {
    // Arrange
    const store = useCloudServiceProviderStore();
    store.cloudServiceProviders = cloudServiceProviders;

    // Act
    const cspId = await store.getCloudServiceProviderID("Azure");

    // Assert
    expect(cspId).toEqual("2");
  });
});
