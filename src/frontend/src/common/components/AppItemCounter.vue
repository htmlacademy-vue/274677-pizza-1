<template>
  <div
    class="counter"
    :class="rootClass"
  >
    <button
      type="button"
      class="counter__button counter__button--minus"
      data-test="decrease-button"
      v-bind="buttons.decrease"
      @click="$emit('countChange', additionalEmitData, 'decrease')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      v-bind="$attrs"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      data-test="increase-button"
      v-bind="buttons.increase"
      @click="$emit('countChange', additionalEmitData, 'increase')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppItemCounter",

  props: {
    count: {
      type: Number,
      required: true,
      default: 0,
    },

    additionalEmitData: {
      type: undefined, // Any type
    },

    buttons: {
      type: Object,
      default: function () {
        return {
          increase: {},
          decrease: {},
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
