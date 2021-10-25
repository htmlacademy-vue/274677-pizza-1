import { SET_USER } from "@/store/mutation-types";

export default {
  namespaced: true,

  state: {
    user: null,
  },

  getters: {
    avatarPaths({ user }) {
      if (!user) {
        return null;
      }

      const { avatar } = user;
      const avatarBasePath = avatar.split(".");
      avatarBasePath.pop();

      return {
        jpg: {
          "1x": avatar,
          "2x": `${avatarBasePath}@2x.jpg`,
          "4x": `${avatarBasePath}@4x.jpg`,
        },
        webp: {
          "1x": `${avatarBasePath}.webp`,
          "2x": `${avatarBasePath}@2x.webp`,
          "4x": `${avatarBasePath}@4x.webp`,
        },
      };
    },
  },

  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
  },

  actions: {
    async login({ dispatch }, data) {
      const { token } = await this.$api.auth.login(data);

      this.$jwt.saveToken(token);
      this.$api.auth.setAuthHeader();

      dispatch("getMe");
    },

    async logout({ commit }, withRequest = false) {
      if (withRequest) {
        await this.$api.auth.logout();
      }

      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();

      commit(SET_USER, null);
    },

    async getMe({ commit, dispatch }) {
      try {
        const user = await this.$api.auth.whoAmI();
        commit(SET_USER, user);
      } catch (e) {
        dispatch("logout", false);
      }
    },
  },
};
