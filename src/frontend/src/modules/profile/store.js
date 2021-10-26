import { setState } from "@/common/helpers";
import { ADDRESS_FORM_MODE } from "@/common/constants";
import {
  CHANGE_FORM_MODE,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
  NEW_ADDRESS,
  SET_PROFILE_STATE,
} from "@/store/mutation-types";

export default {
  namespaced: true,

  state: {
    addresses: [],
    mode: ADDRESS_FORM_MODE.EMPTY, // null || new || edit
    editedAddress: null,
  },

  mutations: {
    [SET_PROFILE_STATE]: setState,

    [CHANGE_FORM_MODE](state, { mode, address }) {
      state.mode = mode;
      state.editedAddress = address;
    },

    [EDIT_ADDRESS](state, address) {
      state.addresses = state.addresses.map((item) =>
        address.id === item.id ? { ...address } : item
      );
    },

    [DELETE_ADDRESS](state, id) {
      state.addresses = state.addresses.filter((item) => item.id !== id);
    },

    [NEW_ADDRESS](state, address) {
      state.addresses.push(address);
    },
  },

  actions: {
    async fetchAddresses({ commit }) {
      const data = await this.$api.addresses.get();

      commit(SET_PROFILE_STATE, { path: "addresses", value: data });
    },

    async editAddress({ commit }, address) {
      await this.$api.addresses.put(address);

      commit(EDIT_ADDRESS, address);
      commit(CHANGE_FORM_MODE, {
        mode: ADDRESS_FORM_MODE.EMPTY,
        address: null,
      });

      this.$notifier.success("Адрес успешно изменен");
    },

    async deleteAddress({ commit }, id) {
      await this.$api.addresses.delete(id);

      commit(DELETE_ADDRESS, id);
      commit(CHANGE_FORM_MODE, {
        mode: ADDRESS_FORM_MODE.EMPTY,
        address: null,
      });

      this.$notifier.success("Адрес успешно удален");
    },

    async newAddress({ commit, rootState }, address) {
      const { id: userId } = rootState.Auth.user;
      const body = {
        ...address,
        userId,
      };
      const data = await this.$api.addresses.post(body);

      if (data) {
        commit(NEW_ADDRESS, { ...data });
        commit(CHANGE_FORM_MODE, {
          mode: ADDRESS_FORM_MODE.EMPTY,
          address: null,
        });
      }
    },
  },
};
