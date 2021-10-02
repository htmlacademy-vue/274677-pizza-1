<template>
  <div
    class="product"
    :class="rootClass"
  >
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="product.name"
    />
    <div class="product__text">
      <h2>{{ product.name }}</h2>
      <ul>
        <li>{{ product.size }}, {{ product.dough }}</li>
        <li>Соус: {{ product.sauce }}</li>
        <li>Начинка: {{ product.ingredients }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppProduct",

  props: {
    product: {
      type: Object,
      required: true,
      default() {
        return {
          name: "",
          size: "",
          dough: "",
          sauce: "",
          ingredients: "",
        };
      },
    },
    rootClass: {
      type: String,
      default: "",
    },
  },
};
</script>
