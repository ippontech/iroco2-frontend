import type { GetTokenRequest } from "~/type/GetTokenRequest";
import HttpFactory from "./factory/httpFactory";

class TokenService extends HttpFactory {
  private RESOURCE = "/api/v1/token/generate";
  async getToken(body: GetTokenRequest): Promise<string> {
    return await this.postCall(this.RESOURCE, body);
  }
}

export default TokenService;
