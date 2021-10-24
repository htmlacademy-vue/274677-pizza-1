import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import pizza from "@/static/pizza.json";
import { PIZZA_VALUES_BY_NAME } from "@/common/constants";
import { CHANGE_PIZZA_TYPE } from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;
  let mutations;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    mutations = {
      Builder: {
        [CHANGE_PIZZA_TYPE]: jest.fn(),
      },
    };
    store = generateMockStore(false, mutations);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders dough items", () => {
    setDough(store);
    createComponent({ store, localVue });

    const firstDoughFromState = store.state.Builder.dough[0];

    const doughItems = wrapper.findAll("label");
    expect(Array.from(doughItems).length).toEqual(pizza.dough.length);
    expect(doughItems.at(0).attributes("class")).toContain(
      firstDoughFromState.value
    );
  });

  it("dough radio button attributes setted from store", () => {
    setDough(store);
    createComponent({ store, localVue });

    const firstDoughFromState = store.state.Builder.dough[0];

    const doughButton = wrapper.find("[name='dough']");
    expect(doughButton.element.value).toBe(firstDoughFromState.value);
    expect(doughButton.element.checked).toBe(true);
  });

  it("calls the vuex mutation on dough change", async () => {
    setDough(store);
    createComponent({ localVue, store });

    const doughItem = wrapper.find("[name='dough']");
    await doughItem.trigger("change");

    expect(mutations.Builder[CHANGE_PIZZA_TYPE]).toHaveBeenCalled();
  });
});
