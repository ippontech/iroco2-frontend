import type { $Fetch } from "ofetch";
import type { Mock } from "vitest";
import CatalogService from "./catalogService";
import type { ServiceCatalog } from "~/type/ServiceCatalog";
import { Availability } from "~/type/Availability";
import type { ServiceDescription } from "~/type/ServiceDescription";

describe("CatalogService", () => {
  let catalogService: CatalogService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    catalogService = new CatalogService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches all services and sort them by avaibility", async () => {
    // Arrange
    const serviceCatalog: ServiceCatalog[] = [
      {
        id: "service1",
        name: "Service 1",
        availability: Availability.AVAILABLE,
        description: "Service 1 description",
        shortname: "S1",
        limitations: [],
        levers: [],
      },
      {
        id: "service2",
        name: "Service 2",
        availability: Availability.UNAVAILABLE,
        description: "Service 2 description",
        shortname: "S2",
        limitations: [],
        levers: [],
      },
      {
        id: "service3",
        name: "Service 3",
        availability: Availability.PENDING,
        description: "Service 3 description",
        shortname: "S3",
        limitations: [],
        levers: [],
      },
    ];
    mockFetch.mockResolvedValue(serviceCatalog);
    const expectedSortedCatalog = [
      serviceCatalog[0],
      serviceCatalog[2],
      serviceCatalog[1],
    ];

    // Act
    const services = await catalogService.getAllServices();

    // Assert
    expect(services).toEqual(expectedSortedCatalog);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/public/v2/catalog/services",
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: undefined,
        params: undefined,
      }),
    );
  });

  it("get service description by ID", async () => {
    // Arrange
    const serviceId = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
    const serviceDescription: ServiceDescription = {
      id: serviceId,
      name: "Service 1",
      availability: Availability.AVAILABLE,
      description: "Service 1 description",
      shortname: "S1",
      limitations: [],
      levers: [],
      catalogVariableList: [
        {
          name: "Variable 1",
          description: "Variable 1 description",
          formula: "Variable 1 formula",
          catalogConstantList: [
            {
              name: "Constant 1",
              description: "Constant 1 description",
              unit: "Constant 1 unit",
              value: 1,
            },
          ],
        },
      ],
    };
    mockFetch.mockResolvedValue(serviceDescription);

    // Act
    const description = await catalogService.getById(serviceId);

    // Assert
    expect(description).toEqual(serviceDescription);
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/public/v2/catalog/services/${serviceId}`,
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: undefined,
        params: undefined,
      }),
    );
  });
});
