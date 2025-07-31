import type { ConfigurationSetting } from "~/type/infrastructure/ConfigurationSetting";

export interface ServiceConfigurationSetting {
  id: string;
  defaultValue: string;
  configurationSetting: ConfigurationSetting;
}
