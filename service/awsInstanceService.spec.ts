import type { $Fetch } from "ofetch";
import type { Mock } from "vitest";
import AWSInstanceService from "./awsInstanceService";
import type { EC2InstanceType } from "~/type/ec2InstanceType";

describe("AWSInstanceService", () => {
  let awsInstanceService: AWSInstanceService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    awsInstanceService = new AWSInstanceService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockEC2Instances: EC2InstanceType[] = [
    { name: "a1.2xlarge" },
    { name: "a1.4xlarge" },
    { name: "a1.large" },
    { name: "a1.medium" },
    { name: "a1.metal" },
    { name: "a1.xlarge" },
    { name: "c1.medium" },
    { name: "c1.xlarge" },
    { name: "c3.2xlarge" },
    { name: "c3.4xlarge" },
    { name: "c3.8xlarge" },
  ];

  it("fetches all AWS instance services for EC2", async () => {
    // Arrange
    const givenServiceInstance = "EC2";
    mockFetch.mockResolvedValue(mockEC2Instances);

    // Act
    const EC2Instances =
      await awsInstanceService.getAllInstanceByType(givenServiceInstance);

    // Assert
    expect(EC2Instances).toEqual(mockEC2Instances);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/awsInstanceType",
      expect.objectContaining({
        method: "GET",
        body: undefined,
        query: {
          serviceShortName: givenServiceInstance,
        },
        params: undefined,
      }),
    );
  });
});
