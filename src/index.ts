import type { App } from "vue";
import defaults from "lodash/defaults";
import component from "./components/vidle";

interface InstallationOptions {
  name?: string;
}

export default {
  install(app: App, { name = "v-idle" }: InstallationOptions = {}): void {
    app.component(name, defaults(component, { name }));
  },
};
