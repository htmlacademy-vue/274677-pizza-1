import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls the vuex mutations on button click", async () => {
    createComponent({ localVue, store });

    const spyOnAction = jest.spyOn(wrapper.vm, "addToCart");
    const button = wrapper.find("button");
    button.element.disabled = false;
    await button.trigger("click");

    expect(spyOnAction).toHaveBeenCalled();
  });

  it("calls the vuex actions on button click", async () => {
    createComponent({ localVue, store });

    const spyOnAction = jest.spyOn(wrapper.vm, "resetState");
    const button = wrapper.find("button");
    button.element.disabled = false;
    await button.trigger("click");

    expect(spyOnAction).toHaveBeenCalled();
  });
});
