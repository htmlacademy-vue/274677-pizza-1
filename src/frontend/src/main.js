import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  data: {
    isPopupOpen: false,
  },
  render: (h) => h(App),
  router,
}).$mount("#app");
