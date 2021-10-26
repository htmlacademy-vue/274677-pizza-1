import {
  OPEN_POPUP,
  CLOSE_POPUP,
  REGISTER_POPUP,
} from "@/store/mutation-types";

export default {
  namespaced: true,

  state: {
    popups: {},
  },

  getters: {
    isAnyPopupOpen(state) {
      return !!Object.keys(state.popups).find(
        (key) => state.popups[key].isOpen
      );
    },
  },

  mutations: {
    [OPEN_POPUP](state, name) {
      if (state.popups[name]) {
        state.popups[name].isOpen = true;
      }
    },
    [CLOSE_POPUP](state, name) {
      if (state.popups[name]) {
        state.popups[name].isOpen = false;
      }
    },
    [REGISTER_POPUP](state, { name }) {
      state.popups = {
        ...state.popups,
        [name]: {
          isOpen: false,
        },
      };
    },
  },
};
