import type { App } from "vue";
import vidle from "./components/vidle";

const Vidle = {
  install(app: App): void {
    app.component("v-idle", vidle);
  },
};

export default Vidle;
