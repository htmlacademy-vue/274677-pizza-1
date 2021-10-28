<template>
  <div>
    <div class="layout__title">
      <AppTitle class="title--big">История заказов</AppTitle>
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
import AppTitle from "@/common/components/AppTitle";
import { auth } from "@/middlewares";

export default {
  name: "Orders",

  middlewares: [auth],

  layout: "AppLayoutSidebar",

  components: {
    OrderHeader,
    OrderPizzaItem,
    OrderMiscItem,
    AppTitle,
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

<style lang="scss">
@import "~@/assets/scss/mixins/m_clear-list.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
