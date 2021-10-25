import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import CartPizza from "@/modules/cart/components/CartPizza";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import { CHANGE_PIZZA_COUNT, SET_BUILDER_CONFIG } from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("CartPizza", () => {
  let wrapper;
  let store;
  let mutations;

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = mount(CartPizza, options);
  };

  beforeEach(() => {
    mutations = {
      Cart: {
        [CHANGE_PIZZA_COUNT]: jest.fn(),
      },
      Builder: {
        [SET_BUILDER_CONFIG]: jest.fn(),
      },
    };
    store = generateMockStore(false, mutations);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders pizzas", () => {
    setPizza(store);
    createComponent({ store, localVue });

    const storePizza = store.state.Cart.pizza;
    const pizzaItems = wrapper.findAll(".cart-list__item");

    expect(Array.from(pizzaItems).length).toEqual(storePizza.length);
    expect(pizzaItems.at(0).html()).toContain(storePizza[0].price);
  });

  it("pizza product text setted from store", () => {
    setPizza(store);
    createComponent({ store, localVue });

    const { productText, name } = store.state.Cart.pizza[0];
    const pizzaProductText = wrapper.findComponent({ name: "AppProduct" });

    expect(pizzaProductText.props("product")).toMatchObject({
      name: name,
      size: productText.size,
      dough: productText.dough,
      sauce: productText.sauce,
      ingredients: productText.ingredients,
    });
  });

  it("pizza counter props comes from store", () => {
    setPizza(store);
    createComponent({ store, localVue });

    const storePizza = store.state.Cart.pizza;
    const pizzaCounter = wrapper.findComponent({ name: "AppItemCounter" });

    expect(pizzaCounter.props("additionalEmitData")).toBe(storePizza[0]);
    expect(pizzaCounter.props("count")).toBe(storePizza[0].count);
    expect(pizzaCounter.props("buttons")).toMatchObject({
      increase: {
        class: "counter__button--orange",
      },
      decrease: {
        class: `counter__button--${storePizza[0].count <= 0 ? "disabled" : ""}`,
        disabled: false,
      },
    });
  });

  it("calls the vuex mutation on pizza count change", () => {
    setPizza(store);
    createComponent({ localVue, store });

    const storePizza = store.state.Cart.pizza;
    const pizzaCounter = wrapper.findComponent({ name: "AppItemCounter" });
    pizzaCounter.vm.$emit("countChange", storePizza[0], "increase");

    expect(mutations.Cart[CHANGE_PIZZA_COUNT]).toHaveBeenCalled();
  });

  it("calls the vuex mutations on change pizza click", async () => {
    setPizza(store);
    createComponent({ localVue, store, mocks });

    const changeButton = wrapper.find("[data-test='pizza-change-button']");
    await changeButton.trigger("click");

    expect(mutations.Builder[SET_BUILDER_CONFIG]).toHaveBeenCalled();
  });

  it("redirect to main page on change pizza click", async () => {
    setPizza(store);
    createComponent({ localVue, store, mocks });

    const changeButton = wrapper.find("[data-test='pizza-change-button']");
    await changeButton.trigger("click");

    expect(mocks.$router.push).toHaveBeenCalled();
  });
});
