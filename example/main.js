import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
// import { createApp } from "Vue";
import Vidle from "../dist/index.esm.js";
const app = createApp({
  data() {
    return {};
  },
});

app.use(Vidle);

app.mount("#app");
