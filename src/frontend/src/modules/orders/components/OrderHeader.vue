<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ orderNumber }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ orderPrice }} ₽</span>
    </div>

    <div class="order__button">
      <AppButton
        class="button--border"
        data-test="delete-order-button"
        @click="onDelete"
      >Удалить</AppButton>
    </div>
    <div class="order__button">
      <AppButton
        data-test="repeat-order-button"
        @click="onRepeat"
      >Повторить</AppButton>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AppButton from "@/common/components/AppButton.vue";

export default {
  name: "OrderHeader",

  components: {
    AppButton,
  },

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

<style lang="scss" scoped>
.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}
</style>
