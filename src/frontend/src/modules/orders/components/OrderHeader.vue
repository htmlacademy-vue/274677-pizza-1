<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ orderNumber }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ orderPrice }} ₽</span>
    </div>

    <div class="order__button">
      <button
        type="button"
        class="button button--border"
        @click="onDelete"
      >Удалить</button>
    </div>
    <div class="order__button">
      <button
        type="button"
        class="button"
        @click="onRepeat"
      >Повторить</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "OrderHeader",

  props: {
    orderNumber: {
      type: [String, Number],
      required: true,
      default: 0,
    },

    orderPrice: {
      type: [Number, String],
      required: true,
      default: 0,
    },
  },

  methods: {
    ...mapActions("Orders", ["deleteOrder", "repeatOrder"]),

    onDelete() {
      this.deleteOrder(this.orderNumber);
    },

    onRepeat() {
      this.repeatOrder(this.orderNumber);
      this.$router.push("/cart");
    },
  },
};
</script>
