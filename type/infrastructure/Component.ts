import type { ConfiguredValue } from "~/type/infrastructure/ConfiguredValue";

export interface Component {
  id: string;
  name: string;
  lastModificationDate: string;
  regionID: string;
  serviceID: string;
  configurationValues: ConfiguredValue[];
}
