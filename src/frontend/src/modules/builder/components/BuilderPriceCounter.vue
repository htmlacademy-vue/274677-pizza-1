<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <button
      type="button"
      class="button"
      :class="`${isButtonDisabled ? 'button--disabled' : ''}`"
      :disabled="isButtonDisabled"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    price: {
      type: Number,
      required: true,
      default: 0,
    },

    isButtonDisabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
