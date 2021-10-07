<template>
  <AppPopup
    :id="'cartPopup'"
    @close="onClick"
    @afterLeave="afterLeave"
  >
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <a
        href="#"
        class="button"
        @click.prevent="onClick"
      >Отлично, я жду!</a>
    </div>
  </AppPopup>
</template>

<script>
import { mapState } from "vuex";
import AppPopup from "@/common/components/AppPopup.vue";

export default {
  name: "CartPopup",

  components: {
    AppPopup,
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
