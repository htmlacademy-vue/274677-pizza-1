import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import plugins from "@/plugins/vuexPlugins";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {
    async init({ dispatch }) {
      dispatch("Builder/fetchPizza");
    },
  },
  mutations: {},
  modules,
  plugins: [plugins],
});
