import HttpFactory from "./factory/httpFactory";
import type { ServiceConfigurationSetting } from "~/type/infrastructure/ServiceConfigurationSetting";

class ServiceConfigurationSettingSvc extends HttpFactory {
  private RESOURCE = "/api/service-configuration-settings";

  async findAllConfigurationSettingsByServiceId(
    cloudServiceProviderServiceId: string,
  ): Promise<ServiceConfigurationSetting[]> {
    return await this.getCall<ServiceConfigurationSetting[]>(
      `${this.RESOURCE}/${cloudServiceProviderServiceId}`,
    );
  }
}

export default ServiceConfigurationSettingSvc;
