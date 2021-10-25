import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import pizza from "@/static/pizza.json";
import { PIZZA_VALUES_BY_NAME } from "@/common/constants";
import {
  CHANGE_PIZZA_INGREDIENT,
  CHANGE_PIZZA_TYPE,
} from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let store;
  let mutations;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    mutations = {
      Builder: {
        [CHANGE_PIZZA_TYPE]: jest.fn(),
        [CHANGE_PIZZA_INGREDIENT]: jest.fn(),
      },
    };
    store = generateMockStore(false, mutations);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders sauce items", () => {
    setSauces(store);
    createComponent({ store, localVue });

    const sauces = wrapper.findAll("label");
    expect(Array.from(sauces).length).toEqual(pizza.sauces.length);
  });

  it("sauce radio button attributes setted from store", () => {
    setSauces(store);
    createComponent({ store, localVue });

    const firstSauceFromState = store.state.Builder.sauces[0];

    const sauceButton = wrapper.find("[name='sauce']");
    expect(sauceButton.element.value).toBe(firstSauceFromState.value);
    expect(sauceButton.element.checked).toBe(true);
  });

  it("renders ingredients", () => {
    setIngredients(store);
    createComponent({ store, localVue });

    const ingredients = wrapper.findAll(".ingredients__item");
    expect(Array.from(ingredients).length).toEqual(pizza.ingredients.length);
  });

  it("ingredient filling class contains ingredient value", () => {
    setIngredients(store);
    createComponent({ store, localVue });

    const firstIngredientFromState = store.state.Builder.ingredients[0];

    const ingredients = wrapper.findAll(".ingredients__item");
    expect(ingredients.at(0).find(".filling").attributes("class")).toContain(
      firstIngredientFromState.value
    );
  });

  it("ingredient drag component props comes from store", () => {
    setIngredients(store);
    createComponent({ store, localVue });

    const firstIngredientFromState = store.state.Builder.ingredients[0];

    const dragComponent = wrapper.findComponent({ name: "AppDrag" });
    expect(dragComponent.props("transferData")).toBe(firstIngredientFromState);
    expect(dragComponent.props("isDraggable")).toBe(true);
  });

  it("ingredient count props comes from store", () => {
    setIngredients(store);
    createComponent({ store, localVue });

    const firstIngredientFromState = store.state.Builder.ingredients[0];

    const ingredientsCounter = wrapper.findComponent({
      name: "AppItemCounter",
    });
    expect(ingredientsCounter.props("count")).toBe(
      firstIngredientFromState.count
    );
    expect(ingredientsCounter.props("additionalEmitData")).toBe(
      firstIngredientFromState
    );
    expect(ingredientsCounter.props("buttons")).toMatchObject({
      increase: { disabled: false },
      decrease: { disabled: true },
    });
  });

  it("calls the vuex mutation on sauce change", async () => {
    setSauces(store);
    createComponent({ localVue, store });

    const sauceItem = wrapper.find("[name='sauce']");
    await sauceItem.trigger("change");

    expect(mutations.Builder[CHANGE_PIZZA_TYPE]).toHaveBeenCalled();
  });

  it("calls the vuex mutation on ingredient change", () => {
    setIngredients(store);
    createComponent({ localVue, store });

    const ingredientItem = wrapper.findComponent({ name: "AppItemCounter" });
    ingredientItem.vm.$emit("countChange", pizza.ingredients[0], "increase");

    expect(mutations.Builder[CHANGE_PIZZA_INGREDIENT]).toHaveBeenCalled();
  });
});
