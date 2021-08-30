import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {
    async init({ dispatch }) {
      dispatch("Builder/fetchPizza");
      dispatch("Auth/fetchUser");
      // dispatch("Orders/fetchOrders");
    },
  },
  mutations: {},
  modules,
});
