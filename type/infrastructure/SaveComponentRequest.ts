import type { ConfiguredValue } from "~/type/infrastructure/ConfiguredValue";

export interface SaveComponentRequest {
  infrastructureID: string;
  serviceID: string;
  name: string;
  regionID: string;
  configurationValues: ConfiguredValue[];
}
