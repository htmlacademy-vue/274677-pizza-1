<template>
  <div class="text-field">
    <input
      ref="input"
      class="text-field__input"
      :value="value"
      :type="type"
      :name="name"
      :class="{'text-field__input--error': showError}"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      @input="$emit('input', $event.target.value, name)"
      @change="$emit('change', $event.target.value, name)"
    />
    <span
      v-if="showError"
      class="text-field__text"
    >
      {{ errorText }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppInput",

  model: {
    prop: "value",
    event: "input",
  },

  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    showError() {
      return !!this.errorText;
    },
  },
};
</script>

<style lang="scss" scoped>
.text-field {
  position: relative;

  &__input {
    &--error {
      border-color: $red-600;
    }
  }

  &__text {
    position: absolute;
    top: 40px;
    left: 0;

    color: $red-600;

    @include r-s10-h12;
  }
}
</style>
