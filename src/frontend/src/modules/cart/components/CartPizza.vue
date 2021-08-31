<template>
  <ul class="cart-list sheet">
    <li
      v-for="(pizzaItem, index) in pizza"
      :key="pizzaItem.id"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizzaItem.name"
        />
        <div class="product__text">
          <h2>{{ pizzaItem.name }}</h2>
          <ul>
            <li>{{pizzaItem.productText.size}}, {{ pizzaItem.productText.dough }}</li>
            <li>Соус: {{ pizzaItem.productText.sauce }}</li>
            <li>Начинка: {{ pizzaItem.productText.ingredients }}</li>
          </ul>
        </div>
      </div>

      <AppItemCounter
        disabled
        :root-class="'cart-list__counter'"
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
          @click="onClick(index)"
        >Изменить</button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppItemCounter from "@/common/components/AppItemCounter.vue";
import { CHANGE_PIZZA_COUNT, SET_BUILDER_CONFIG } from "@/store/mutation-types";

export default {
  name: "CartPizza",

  components: {
    AppItemCounter,
  },

  computed: {
    ...mapState("Cart", ["pizza"]),
  },

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
  },
};
</script>
