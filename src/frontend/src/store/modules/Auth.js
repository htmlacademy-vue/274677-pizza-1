import user from "@/static/user.json";

export default {
  namespaced: true,

  state: {
    user: null,
    addresses: null,
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
        src: {
          "1x": avatar,
          "2x": `${avatarBasePath}@2x.jpg`,
        },
        webp: {
          "1x": `${avatarBasePath}.webp`,
          "2x": `${avatarBasePath}@2x.webp`,
        },
      };
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setAdresses(state, addresses) {
      state.addresses = addresses;
    },
  },

  actions: {
    async fetchUser({ commit }) {
      // add api call

      commit("setUser", user);
    },

    async fetchAddresses({ commit }) {
      const addresses = [
        {
          id: 0,
          name: "test",
          street: "test street",
          building: "test building",
          flat: "test flat",
          comment: "test comment",
          userId: "test userId",
        },
      ];

      commit("setAdresses", addresses);
    },

    async logout({ commit }) {
      // api call ?

      commit("setUser", null);
    },
  },
};
