<template>
  <div class="counter counter--orange ingridients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :class="`counter__button--${buttons.decrease.disabled ? 'disabled' : ''}`"
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
      :class="`counter__button--${buttons.increase.disabled ? 'disabled' : ''}`"
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
    },
  },
};
</script>
