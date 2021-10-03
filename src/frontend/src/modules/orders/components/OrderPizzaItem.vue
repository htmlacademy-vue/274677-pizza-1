<template>
  <li class="order__item">
    <AppProduct :product="productProp" />

    <p class="order__price">{{ pizzaItem.price.text }} ₽</p>
  </li>
</template>

<script>
import AppProduct from "@/common/components/AppProduct.vue";

export default {
  name: "OrderPizzaItem",

  components: {
    AppProduct,
  },

  props: {
    pizzaItem: {
      type: Object,
      required: true,
      default() {
        return {
          name: "",
          productText: {
            dough: "",
            size: "",
            sauce: "",
            ingredients: "",
          },
          price: {
            text: "",
          },
        };
      },
    },
  },

  computed: {
    productProp() {
      const { name, productText } = this.pizzaItem;

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
