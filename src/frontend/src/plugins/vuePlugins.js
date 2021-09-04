import Vue from "vue";
import Popup from "@/plugins/popup";
import Notifier from "@/plugins/notifier";
import store from "@/store";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $popup: () => new Popup(store),
        $notifier: () => new Notifier(store),
      },
    });
  },
};

Vue.use(plugins);
