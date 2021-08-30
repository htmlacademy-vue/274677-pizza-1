import misc from "@/static/misc.json";
import {
  CHANGE_MISC_COUNT,
  ADD_TO_CART,
  CHANGE_PIZZA_COUNT,
  CHANGE_FORM,
  CLEAR_ADDRESS_INPUTS,
  FILL_ADDRESS_INPUTS,
  RESET_CART_STATE,
} from "../mutation-types";
import { DOUGH_PRODUCT_TEXT } from "@/common/constants";

const initialState = () => ({
  pizza: [],
  misc: [],
  form: {
    reciveOrderType: "-1",
    phone: "",
    street: "",
    building: "",
    flat: "",
    isAddressSaved: false,
  },
});

export default {
  namespaced: true,

  state: initialState(),

  getters: {
    cartValue({ pizza, misc }) {
      let pizzaPrice = 0;
      for (let pizzaItem in pizza) {
        pizzaPrice += pizza[pizzaItem].price * pizza[pizzaItem].count;
      }

      const miscPrice = misc.reduce((acc, curr) => {
        const { price, count } = curr;
        return acc + price * count;
      }, 0);

      return pizzaPrice + miscPrice;
    },

    reciveOrderTypes(_s, _g, rootState) {
      const defaultTypes = [
        { id: "-1", text: "Заберу сам" },
        { id: "-2", text: "Новый адрес" },
      ];
      const { addresses } = rootState.Auth;

      if (addresses && Array.isArray(addresses) && addresses.length) {
        const addressesNames = addresses.map((item) => ({
          id: item.id,
          text: item.name,
        }));

        return [...defaultTypes, ...addressesNames];
      }

      return defaultTypes;
    },

    canPlaceOrder({ form }, { cartValue }) {
      const { reciveOrderType, phone, street, building } = form;

      // Телефон должен быть заполнен и в корзине должны быть товары
      if (!phone || !cartValue) {
        return false;
      }

      // Если выбрана доставка на дом, то должны быть указаны улица и дом
      if (reciveOrderType !== "-1" && (!street || !building)) {
        return false;
      }

      return true;
    },

    apiData(state, _g, rootState) {
      // @TODO Доделать в 5 модуле
      const { misc } = state;
      const { user } = rootState.Auth;
      return {
        userId: user ? user.id : null,
        misc: misc.map((item) => ({ miscId: item.id, quantity: item.count })),
        address: {},
        pizzas: [],
      };
    },
  },

  mutations: {
    setMisc(state, misc) {
      state.misc = misc.map((item) => ({ ...item, count: 0 }));
    },

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
        count: data.count || 1,
        productText: {
          size: size.name,
          dough: DOUGH_PRODUCT_TEXT[dough.value],
          sauce: sauce.name.toLowerCase(),
          ingredients: ingredients.reduce((acc, curr) => {
            return acc + `${acc ? ", " : ""}` + curr.name.toLowerCase();
          }, ""),
        },
      };

      let isPizzaExists = false;

      pizza.forEach((item) => {
        if (item.id === data.id) {
          isPizzaExists = true;
          Object.assign(item, newData);
        }
      });

      if (!isPizzaExists) {
        pizza.push(newData);
      }
    },

    [CHANGE_FORM](state, { value, name }) {
      state.form[name] = value;
    },

    [FILL_ADDRESS_INPUTS](state, data) {
      for (let key in state.form) {
        if (data[key]) {
          state.form[key] = data[key];
        }
      }

      state.form.isAddressSaved = true;
    },

    [CLEAR_ADDRESS_INPUTS](state) {
      state.form.street = "";
      state.form.building = "";
      state.form.flat = "";
      state.form.isAddressSaved = false;
    },
  },

  actions: {
    async fetchMisc({ commit }) {
      // add api call

      commit("setMisc", misc);
    },

    changeForm({ commit, rootState }, data) {
      const { value, name } = data;

      if (name === "reciveOrderType") {
        commit(CLEAR_ADDRESS_INPUTS);

        const { addresses } = rootState.Auth;
        const existingAddress = addresses.find((item) => +item.id === +value);

        if (existingAddress) {
          commit(FILL_ADDRESS_INPUTS, existingAddress);
        }
      }

      commit(CHANGE_FORM, data);
    },

    async placeOrder() {
      //api call
    },
  },
};
