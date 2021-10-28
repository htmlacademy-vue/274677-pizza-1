<template>
  <label class="input">
    <span
      data-test="input-title"
      class="input__title"
      :class="{'visually-hidden': hideTitle}"
    >{{ title }}</span>
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
  </label>
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
    title: {
      type: String,
      default: "",
    },
    hideTitle: {
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
.input {
  display: block;

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;
  }

  &:hover {
    input {
      border-color: $black;
    }
  }
}

.input__title {
  @include r-s14-h16;

  display: block;

  margin-bottom: 4px;
}

.input--big-label .input__title {
  @include b-s16-h19;

  margin-right: 16px;

  white-space: nowrap;
}

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
