import type { Mock } from "vitest";
import ScanService from "./scanService";
import type { $Fetch } from "ofetch";
import type { ReportStatus } from "~/type/ReportStatus";

describe("scanService", () => {
  let scanService: ScanService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    scanService = new ScanService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("get all the scans", async () => {
    //Arrange
    const mockedScans = [
      {
        id: "4e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "CREATED" as ReportStatus,
        dateCreation: "2025-03-11T13:22:12.974826",
        co2Gr: 52,
      },
      {
        id: "5e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "SUCCESS" as ReportStatus,
        dateCreation: "2025-03-12T13:22:12.974826",
        co2Gr: 33,
      },
      {
        id: "6e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "IN_PROGRESS" as ReportStatus,
        dateCreation: "2025-03-13T13:22:12.974826",
        co2Gr: 62,
      },
    ];
    mockFetch.mockResolvedValue(mockedScans);
    const expected = [
      {
        id: "4e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "CREATED" as ReportStatus,
        dateCreation: "2025-03-11T13:22:12.974826",
        co2Gr: 52,
        co2Converted: {
          noUnitValue: 52,
          unit: "g",
        },
      },
      {
        id: "5e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "SUCCESS" as ReportStatus,
        dateCreation: "2025-03-12T13:22:12.974826",
        co2Gr: 33,
        co2Converted: {
          noUnitValue: 33,
          unit: "g",
        },
      },
      {
        id: "6e1359c7-0910-43ff-9ac4-777068c1bb49",
        status: "IN_PROGRESS" as ReportStatus,
        dateCreation: "2025-03-13T13:22:12.974826",
        co2Gr: 62,
        co2Converted: {
          noUnitValue: 62,
          unit: "g",
        },
      },
    ];

    //Act
    const result = await scanService.getAllScans();

    //Assert
    expect(result).toEqual(expected);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/scanner",
      expect.objectContaining({
        method: "GET",
      }),
    );
  });
});
