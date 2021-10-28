<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <AppButton
      type="button"
      :class="`${isButtonDisabled ? 'button--disabled' : ''}`"
      :disabled="isButtonDisabled"
      @click="onClick"
    >
      Готовьте!
    </AppButton>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { ADD_TO_CART } from "@/store/mutation-types";

import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "BuilderPriceCounter",

  components: {
    AppButton,
  },

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

<style lang="scss" scoped>
.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
