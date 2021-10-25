import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "@/plugins/vuePlugins";

Vue.config.productionTip = false;

const init = async () => {
  const module = await import("@/router");
  const router = await module.default;
  new Vue({
    render: (h) => h(App),
    router,
    store,
  }).$mount("#app");
};

init();
