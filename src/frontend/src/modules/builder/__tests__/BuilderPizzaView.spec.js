import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import pizza from "@/static/pizza.json";
import { PIZZA_VALUES_BY_NAME } from "@/common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

const addPizzaName = (store) => {
  store.commit(SET_ENTITY, {
    module: "Builder",
    entity: "name",
    value: "test name",
  });
};

const addDough = (store) => {
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

const addSauces = (store) => {
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

const addIngredients = (store) => {
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

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("input value is Builder.name", () => {
    addPizzaName(store);
    createComponent({ store, localVue });

    const input = wrapper.find("input");
    expect(input.element.value).toBe("test name");
  });

  it("pizza element class contains dough class and sauce class", () => {
    addDough(store);
    addSauces(store);
    createComponent({ store, localVue });

    const pizzaElement = wrapper.find(".pizza");

    expect(pizzaElement.attributes("class")).toContain("small");
    expect(pizzaElement.attributes("class")).toContain(
      store.getters["Builder/selectedItems"].sauce.value
    );
  });

  it("render ingredientsFilling", () => {
    addIngredients(store);
    createComponent({ store, localVue });

    const pizzaFillings = wrapper.findAll(".pizza__filling");

    expect(Array.from(pizzaFillings).length).toEqual(
      store.getters["Builder/ingredientsFilling"].length
    );
    expect(pizzaFillings.at(1).attributes("class")).toContain(
      store.getters["Builder/ingredientsFilling"][1].class
    );
  });

  it("calls the vuex action on name change", async () => {
    addPizzaName(store);
    createComponent({ localVue, store });

    const spyOnAction = jest.spyOn(wrapper.vm, "changeName");
    const input = wrapper.find("input");
    await input.trigger("input");

    expect(spyOnAction).toHaveBeenCalled();
  });
});
