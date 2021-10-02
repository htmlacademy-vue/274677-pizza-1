<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
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

export default {
  name: "Cart",

  components: {
    CartMisc,
    CartPizza,
    CartForm,
    CartFooter,
    CartPopup,
  },

  computed: {
    ...mapState("Cart", ["misc", "pizza"]),
    ...mapState("Addresses", ["addresses"]),
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
    ...mapActions("Addresses", ["fetchAddresses"]),
  },
};
</script>
