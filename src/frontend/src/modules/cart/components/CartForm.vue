<template>
  <div class="cart__form">
    <div class="cart-form">

      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="reciveOrderType"
          class="select"
          @change="change"
        >
          <option
            v-for="reciveType in reciveOrderTypes"
            :key="reciveType.id"
            :value="reciveType.id"
          >{{ reciveType.text }}</option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="tel"
          inputmode="tel"
          name="phone"
          placeholder="+7 999-999-99-99"
          pattern="+7 [0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
          :value="form.phone"
          @change="change"
        />
      </label>

      <div
        v-if="form.reciveOrderType !== '-1'"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              required
              :disabled="form.isAddressSaved"
              :value="form.street"
              @change="change"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="building"
              required
              :disabled="form.isAddressSaved"
              :value="form.building"
              @change="change"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="flat"
              :disabled="form.isAddressSaved"
              :value="form.flat"
              @change="change"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "CartForm",

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Cart", ["form"]),
    ...mapGetters("Cart", ["reciveOrderTypes"]),
  },

  methods: {
    ...mapActions("Cart", ["changeForm"]),

    change(event) {
      const { name, value } = event.target;
      this.changeForm({ name, value });
    },
  },
};
</script>
