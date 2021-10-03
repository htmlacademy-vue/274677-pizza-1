<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :class="`${isButtonDisabled ? 'button--disabled' : ''}`"
      :disabled="isButtonDisabled"
      @click="onClick"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { ADD_TO_CART } from "@/store/mutation-types";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapState("Builder", ["name", "id"]),
    ...mapGetters("Builder", ["selectedItems", "pizzaPrice"]),

    isButtonDisabled() {
      return !this.name || !this.selectedItems.ingredients.length;
    },
  },

  methods: {
    ...mapMutations("Cart", {
      addToCart: ADD_TO_CART,
    }),
    ...mapActions("Builder", ["resetState"]),

    onClick() {
      const { selectedItems: selected, name, pizzaPrice: price, id } = this;

      this.addToCart({
        selected,
        name,
        price,
        id,
      });
      this.resetState();
    },
  },
};
</script>
