import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import { PIZZA_VALUES_BY_NAME } from "@/common/constants";

import OrderHeader from "@/modules/orders/components/OrderHeader";

const localVue = createLocalVue();
localVue.use(Vuex);

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

const setMisc = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "misc",
    value: misc.map((item, index) => ({
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

describe("OrderHeader", () => {
  let wrapper;
  let store;
  let actions;

  const propsData = {
    orderNumber: "test order number",
    orderPrice: "test order price",
  };
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const createComponent = (options) => {
    wrapper = mount(OrderHeader, options);
  };

  beforeEach(() => {
    actions = {
      Orders: {
        deleteOrder: jest.fn(),
        repeatOrder: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders orderNumber from props", () => {
    createComponent({
      localVue,
      mocks,
      store,
      propsData,
    });

    expect(wrapper.html()).toContain(propsData.orderNumber);
  });

  it("renders orderPrice from props", () => {
    createComponent({
      localVue,
      mocks,
      store,
      propsData,
    });

    expect(wrapper.html()).toContain(propsData.orderPrice);
  });

  it("calls vuex action on delete button click ", async () => {
    createComponent({
      localVue,
      mocks,
      store,
      propsData,
    });

    const button = wrapper.find("[data-test='delete-order-button']");
    await button.trigger("click");

    expect(actions.Orders.deleteOrder).toHaveBeenCalled();
  });

  it("calls vuex action on repeat button click ", async () => {
    setOrders(store);
    setMisc(store);
    setIngredients(store);
    setDough(store);
    setSauces(store);
    setSizes(store);

    createComponent({
      localVue,
      mocks,
      store,
      propsData: {
        ...propsData,
        orderNumber: 1,
      },
    });

    const button = wrapper.find("[data-test='repeat-order-button']");
    await button.trigger("click");

    expect(actions.Orders.repeatOrder).toHaveBeenCalled();
  });

  it("redirect to cart page on repeat button click ", async () => {
    setOrders(store);
    setMisc(store);
    setIngredients(store);
    setDough(store);
    setSauces(store);
    setSizes(store);

    createComponent({
      localVue,
      mocks,
      store,
      propsData: {
        ...propsData,
        orderNumber: 1,
      },
    });

    const button = wrapper.find("[data-test='repeat-order-button']");
    await button.trigger("click");

    expect(mocks.$router.push).toHaveBeenCalledWith("/cart");
  });
});
