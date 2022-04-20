import type { App } from "vue";
import defaults from "lodash/defaults";
import component from "./components/vidle";

export interface InstallationOptions {
  name?: string;
}

const Vidle = {
  install(app: App, { name = "v-idle" }: InstallationOptions = {}): void {
    app.component(name, defaults(component, { name }));
  },
};

export default Vidle;
