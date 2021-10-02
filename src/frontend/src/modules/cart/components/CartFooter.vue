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
      <button
        type="submit"
        class="button"
        @click.prevent="onClick"
      >Оформить заказ</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartFooter",

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
