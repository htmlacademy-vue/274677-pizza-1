<template>
  <div>
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <section
      v-for="orderItem in normalizedOrders"
      :key="orderItem.id"
      class="sheet order"
    >
      <OrderHeader
        :order-number="orderItem.id"
        :order-price="orderItem.price"
      />

      <ul class="order__list">
        <OrderPizzaItem
          v-for="pizzaItem in orderItem.pizza"
          :key="pizzaItem.id"
          :pizza-item="pizzaItem"
        />
      </ul>

      <ul class="order__additional">
        <OrderMiscItem
          v-for="miscItem in orderItem.misc"
          :key="miscItem.id"
          :misc-item="miscItem"
        />
      </ul>

      <p class="order__address">{{ orderItem.address ? `Адрес доставки: ${orderItem.address}` : "Самовывоз"}}</p>
    </section>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import OrderHeader from "@/modules/orders/components/OrderHeader.vue";
import OrderPizzaItem from "@/modules/orders/components/OrderPizzaItem.vue";
import OrderMiscItem from "@/modules/orders/components/OrderMiscItem.vue";
import { auth } from "@/middlewares";

export default {
  name: "Orders",

  middlewares: [auth],

  layout: "AppLayoutSidebar",

  components: {
    OrderHeader,
    OrderPizzaItem,
    OrderMiscItem,
  },

  computed: {
    ...mapState("Cart", ["misc"]),
    ...mapGetters("Orders", ["normalizedOrders"]),
  },

  created() {
    this.fetchOrders();

    if (!this.misc.length) {
      this.fetchMisc();
    }
  },

  methods: {
    ...mapActions("Orders", ["fetchOrders"]),
    ...mapActions("Cart", ["fetchMisc"]),
  },
};
</script>
