import Vue from "vue";
import { createResources } from "@/common/helpers";
import Popup from "@/plugins/popup";
import Notifier from "@/plugins/notifier";
import store from "@/store";
import JWTService from "@/services/jwt";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $popup: () => new Popup(store),
        $notifier: () => new Notifier(store),
        $jwt: () => JWTService,
        $api() {
          return createResources(this.$notifier);
        },
      },
    });
  },
};

Vue.use(plugins);
