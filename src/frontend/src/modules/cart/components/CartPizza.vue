<template>
  <ul class="cart-list sheet">
    <li
      v-for="(pizzaItem, index) in pizza"
      :key="pizzaItem.id"
      class="cart-list__item"
    >
      <AppProduct
        root-class="cart-list__product"
        :product="getProductProp(pizzaItem)"
      />

      <AppItemCounter
        disabled
        root-class="cart-list__counter"
        :additional-emit-data="pizzaItem"
        :count="pizzaItem.count"
        :buttons="getButtonProps(pizzaItem.count)"
        @countChange="countChange"
      />

      <div class="cart-list__price">
        <b>{{ pizzaItem.price }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          data-test="pizza-change-button"
          @click="onClick(index)"
        >Изменить</button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { CHANGE_PIZZA_COUNT, SET_BUILDER_CONFIG } from "@/store/mutation-types";

import AppItemCounter from "@/common/components/AppItemCounter.vue";
import AppProduct from "@/common/components/AppProduct.vue";

export default {
  name: "CartPizza",

  components: {
    AppItemCounter,
    AppProduct,
  },

  computed: mapState("Cart", ["pizza"]),

  methods: {
    ...mapMutations("Cart", {
      changePizza: CHANGE_PIZZA_COUNT,
    }),

    ...mapMutations("Builder", {
      goToBuilder: SET_BUILDER_CONFIG,
    }),

    countChange(pizza, countType) {
      this.changePizza({ pizza, countType });
    },

    onClick(index) {
      const { name, id } = this.pizza[index];

      this.goToBuilder({
        ...this.pizza[index].selected,
        name,
        id,
      });
      this.$router.push("/");
    },

    getButtonProps(count) {
      return {
        increase: {
          class: "counter__button--orange",
        },
        decrease: {
          class: `counter__button--${count <= 0 ? "disabled" : ""}`,
          disabled: count <= 0,
        },
      };
    },

    getProductProp(item) {
      const { name, productText } = item;

      return {
        name,
        size: productText.size,
        dough: productText.dough,
        sauce: productText.sauce,
        ingredients: productText.ingredients,
      };
    },
  },
};
</script>
