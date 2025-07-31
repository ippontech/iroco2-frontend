import type { Mock } from "vitest";
import TokenService from "./tokenService";
import type { $Fetch } from "ofetch";
import type { GetTokenRequest } from "~/type/GetTokenRequest";

describe("tokenService", () => {
  let tokenService: TokenService;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = vi.fn();
    tokenService = new TokenService(mockFetch as unknown as $Fetch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it("fetch the token", async () => {
    //Arrange
    const token = "dummyToken";
    mockFetch.mockResolvedValue(token);
    const getTokenRequest: GetTokenRequest = {
      aws_account_id: "123456789012",
      expire_in_seconds: 3600,
    };

    //Act
    const result = await tokenService.getToken(getTokenRequest);
    //Assert
    expect(result).toEqual(token);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/v1/token/generate",
      expect.objectContaining({
        method: "POST",
        body: getTokenRequest,
      }),
    );
  });
});
