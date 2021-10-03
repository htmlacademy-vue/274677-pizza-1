import { cloneDeep, uniqueId } from "lodash";
import { getSelectedPizzaItem, setState } from "@/common/helpers";

import {
  MAX_SAME_INGREDIENT_COUNT,
  COUNT_TO_WORD,
  BASE_FILLING_CLASS,
} from "@/common/constants";

import {
  CHANGE_PIZZA_INGREDIENT,
  CHANGE_PIZZA_TYPE,
  SET_BUILDER_CONFIG,
  SET_INITIAL_STATE,
  SET_BUILDER_STATE,
} from "../mutation-types";

export default {
  namespaced: true,

  state: {
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
    name: "",
    id: null,
  },

  getters: {
    selectedItems(state) {
      const { dough, sizes, sauces, ingredients } = state;

      return {
        dough: dough.length ? getSelectedPizzaItem(dough) : {},
        size: sizes.length ? getSelectedPizzaItem(sizes) : {},
        sauce: sauces.length ? getSelectedPizzaItem(sauces) : {},
        ingredients: ingredients.length
          ? ingredients.filter((item) => item.count)
          : [],
      };
    },

    pizzaPrice(_, { selectedItems, ingredientsPrice }) {
      const doughPrice = selectedItems.dough.price;
      const saucePrice = selectedItems.sauce.price;
      const multiplier = selectedItems.size.multiplier;

      return (doughPrice + saucePrice + ingredientsPrice) * multiplier;
    },

    ingredientsPrice(_, { selectedItems }) {
      return selectedItems.ingredients.reduce((acc, curr) => {
        const { count, price } = curr;
        return acc + count * price;
      }, 0);
    },

    ingredientsFilling(_, { selectedItems }) {
      if (!selectedItems) {
        return null;
      }

      return selectedItems.ingredients.reduce((acc, curr) => {
        const classes = [];

        for (let i = 1; i <= curr.count; i++) {
          const ingredientMod = `${BASE_FILLING_CLASS}${curr.value}`;

          classes.push({
            id: `${curr.value}-${i}`,
            class:
              i === 1
                ? ingredientMod
                : `${ingredientMod} ${BASE_FILLING_CLASS}${COUNT_TO_WORD[i]}`,
          });
        }

        return [...acc, ...classes];
      }, []);
    },
  },

  mutations: {
    [CHANGE_PIZZA_INGREDIENT](state, { ingredient, countType = "increase" }) {
      if (!ingredient) {
        return;
      }

      const typeValues = {
        checkValue: countType === "increase" ? MAX_SAME_INGREDIENT_COUNT : 0,
        newCount:
          countType === "increase"
            ? ingredient.count + 1
            : ingredient.count - 1,
      };

      if (ingredient.count === typeValues.checkValue) {
        return;
      }

      const updatedIngredient = {
        ...ingredient,
        count: typeValues.newCount,
      };

      state.ingredients = state.ingredients.map((item) => {
        return item.value === updatedIngredient.value
          ? updatedIngredient
          : item;
      });
    },

    [CHANGE_PIZZA_TYPE](state, { type, value }) {
      state[type] = state[type].map((item) => ({
        ...item,
        checked: item.value === value,
      }));
    },

    [SET_INITIAL_STATE](state, data) {
      Object.assign(state, cloneDeep(data));
    },

    [SET_BUILDER_CONFIG](state, config) {
      const { dough, ingredients, sauce, size, name, id } = config;

      state.dough.forEach((item) => {
        item.checked = item.value === dough.value;
      });

      state.sauces.forEach((item) => {
        item.checked = item.value === sauce.value;
      });

      state.sizes.forEach((item) => {
        item.checked = item.value === size.value;
      });

      const ingredientsCountByValue = ingredients.reduce((acc, curr) => {
        const { value, count } = curr;

        return {
          ...acc,
          [value]: count,
        };
      }, {});

      state.ingredients.forEach((item) => {
        item.count = ingredientsCountByValue[item.value] || 0;
      });

      state.name = name;
      state.id = id;
    },

    [SET_BUILDER_STATE]: setState,
  },

  actions: {
    async fetchPizza({ commit }) {
      const data = await this.$api.builder.get();
      commit(SET_INITIAL_STATE, { ...data, id: uniqueId() });
    },

    changeName({ commit }, newName) {
      commit(SET_BUILDER_STATE, { path: "name", value: newName });
    },

    resetState({ commit }) {
      commit(SET_INITIAL_STATE, {
        ...this.$api.builder.data,
        id: uniqueId(),
      });
    },
  },
};
