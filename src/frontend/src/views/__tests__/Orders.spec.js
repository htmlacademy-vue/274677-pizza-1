import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import Orders from "@/views/Orders.vue";
import "@/plugins/vuexPlugins";
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import { PIZZA_VALUES_BY_NAME } from "@/common/constants";

const setOrders = (store) => {
  store.commit(SET_ENTITY, {
    module: "Orders",
    entity: "orders",
    value: [
      {
        id: 1,
        phone: "+79999999999",
        userId: "5e06ba32-e20e-4802-9a1a-9da7dd314b62",
        addressId: null,
        orderPizzas: [
          {
            id: 1,
            name: "sasd",
            quantity: 1,
            sauceId: 1,
            doughId: 1,
            sizeId: 2,
            orderId: 1,
            ingredients: [{ id: 1, quantity: 2, pizzaId: 1, ingredientId: 3 }],
          },
        ],
        orderMisc: [
          { id: 1, quantity: 0, orderId: 1, miscId: 1 },
          { id: 2, quantity: 0, orderId: 1, miscId: 2 },
          { id: 3, quantity: 1, orderId: 1, miscId: 3 },
        ],
      },
    ],
  });
};

const setMisc = (store, isEmpty) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "misc",
    value: isEmpty
      ? []
      : misc.map((item, index) => ({
          ...item,
          count: index >= 1 ? 1 : 0,
        })),
  });
};

const setIngredients = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "ingredients",
    value: pizza.ingredients.map((item, i) => ({
      ...item,
      value: PIZZA_VALUES_BY_NAME.ingredients[item.name],
      count: i > 10 ? 1 : 0,
    })),
  });
};

const setDough = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "dough",
    value: pizza.dough.map((item, index) => ({
      ...item,
      value: PIZZA_VALUES_BY_NAME.dough[item.name],
      checked: index === 0,
    })),
  });
};

const setSauces = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "sauces",
    value: pizza.sauces.map((item, index) => ({
      ...item,
      value: PIZZA_VALUES_BY_NAME.sauces[item.name],
      checked: index === 0,
    })),
  });
};

const setSizes = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "sizes",
    value: pizza.sizes.map((item, index) => ({
      ...item,
      value: PIZZA_VALUES_BY_NAME.sizes[item.name],
      checked: index === 1,
    })),
  });
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Orders", () => {
  let wrapper;
  let store;
  let actions;
  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        fetchMisc: jest.fn(() => Promise.resolve()),
      },
      Orders: {
        fetchOrders: jest.fn(() => Promise.resolve()),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders orders", () => {
    setOrders(store);
    setMisc(store);
    setIngredients(store);
    setDough(store);
    setSizes(store);
    setSauces(store);

    createComponent({
      localVue,
      store,
    });

    const orders = wrapper.findAll(".sheet.order");

    expect(Array.from(orders).length).toEqual(store.state.Orders.orders.length);
  });

  it("order header components props setted from store", () => {
    setOrders(store);
    setMisc(store);
    setIngredients(store);
    setDough(store);
    setSizes(store);
    setSauces(store);

    createComponent({
      localVue,
      store,
    });

    const firstOrder = store.getters["Orders/normalizedOrders"][0];
    const orderHeader = wrapper.findComponent({ name: "OrderHeader" });

    expect(orderHeader.props("orderNumber")).toEqual(firstOrder.id);
    expect(orderHeader.props("orderPrice")).toEqual(firstOrder.price);
  });

  it("renders order pizza items", () => {
    setOrders(store);
    setMisc(store);
    setIngredients(store);
    setDough(store);
    setSizes(store);
    setSauces(store);

    createComponent({
      localVue,
      store,
    });

    const firstOrder = store.getters["Orders/normalizedOrders"][0];
    const pizzaItems = wrapper.findAllComponents({ name: "OrderPizzaItem" });

    expect(Array.from(pizzaItems).length).toEqual(firstOrder.pizza.length);
    expect(pizzaItems.at(0).props("pizzaItem")).toEqual(firstOrder.pizza[0]);
  });

  it("renders order misc items", () => {
    setOrders(store);
    setMisc(store);
    setIngredients(store);
    setDough(store);
    setSizes(store);
    setSauces(store);

    createComponent({
      localVue,
      store,
    });

    const firstOrder = store.getters["Orders/normalizedOrders"][0];
    const miscItems = wrapper.findAllComponents({ name: "OrderMiscItem" });

    expect(Array.from(miscItems).length).toEqual(firstOrder.misc.length);
    expect(miscItems.at(0).props("miscItem")).toEqual(firstOrder.misc[0]);
  });

  it("calls fetch orders actions on component created", () => {
    setOrders(store);
    setMisc(store);
    setIngredients(store);
    setDough(store);
    setSizes(store);
    setSauces(store);

    createComponent({
      localVue,
      store,
    });

    expect(actions.Orders.fetchOrders).toHaveBeenCalled();
  });

  it("calls fetch misc actions on component created", () => {
    setMisc(store, true);
    setIngredients(store);
    setDough(store);
    setSizes(store);
    setSauces(store);

    createComponent({
      localVue,
      store,
    });

    expect(actions.Cart.fetchMisc).toHaveBeenCalled();
  });

  it("doesnt call fetch misc actions on component created", () => {
    setOrders(store);
    setMisc(store);
    setIngredients(store);
    setDough(store);
    setSizes(store);
    setSauces(store);

    createComponent({
      localVue,
      store,
    });

    expect(actions.Cart.fetchMisc).not.toHaveBeenCalled();
  });
});
