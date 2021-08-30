export default {
  namespaced: true,

  state: {
    orders: null,
  },

  mutations: {
    setOrders(state, orders) {
      state.orders = orders;
    },
  },

  actions: {
    async fetchOrders({ commit }) {
      // add api call

      commit("setOrders", null);
    },
  },
};
