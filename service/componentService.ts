import HttpFactory from "./factory/httpFactory";
import type { Component } from "~/type/infrastructure/Component";
import type { SaveComponentRequest } from "~/type/infrastructure/SaveComponentRequest";
import type { UpdateComponentRequest } from "~/type/infrastructure/UpdateComponentRequest";

class ComponentService extends HttpFactory {
  private RESOURCE = "/api/v2/components";

  async getComponentsByInfrastructureId(id: string): Promise<Component[]> {
    const url = this.RESOURCE;
    return await this.getCall(url, undefined, { infrastructureId: id });
  }
  async saveComponent(component: SaveComponentRequest): Promise<void> {
    return await this.postCall(this.RESOURCE, component);
  }
  async deleteComponent(id: string): Promise<void> {
    return await this.deleteCall(this.RESOURCE + "/" + id);
  }

  async updateComponent(component: UpdateComponentRequest): Promise<void> {
    return await this.patchCall(this.RESOURCE, component);
  }
}

export default ComponentService;
