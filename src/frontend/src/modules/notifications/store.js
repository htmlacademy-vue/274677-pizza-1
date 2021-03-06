import { uniqueId } from "lodash";
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from "@/store/mutation-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants";

export default {
  namespaced: true,

  state: {
    notifications: [],
  },

  mutations: {
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },

    [DELETE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },

  actions: {
    async createNotification({ commit }, { ...notification }) {
      const uniqueNotification = {
        ...notification,
        id: uniqueId(),
      };
      commit(ADD_NOTIFICATION, uniqueNotification);
      setTimeout(
        () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
        MESSAGE_LIVE_TIME
      );
    },
  },
};
