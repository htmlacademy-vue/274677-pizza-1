import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/plugins/vuePlugins";
Vue.config.productionTip = false;

new Vue({
  data: {
    isPopupOpen: false,
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");

router.beforeResolve((to, _, next) => {
  const isAuth = Boolean(store.state.Auth.user);

  if (to.name === "Login" && isAuth) {
    next({ name: "IndexHome" });
  } else {
    next();
  }
});
