<template>
  <div class="cart__form">
    <div class="cart-form">

      <div class="form-wrapper">
        <label class="cart-form__select">
          <span class="cart-form__label">Получение заказа:</span>

          <select
            name="reciveOrderType"
            class="select"
            @change="changeForm({value: $event.target.value, name: $event.target.name})"
          >
            <option
              v-for="reciveType in reciveOrderTypes"
              :key="reciveType.id"
              :selected="reciveType.id === form.inputs.reciveOrderType"
              :value="reciveType.id"
            >{{ reciveType.text }}</option>
          </select>
        </label>
        <AppInput
          v-model.lazy="phone"
          type="tel"
          name="phone"
          placeholder="+7 999-999-99-99"
          title="Контактный телефон:"
          class="input--big-label"
          required
          :error-text="form.validations.phone.error"
        />
      </div>

      <div
        v-if="form.inputs.reciveOrderType !== takeAway"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <AppInput
            v-model.lazy="street"
            type="text"
            name="street"
            title="Улица*"
            required
            :disabled="form.isAddressSaved"
            :error-text="form.validations.street.error"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            v-model.lazy="building"
            type="text"
            name="building"
            title="Дом*"
            required
            :disabled="form.isAddressSaved"
            :error-text="form.validations.building.error"
          />
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            v-model.lazy="flat"
            type="text"
            name="flat"
            title="Квартира"
            :disabled="form.isAddressSaved"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { RECIVE_ORDER_TYPES } from "@/common/constants";

import AppInput from "@/common/components/AppInput.vue";

export default {
  name: "CartForm",

  components: {
    AppInput,
  },

  data() {
    return {
      takeAway: RECIVE_ORDER_TYPES.TAKE_AWAY,
    };
  },

  computed: {
    ...mapState("Cart", ["form"]),
    ...mapGetters("Cart", ["reciveOrderTypes"]),

    phone: {
      get() {
        return this.form.inputs.phone;
      },
      set(value) {
        this.changeForm({ name: "phone", value });
        if (this.form.validations.phone.error) {
          this.setValidationError({ name: "phone", error: "" });
        }
      },
    },
    street: {
      get() {
        return this.form.inputs.street;
      },
      set(value) {
        this.changeForm({ name: "street", value });
        if (this.form.validations.street.error) {
          this.setValidationError({ name: "street", error: "" });
        }
      },
    },
    building: {
      get() {
        return this.form.inputs.building;
      },
      set(value) {
        this.changeForm({ name: "building", value });
        if (this.form.validations.building.error) {
          this.setValidationError({ name: "building", error: "" });
        }
      },
    },
    flat: {
      get() {
        return this.form.inputs.flat;
      },
      set(value) {
        this.changeForm({ name: "flat", value });
      },
    },
  },

  methods: mapActions("Cart", ["changeForm", "setValidationError"]),
};
</script>

<style scoped lang="scss">
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: 30px;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.form-wrapper {
  display: flex;
  align-items: center;
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}
</style>
