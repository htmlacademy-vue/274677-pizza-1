import { uniqueId } from "lodash";
import { getPriceText, getProductText } from "@/common/helpers";
import { RECIVE_ORDER_TYPES } from "@/common/constants";
import { DELETE_ORDER, SET_ORDERS, FILL_CART } from "../mutation-types";

export default {
  namespaced: true,

  state: {
    orders: [],
  },

  getters: {
    normalizedOrders({ orders }, _g, rootState) {
      const { misc } = rootState.Cart;
      const {
        dough: builderDough,
        sizes: builderSizes,
        sauces: builderSauces,
        ingredients: builderIngredients,
      } = rootState.Builder;

      return orders.map((orderItem) => {
        const {
          orderMisc = [],
          orderPizzas = [],
          orderAddress = {},
          id,
        } = orderItem;
        let orderPrice = 0;

        const newMisc = orderMisc
          .filter((item) => item.quantity)
          .map((miscItem) => {
            const { miscId, id, quantity } = miscItem;
            const { image, name, price } = misc.find((x) => x.id === miscId);
            const miscPrice = quantity * price;
            orderPrice += miscPrice;

            return {
              id,
              image,
              name,
              price: {
                text: getPriceText(quantity, price),
                value: miscPrice,
              },
            };
          });

        const newPizza = orderPizzas.map((pizzaItem) => {
          const { name, doughId, sauceId, sizeId, ingredients, quantity, id } =
            pizzaItem;
          let ingredientsPrice = 0;

          const doughData = builderDough.find((x) => x.id === doughId);
          const sauceData = builderSauces.find((x) => x.id === sauceId);
          const sizeData = builderSizes.find((x) => x.id === sizeId);
          const ingredientsData = ingredients.map((item) => {
            const { ingredientId, quantity } = item;
            const data = builderIngredients.find((x) => x.id === ingredientId);
            ingredientsPrice += data.price * quantity;

            return {
              ...data,
              count: quantity,
            };
          });

          const pizzaPrice =
            (doughData.price + sauceData.price + ingredientsPrice) *
            sizeData.multiplier;

          orderPrice += pizzaPrice;

          return {
            name,
            id,
            price: {
              text: getPriceText(quantity, pizzaPrice),
              value: pizzaPrice,
            },
            productText: getProductText({
              dough: doughData,
              size: sizeData,
              sauce: sauceData,
              ingredients: ingredientsData,
            }),
            selected: {
              dough: doughData,
              size: sizeData,
              sauce: sauceData,
              ingredients: ingredientsData,
            },
          };
        });

        return {
          id,
          price: orderPrice,
          misc: newMisc,
          pizza: newPizza,
          address: orderAddress?.name,
        };
      });
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

    repeatOrder({ getters, state, commit, rootState }, id) {
      const { misc } = rootState.Cart;
      const stateOrder = state.orders.find((item) => item.id === id);
      const normalizedOrder = getters.normalizedOrders.find(
        (item) => item.id === id
      );
      const {
        addressId,
        phone,
        orderAddress = {},
        orderMisc,
        orderPizzas,
      } = stateOrder;
      const { pizza: normalizedPizza } = normalizedOrder;

      const newPizza = orderPizzas.map((pizzaItem) => {
        const { name, quantity, id } = pizzaItem;
        const { selected, productText, price } = normalizedPizza.find(
          (x) => x.id === id
        );

        return {
          name,
          id: uniqueId(),
          count: quantity,
          productText,
          price: price.value,
          selected,
        };
      });

      const newMisc = misc.map((miscItem) => {
        const { quantity } = orderMisc.find((x) => x.miscId === miscItem.id);

        return {
          ...miscItem,
          count: quantity,
        };
      });

      const address = {
        phone,
        building: "",
        comment: "",
        flat: "",
        street: "",
        reciveOrderType: RECIVE_ORDER_TYPES.TAKE_AWAY,
      };

      if (orderAddress) {
        address.building = orderAddress.building;
        address.comment = orderAddress.comment;
        address.flat = orderAddress.flat;
        address.street = orderAddress.street;

        if (addressId) {
          address.reciveOrderType = `${addressId}`;
        }
      }

      const isAddressSaved = Boolean(addressId);

      commit(
        `Cart/${FILL_CART}`,
        {
          pizza: newPizza,
          misc: newMisc,
          address,
          isAddressSaved,
        },
        {
          root: true,
        }
      );
    },
  },
};
