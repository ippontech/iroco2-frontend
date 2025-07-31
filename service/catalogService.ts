import HttpFactory from "~/service/factory/httpFactory";
import { Availability } from "~/type/Availability";
import type { ServiceCatalog } from "~/type/ServiceCatalog";
import type { ServiceDescription } from "~/type/ServiceDescription";

class CatalogService extends HttpFactory {
  private RESOURCE = "/api/public/v2/catalog";

  async getAllServices(): Promise<ServiceCatalog[]> {
    const tab = Object.values(Availability);

    const services = await this.getCall<ServiceCatalog[]>(
      `${this.RESOURCE}/services`,
    );

    return services.sort(
      (a, b) => tab.indexOf(a.availability) - tab.indexOf(b.availability),
    );
  }
  async getById(id: string): Promise<ServiceDescription> {
    return await this.getCall(`${this.RESOURCE}/services/${id}`);
  }
}

export default CatalogService;
