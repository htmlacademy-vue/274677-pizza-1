import { RECIVE_ORDER_TYPES } from "@/common/constants";
import {
  CHANGE_MISC_COUNT,
  ADD_TO_CART,
  CHANGE_PIZZA_COUNT,
  RESET_CART_STATE,
  FILL_CART,
  FILL_ADDRESS_INPUTS,
  CLEAR_ADDRESS_INPUTS,
  SET_CART_STATE,
} from "../mutation-types";
import { getProductText, setState } from "@/common/helpers";

const initialState = () => ({
  pizza: [],
  misc: [],
  form: {
    inputs: {
      reciveOrderType: RECIVE_ORDER_TYPES.TAKE_AWAY,
      phone: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    validations: {
      phone: {
        error: "",
        rules: ["phone", "required"],
      },
      street: {
        error: "",
        rules: ["required"],
      },
      building: {
        error: "",
        rules: ["required"],
      },
    },
    isAddressSaved: false,
  },
});

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    cartValue(_, { miscPrice, pizzaPrice }) {
      return pizzaPrice + miscPrice;
    },

    miscPrice({ misc }) {
      return misc.reduce((acc, curr) => {
        const { price, count } = curr;
        return acc + price * count;
      }, 0);
    },

    pizzaPrice({ pizza }) {
      let pizzaPrice = 0;
      for (let pizzaItem in pizza) {
        pizzaPrice += pizza[pizzaItem].price * pizza[pizzaItem].count;
      }

      return pizzaPrice;
    },

    reciveOrderTypes(_s, _g, rootState) {
      const defaultTypes = [
        { id: RECIVE_ORDER_TYPES.TAKE_AWAY, text: "Заберу сам" },
        { id: RECIVE_ORDER_TYPES.NEW_ADDRESS, text: "Новый адрес" },
      ];
      const { addresses } = rootState.Addresses;

      if (addresses && Array.isArray(addresses) && addresses.length) {
        const addressesNames = addresses.map((item) => ({
          id: `${item.id}`,
          text: item.name,
        }));

        return [...defaultTypes, ...addressesNames];
      }

      return defaultTypes;
    },

    apiData(state, _g, rootState) {
      const { misc, pizza, form } = state;
      const { phone, reciveOrderType, ...address } = form.inputs; // eslint-disable-line
      const { user } = rootState.Auth;

      return {
        userId: user ? user.id : null,
        phone,
        address: !address.street
          ? null
          : {
              ...address,
            },
        pizzas: pizza.map((item) => {
          const { name, selected, count } = item;
          const { sauce, dough, size, ingredients } = selected;

          return {
            name,
            sauceId: sauce.id,
            doughId: dough.id,
            sizeId: size.id,
            quantity: count,
            ingredients: ingredients.map((ingredientItem) => ({
              ingredientId: ingredientItem.id,
              quantity: ingredientItem.count,
            })),
          };
        }),
        misc: misc.map((item) => ({ miscId: item.id, quantity: item.count })),
      };
    },
  },

  mutations: {
    [RESET_CART_STATE](state) {
      Object.assign(state, initialState());
    },

    [CHANGE_MISC_COUNT](state, { misc, countType }) {
      if (!misc) {
        return;
      }

      const { count } = misc;

      if (countType === "decrease" && count === 0) {
        return;
      }

      const newMisc = {
        ...misc,
        count: countType === "increase" ? count + 1 : count - 1,
      };

      state.misc = state.misc.map((item) =>
        item.id === newMisc.id ? newMisc : item
      );
    },

    [CHANGE_PIZZA_COUNT](state, { pizza, countType }) {
      if (!pizza) {
        return;
      }

      const { count } = pizza;

      if (countType === "decrease" && count === 0) {
        return;
      }

      const newPizza = {
        ...pizza,
        count: countType === "increase" ? count + 1 : count - 1,
      };

      state.pizza = state.pizza.map((item) =>
        item.name === newPizza.name ? newPizza : item
      );
    },

    [ADD_TO_CART]({ pizza }, data) {
      const { dough, ingredients, sauce, size } = data.selected;

      const newData = {
        ...data,
        productText: getProductText({ size, dough, sauce, ingredients }),
      };

      let isPizzaExists = false;

      pizza.forEach((item) => {
        if (item.id === data.id) {
          isPizzaExists = true;
          Object.assign(item, { ...newData, count: item.count || 1 });
        }
      });

      if (!isPizzaExists) {
        pizza.push({ ...newData, count: 1 });
      }
    },

    [FILL_ADDRESS_INPUTS]({ form }, data) {
      for (let key in form.inputs) {
        if (data[key]) {
          form.inputs[key] = data[key];
        }
      }
      form.isAddressSaved = true;
    },

    [CLEAR_ADDRESS_INPUTS]({ form }) {
      form.inputs.street = "";
      form.inputs.building = "";
      form.inputs.flat = "";
      form.isAddressSaved = false;
    },

    [SET_CART_STATE]: setState,

    [FILL_CART](state, data) {
      state.pizza = data.pizza;
      state.misc = data.misc;
      state.form.inputs = data.address;
      state.form.isAddressSaved = data.isAddressSaved;
    },
  },

  actions: {
    async fetchMisc({ commit }) {
      const data = await this.$api.misc.get();

      commit(SET_CART_STATE, { path: "misc", value: data });
    },

    async placeOrder({ commit, getters, dispatch }) {
      const { apiData } = getters;
      const data = await this.$api.orders.post(apiData);

      if (data) {
        commit(RESET_CART_STATE);
        commit(SET_CART_STATE, {
          path: "misc",
          value: this.$api.misc.data,
        });
        if (data.addressId && data.userId) {
          dispatch("Addresses/fetchAddresses", false, {
            root: true,
          });
        }
      }
    },

    changeForm({ commit, rootState }, data) {
      const { value, name } = data;

      if (name === "reciveOrderType") {
        commit(CLEAR_ADDRESS_INPUTS);

        const { addresses } = rootState.Addresses;
        const existingAddress = addresses.find((item) => +item.id === +value);

        if (existingAddress) {
          commit(FILL_ADDRESS_INPUTS, existingAddress);
        }
      }

      commit(SET_CART_STATE, { path: `form.inputs.${name}`, value });
    },

    validateForm({ commit, state }) {
      const { inputs, validations } = state.form;
      const isTakeAway =
        inputs.reciveOrderType === RECIVE_ORDER_TYPES.TAKE_AWAY;
      const { isValid, validations: newValidations } =
        this.$validator.validateFields(
          isTakeAway ? { phone: inputs.phone } : { ...inputs },
          validations
        );
      if (!isValid) {
        commit(SET_CART_STATE, {
          path: "form.validations",
          value: newValidations,
        });
      }
      return isValid;
    },

    setValidationError({ commit }, { name, error }) {
      commit(SET_CART_STATE, {
        path: `form.validations.${name}.error`,
        value: error,
      });
    },
  },
};
