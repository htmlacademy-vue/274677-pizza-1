import { uniqueId } from "lodash";
import { getProductText, getPriceText } from "@/common/helpers";
import { RECIVE_ORDER_TYPES } from "@/common/constants";
import { DELETE_ORDER, FILL_CART, SET_ORDERS } from "../mutation-types";

export default {
  namespaced: true,

  state: {
    orders: [],
  },

  getters: {
    normalizedOrderMisc({ orders }, { normalizedPizzaData }) {
      const { misc: normalizedMisc } = normalizedPizzaData;

      return orders.reduce((acc, orderItem) => {
        const { orderMisc, id } = orderItem;

        let newMisc = [];
        let orderMiscPrice = 0;

        if (orderMisc) {
          newMisc = orderMisc
            .filter((item) => item.quantity)
            .map((item) => {
              const { miscId, quantity, id } = item;
              const { image, name, price } = normalizedMisc[miscId];

              orderMiscPrice += quantity * price;

              return {
                id,
                image,
                name,
                price: getPriceText(quantity, price),
              };
            });
        }
        return {
          ...acc,
          [id]: {
            items: newMisc,
            price: orderMiscPrice,
          },
        };
      }, {});
    },

    normalizedOrderPizza({ orders }, { normalizedPizzaData }) {
      const {
        dough: normalizedDough,
        sizes: normalizedSizes,
        sauces: normalizedSauces,
        ingredients: normalizedIngredients,
      } = normalizedPizzaData;

      return orders.reduce((acc, orderItem) => {
        const { orderPizzas, id } = orderItem;

        let newPizza = [];
        let orderPizzaPrice = 0;

        if (orderPizzas) {
          newPizza = orderPizzas.map((pizzaItem) => {
            const {
              name,
              doughId,
              sauceId,
              sizeId,
              ingredients,
              quantity,
              id,
            } = pizzaItem;
            const pizzaDough = normalizedDough[doughId];
            const pizzaSauce = normalizedSauces[sauceId];
            const pizzaSize = normalizedSizes[sizeId];
            let ingredientsPrice = 0;
            const pizzaIngredients = ingredients.map((item) => {
              const { ingredientId, quantity } = item;

              ingredientsPrice +=
                normalizedIngredients[ingredientId].price * quantity;

              return {
                ...normalizedIngredients[ingredientId],
                count: quantity,
              };
            });

            const price =
              (pizzaDough.price + pizzaSauce.price + ingredientsPrice) *
              pizzaSize.multiplier;

            orderPizzaPrice += quantity * price;

            return {
              name,
              id,
              productText: getProductText({
                dough: pizzaDough,
                size: pizzaSize,
                sauce: pizzaSauce,
                ingredients: pizzaIngredients,
              }),
              price: getPriceText(quantity, price),
            };
          });
        }

        return {
          ...acc,
          [id]: {
            items: newPizza,
            price: orderPizzaPrice,
          },
        };
      }, {});
    },

    normalizedOrders(
      { orders },
      { normalizedOrderPizza, normalizedOrderMisc }
    ) {
      return orders.map((orderItem) => {
        const { orderAddress, id, ...rest } = orderItem;
        const { items: miscItems, price: miscPrice } = normalizedOrderMisc[id];
        const { items: pizzaItems, price: pizzaPrice } =
          normalizedOrderPizza[id];
        const orderPrice = miscPrice + pizzaPrice;

        return {
          ...rest,
          id,
          price: orderPrice,
          misc: [...miscItems],
          pizza: [...pizzaItems],
          address: orderAddress?.name,
        };
      });
    },

    normalizedPizzaData(_s, _g, rootState) {
      const { misc = [] } = rootState.Cart;
      const {
        dough = [],
        sizes = [],
        sauces = [],
        ingredients = [],
      } = rootState.Builder;

      const reduceCallback = (acc, curr) => {
        const { id, ...rest } = curr;

        return {
          ...acc,
          [id]: {
            ...rest,
          },
        };
      };

      const normalizedMisc = misc.reduce(reduceCallback, {});
      const normalizedSizes = sizes.reduce(reduceCallback, {});
      const normalizedDough = dough.reduce(reduceCallback, {});
      const normalizedSauces = sauces.reduce(reduceCallback, {});
      const normalizedIngredients = ingredients.reduce(reduceCallback, {});

      return {
        misc: normalizedMisc,
        dough: normalizedDough,
        sizes: normalizedSizes,
        sauces: normalizedSauces,
        ingredients: normalizedIngredients,
      };
    },

    repeatOrderPizzaData(
      { orders },
      { normalizedOrderPizza, normalizedPizzaData }
    ) {
      const {
        dough: normalizedDough,
        sizes: normalizedSizes,
        sauces: normalizedSauces,
        ingredients: normalizedIngredients,
      } = normalizedPizzaData;

      return orders.reduce((acc, orderItem) => {
        const { orderPizzas, id } = orderItem;

        let pizza = [];

        if (orderPizzas) {
          pizza = orderPizzas.map((item, index) => {
            const { name, doughId, sauceId, sizeId, ingredients, quantity } =
              item;
            const pizzaDough = {
              ...normalizedDough[doughId],
              id: doughId,
            };
            const pizzaSauce = {
              ...normalizedSauces[sauceId],
              id: sauceId,
            };
            const pizzaSize = {
              ...normalizedSizes[sizeId],
              id: sizeId,
            };
            const pizzaIngredients = ingredients.map((item) => {
              const { ingredientId, quantity } = item;

              return {
                ...normalizedIngredients[ingredientId],
                id: ingredientId,
                count: quantity,
              };
            });

            return {
              name,
              id: uniqueId(),
              count: quantity,
              price: normalizedOrderPizza[id].price,
              productText: normalizedOrderPizza[id].items[index].productText,
              selected: {
                dough: pizzaDough,
                sauce: pizzaSauce,
                size: pizzaSize,
                ingredients: pizzaIngredients,
              },
            };
          });
        }
        return {
          ...acc,
          [id]: [...pizza],
        };
      }, {});
    },

    repeatOrderAddressData({ orders }) {
      return orders.reduce((acc, orderItem) => {
        const { id, phone, orderAddress, addressId } = orderItem;

        const orderData = {
          phone,
          building: "",
          comment: "",
          flat: "",
          street: "",
          reciveOrderType: RECIVE_ORDER_TYPES.TAKE_AWAY,
        };

        if (orderAddress) {
          orderData.building = orderAddress.building;
          orderData.comment = orderAddress.comment;
          orderData.flat = orderAddress.flat;
          orderData.street = orderAddress.street;

          if (addressId) {
            orderData.reciveOrderType = `${addressId}`;
          }
        }
        return {
          ...acc,
          [id]: {
            ...orderData,
          },
        };
      }, {});
    },

    repeatOrderMiscData({ orders }, { normalizedPizzaData }) {
      const { misc: normalizedMisc } = normalizedPizzaData;

      return orders.reduce((acc, orderItem) => {
        const { id, orderMisc } = orderItem;
        let miscData = [];

        if (orderMisc) {
          miscData = orderMisc.map((item) => {
            const { miscId, quantity } = item;
            const normalizedMiscItem = normalizedMisc[miscId];
            return {
              ...normalizedMiscItem,
              id: miscId,
              count: quantity,
            };
          });
        }
        return {
          ...acc,
          [id]: [...miscData],
        };
      }, {});
    },
  },

  mutations: {
    [SET_ORDERS](state, orders) {
      state.orders = orders;
    },

    [DELETE_ORDER](state, id) {
      state.orders = state.orders.filter((item) => item.id !== id);
    },
  },

  actions: {
    async fetchOrders({ commit }) {
      const data = await this.$api.orders.get();

      commit(SET_ORDERS, data);
    },

    async deleteOrder({ commit }, id) {
      await this.$api.orders.delete(id);

      commit(DELETE_ORDER, id);

      this.$notifier.success("Заказ успешно удален");
    },

    repeatOrder({ getters, state, commit }, id) {
      const selectedOrder = state.orders.find((item) => item.id === id);
      const { addressId } = selectedOrder;
      const {
        repeatOrderPizzaData,
        repeatOrderAddressData,
        repeatOrderMiscData,
      } = getters;

      const isAddressSaved = Boolean(addressId);

      commit(
        `Cart/${FILL_CART}`,
        {
          pizza: repeatOrderPizzaData[id],
          misc: repeatOrderMiscData[id],
          address: repeatOrderAddressData[id],
          isAddressSaved,
        },
        {
          root: true,
        }
      );
    },
  },
};
