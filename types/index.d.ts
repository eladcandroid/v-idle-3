import { App } from "vue";

declare namespace VIdle3 {
  export interface InstallationOptions {
    name?: string;
  }
  export function install(app: App, options?: InstallationOptions): void;
}

export default VIdle3;
