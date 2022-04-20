import { App } from "vue";

declare module "v-idle-3" {
  export function install(app: App): void;
}
