import Vue from "vue";
import Popup from "@/plugins/popup";
import store from "@/store";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $popup: () => new Popup(store),
      },
    });
  },
};

Vue.use(plugins);
