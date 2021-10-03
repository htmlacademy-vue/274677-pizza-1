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
        <label class="input input--big-label">
          <span>Контактный телефон:</span>
          <AppInput
            v-model.lazy="phone"
            type="tel"
            inputmode="tel"
            name="phone"
            placeholder="+7 999-999-99-99"
            required
            :error-text="form.validations.phone.error"
          />
        </label>
      </div>

      <div
        v-if="form.inputs.reciveOrderType !== takeAway"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <AppInput
              v-model.lazy="street"
              type="text"
              name="street"
              required
              :disabled="form.isAddressSaved"
              :error-text="form.validations.street.error"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <AppInput
              v-model.lazy="building"
              type="text"
              name="building"
              required
              :disabled="form.isAddressSaved"
              :error-text="form.validations.building.error"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <AppInput
              v-model.lazy="flat"
              type="text"
              name="flat"
              :disabled="form.isAddressSaved"
            />
          </label>
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

<style scoped>
.form-wrapper {
  display: flex;
  align-items: center;
}
</style>
