import type { $Fetch } from "ofetch";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import type { Mock } from "vitest";
import CloudServiceProviderSvc from "./CloudServiceProviderSvc";
import type { CloudServiceProvider } from "~/type/infrastructure/CloudServiceProvider";
import type { CloudServiceProviderService } from "~/type/infrastructure/CloudServiceProviderService";

const AWS_UUID = vi.hoisted(() => "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

const { mockGetCloudServiceProviderID } = vi.hoisted(() => ({
  mockGetCloudServiceProviderID: vi.fn().mockResolvedValue(AWS_UUID),
}));

mockNuxtImport("useCloudServiceProviderStore", () => {
  return () => ({
    getCloudServiceProviderID: mockGetCloudServiceProviderID,
  });
});

describe("CloudServiceProviderService", () => {
  let cloudServiceProviderService: CloudServiceProviderSvc;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    cloudServiceProviderService = new CloudServiceProviderSvc(
      mockFetch as unknown as $Fetch,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches all AWS data centers", async () => {
    // Arrange
    const cloudServiceProviders: CloudServiceProvider[] = [
      {
        id: AWS_UUID,
        name: "AWS",
      },
    ];
    mockFetch.mockResolvedValue(cloudServiceProviders);

    // Act
    const result = await cloudServiceProviderService.getCloudServiceProviders();

    // Assert
    expect(result).toEqual(cloudServiceProviders);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/cloud-service-providers",
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: undefined,
        params: undefined,
      }),
    );
  });

  it("fetches the services from cloud service provider", async () => {
    // Arrange
    const services: CloudServiceProviderService[] = [
      {
        id: "EC2 Id",
        name: "EC2",
        description: "EC2 Description",
        shortname: "EC2",
      },
    ];
    mockFetch.mockResolvedValue(services);

    // Act
    const result =
      await cloudServiceProviderService.getCloudServiceProviderServices();

    // Assert
    expect(result).toEqual(services);
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/cloud-service-providers/${AWS_UUID}/services`,
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: undefined,
        params: undefined,
      }),
    );
    expect(mockGetCloudServiceProviderID).toHaveBeenCalledWith("AWS");
  });
});
