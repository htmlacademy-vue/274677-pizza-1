import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import plugins from "@/plugins/vuexPlugins";
import { SET_ENTITY } from "./mutation-types";
Vue.use(Vuex);

export const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
};

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
