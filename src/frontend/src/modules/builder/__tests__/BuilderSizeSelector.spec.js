import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import pizza from "@/static/pizza.json";
import { PIZZA_VALUES_BY_NAME } from "@/common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render size items", () => {
    setSizes(store);
    createComponent({ localVue, store });

    const sizeFromState = store.state.Builder.sizes[1];

    const sizeItems = wrapper.findAll("label");
    expect(Array.from(sizeItems).length).toEqual(pizza.sizes.length);
    expect(sizeItems.at(1).attributes("class")).toContain(sizeFromState.value);
  });

  it("size radio button attributes setted from store", () => {
    setSizes(store);
    createComponent({ localVue, store });

    const sizeFromState = store.state.Builder.sizes[1];

    const sizeButton = wrapper.findAll("[name='diameter']").at(1);
    expect(sizeButton.element.value).toBe(sizeFromState.value);
    expect(sizeButton.element.checked).toBe(sizeFromState.checked);
  });

  it("calls the vuex mutations on size change", async () => {
    setSizes(store);
    createComponent({ localVue, store });

    const spyOnAction = jest.spyOn(wrapper.vm, "change");
    const button = wrapper.find("[name='diameter']");
    await button.trigger("change");

    expect(spyOnAction).toHaveBeenCalledWith({
      type: "sizes",
      value: button.element.value,
    });
  });
});
