import type { Component } from "~/type/infrastructure/Component";
import type { CloudServiceProvider } from "./CloudServiceProvider";

export interface Infrastructure {
  id?: string;
  name: string;
  cloudServiceProvider: CloudServiceProvider;
  defaultRegion: string;
  components: Component[];
}
