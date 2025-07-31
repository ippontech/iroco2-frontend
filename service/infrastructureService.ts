import type { InfrastructureRequest } from "~/type/infrastructure/InfrastructureRequest";
import HttpFactory from "./factory/httpFactory";
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";

class InfrastructureService extends HttpFactory {
  private RESOURCE = "/api/v2/infrastructures";

  async createNewInfra(
    infrastructure: InfrastructureRequest,
  ): Promise<Infrastructure> {
    return await this.postCall<Infrastructure>(this.RESOURCE, infrastructure);
  }

  async getInfrastructures(): Promise<Infrastructure[]> {
    return await this.getCall<Infrastructure[]>(this.RESOURCE);
  }

  async deleteInfra(id: string): Promise<void> {
    const url = this.RESOURCE + "/" + id;
    return await this.deleteCall(url);
  }

  async getInfrastructure(id: string): Promise<Infrastructure> {
    const url = this.RESOURCE + "/" + id;
    return await this.getCall(url);
  }
}

export default InfrastructureService;
