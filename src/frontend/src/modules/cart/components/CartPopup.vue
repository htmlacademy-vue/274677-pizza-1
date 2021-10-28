<template>
  <AppPopup
    :id="'cartPopup'"
    @close="onClick"
    @afterLeave="afterLeave"
  >
    <div class="popup__title">
      <AppTitle tag="h2">Спасибо за заказ</AppTitle>
    </div>
    <p class="popup__body">Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <AppButton
      class="popup__button"
      @click.prevent="onClick"
    >Отлично, я жду!</AppButton>
  </AppPopup>
</template>

<script>
import { mapState } from "vuex";
import AppPopup from "@/common/components/AppPopup.vue";
import AppButton from "@/common/components/AppButton.vue";
import AppTitle from "@/common/components/AppTitle";

export default {
  name: "CartPopup",

  components: {
    AppPopup,
    AppButton,
    AppTitle,
  },

  computed: mapState("Auth", ["user"]),

  created() {
    this.$popup.register("cartPopup");
  },

  methods: {
    onClick() {
      this.$popup.close("cartPopup");
    },
    afterLeave() {
      const routePath = this.user ? "/orders" : "/";
      this.$router.push(routePath);
    },
  },
};
</script>

<style lang="scss" scoped>
.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  padding: 16px 32px;
  width: 100%;
}

.popup__body {
  margin-top: 24px;
  margin-bottom: 24px;

  text-align: center;
}
</style>
