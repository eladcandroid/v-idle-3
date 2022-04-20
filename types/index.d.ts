import type { App } from "vue";
export interface InstallationOptions {
  name?: string;
}
declare namespace VIdle3 {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function install(app: App, options: InstallationOptions): any;
}

export default VIdle3;
