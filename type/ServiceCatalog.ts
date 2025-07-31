import type { Availability } from "~/type/Availability";

export interface ServiceCatalog {
  id: string;
  name: string;
  description: string;
  availability: Availability;
  shortname: string;
  limitations: string[];
  levers: string[];
}
