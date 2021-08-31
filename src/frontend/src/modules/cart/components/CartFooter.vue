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
        :disabled="!canPlaceOrder"
        @click="onClick"
      >Оформить заказ</button>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartFooter",

  computed: {
    ...mapGetters("Cart", ["canPlaceOrder", "cartValue"]),
  },

  methods: {
    ...mapActions("Cart", ["placeOrder"]),

    onClick(e) {
      e.preventDefault();

      this.placeOrder();
      this.$popup.open("cartPopup");
    },
  },
};
</script>
