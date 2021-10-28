<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <AppTitle class="title--big">Корзина</AppTitle>
        </div>

        <CartPizza v-if="pizza.length" />
        <div
          v-else
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <CartMisc />

        <CartForm />
      </div>
    </main>
    <CartFooter />
    <CartPopup />
  </form>
</template>

<script>
import CartMisc from "@/modules/cart/components/CartMisc.vue";
import CartPizza from "@/modules/cart/components/CartPizza.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartPopup from "@/modules/cart/components/CartPopup.vue";
import { mapActions, mapState } from "vuex";
import AppTitle from "@/common/components/AppTitle";

export default {
  name: "Cart",

  components: {
    CartMisc,
    CartPizza,
    CartForm,
    CartFooter,
    CartPopup,
    AppTitle,
  },

  computed: {
    ...mapState("Cart", ["misc", "pizza"]),
    ...mapState("Profile", ["addresses"]),
    ...mapState("Auth", ["user"]),
  },

  created() {
    if (!this.misc.length) {
      this.fetchMisc();
    }

    if (this.user && !this.addresses.length) {
      this.fetchAddresses();
    }
  },

  methods: {
    ...mapActions("Cart", ["fetchMisc"]),
    ...mapActions("Profile", ["fetchAddresses"]),
  },
};
</script>

<style lang="scss" scoped>
.cart__empty {
  padding: 20px 30px;
}

.cart__title {
  margin-bottom: 15px;
}

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
