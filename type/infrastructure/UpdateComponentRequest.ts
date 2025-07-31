import type { ConfiguredValue } from "~/type/infrastructure/ConfiguredValue";

export interface UpdateComponentRequest {
  id: string;
  infrastructureID: string;
  serviceID: string;
  name: string;
  regionID: string;
  configurationValues: ConfiguredValue[];
}
