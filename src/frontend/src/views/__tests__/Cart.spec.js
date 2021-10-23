import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import misc from "@/static/misc.json";
import user from "@/static/user";

import Cart from "@/views/Cart.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

const authenticateUser = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "user",
    value: user,
  });
};

const setPizza = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "pizza",
    value: [
      {
        selected: {
          dough: {
            id: 1,
            name: "Тонкое",
            image: "/public/img/dough-light.svg",
            description: "Из твердых сортов пшеницы",
            price: 300,
            value: "light",
            checked: true,
          },
          size: {
            id: 3,
            name: "45 см",
            image: "/public/img/diameter.svg",
            multiplier: 3,
            value: "large",
            checked: true,
          },
          sauce: {
            id: 2,
            name: "Сливочный",
            price: 50,
            value: "creamy",
            checked: true,
          },
          ingredients: [
            {
              id: 3,
              name: "Бекон",
              image: "/public/img/filling/bacon.svg",
              price: 42,
              value: "bacon",
              count: 2,
            },
            {
              id: 6,
              name: "Халапеньо",
              image: "/public/img/filling/jalapeno.svg",
              price: 25,
              value: "jalapeno",
              count: 2,
            },
          ],
        },
        name: "dasdas",
        price: 1452,
        id: "2",
        productText: {
          size: "45 см",
          dough: "на тонком тесте",
          sauce: "сливочный",
          ingredients: "бекон, халапеньо",
        },
        count: 1,
      },
      {
        selected: {
          dough: {
            id: 2,
            name: "Толстое",
            image: "/public/img/dough-large.svg",
            description: "Из твердых сортов пшеницы",
            price: 300,
            value: "large",
            checked: true,
          },
          size: {
            id: 1,
            name: "23 см",
            image: "/public/img/diameter.svg",
            multiplier: 1,
            value: "small",
            checked: true,
          },
          sauce: {
            id: 1,
            name: "Томатный",
            price: 50,
            value: "tomato",
            checked: true,
          },
          ingredients: [
            {
              id: 1,
              name: "Грибы",
              image: "/public/img/filling/mushrooms.svg",
              price: 33,
              value: "mushrooms",
              count: 2,
            },
            {
              id: 10,
              name: "Лосось",
              image: "/public/img/filling/salmon.svg",
              price: 50,
              value: "salmon",
              count: 2,
            },
            {
              id: 15,
              name: "Блю чиз",
              image: "/public/img/filling/blue_cheese.svg",
              price: 50,
              value: "blue_cheese",
              count: 2,
            },
          ],
        },
        name: "sads",
        price: 616,
        id: "3",
        productText: {
          size: "23 см",
          dough: "на толстом тесте",
          sauce: "томатный",
          ingredients: "грибы, лосось, блю чиз",
        },
        count: 1,
      },
    ],
  });
};

const setAddresses = (store, comment = "рабочий адрес") => {
  store.commit(SET_ENTITY, {
    module: "Addresses",
    entity: "addresses",
    value: [
      {
        id: 1,
        name: "Работа",
        street: "Удальцова",
        building: "36",
        flat: "22",
        comment,
        userId: "5e06ba32-e20e-4802-9a1a-9da7dd314b62",
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

const actions = {
  Cart: {
    fetchMisc: jest.fn(() => Promise.resolve()),
    fetchAddresses: jest.fn(() => Promise.resolve()),
  },
};

describe("Cart", () => {
  let wrapper;
  let store;

  const mocks = {
    $api: {
      misc: {
        get: jest.fn(() => Promise.resolve()),
      },
    },
  };
  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
  };

  beforeEach(() => {
    store = generateMockStore(actions);
    mocks.$api.misc.get = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders CartPizza component", () => {
    setPizza(store);
    createComponent({
      localVue,
      store,
      mocks,
    });

    const pizzaComponent = wrapper.findComponent({ name: "CartPizza" });
    expect(pizzaComponent.exists()).toBeTruthy();
  });

  it("doesn't render CartPizza component", () => {
    createComponent({
      localVue,
      store,
      mocks,
    });

    const pizzaComponent = wrapper.findComponent({ name: "CartPizza" });
    const emptyCartMessage = wrapper.find(".sheet.cart__empty");
    expect(pizzaComponent.exists()).toBeFalsy();
    expect(emptyCartMessage.exists()).toBeTruthy();
  });

  it("calls vuex actions on component created", () => {
    authenticateUser(store);

    const spyOnFetchMisc = jest.spyOn(Cart.methods, "fetchMisc");
    const spyOnFetchAddresses = jest.spyOn(Cart.methods, "fetchAddresses");

    createComponent({
      localVue,
      store,
    });

    expect(spyOnFetchMisc).toHaveBeenCalled();
    expect(spyOnFetchAddresses).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  it("doesnt call vuex actions on component created", () => {
    setMisc(store);
    setAddresses(store);

    const spyOnFetchMisc = jest.spyOn(Cart.methods, "fetchMisc");
    const spyOnFetchAddresses = jest.spyOn(Cart.methods, "fetchAddresses");

    createComponent({
      localVue,
      store,
    });

    expect(spyOnFetchMisc).not.toHaveBeenCalled();
    expect(spyOnFetchAddresses).not.toHaveBeenCalled();

    jest.restoreAllMocks();
  });
});
