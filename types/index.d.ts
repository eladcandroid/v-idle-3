import type { App } from "vue";
import VIdle from "../src/components/vidle";
export interface InstallationOptions {
  name?: string;
}
declare namespace VIdle3 {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function install(app: App, options: InstallationOptions): any;
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    VIdle: typeof VIdle;
  }
}

export default VIdle3;
