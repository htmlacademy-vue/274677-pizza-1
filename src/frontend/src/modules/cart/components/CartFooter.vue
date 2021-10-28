<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        to='/'
        class="button button--border button--arrow"
      >Хочу еще одну</router-link>
    </div>
    <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
    <div class="footer__price">
      <b>Итого: {{ cartValue }} ₽</b>
    </div>

    <div class="footer__submit">
      <AppButton
        type="submit"
        class="button"
        @click.prevent="onClick"
      >Оформить заказ</AppButton>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "CartFooter",

  components: {
    AppButton,
  },

  computed: mapGetters("Cart", ["cartValue"]),

  methods: {
    ...mapActions("Cart", ["placeOrder", "validateForm"]),

    async onClick() {
      if (!this.cartValue) {
        this.$notifier.error("Добавьте товары в корзину");

        return;
      }

      const isValid = await this.validateForm();
      if (!isValid) {
        return;
      }

      await this.placeOrder();
      this.$popup.open("cartPopup");
    },
  },
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("~@/assets/img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }
}
</style>
