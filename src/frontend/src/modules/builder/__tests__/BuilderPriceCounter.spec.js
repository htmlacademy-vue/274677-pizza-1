import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { generateMockStore } from "@/store/mocks";
import { ADD_TO_CART } from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  let mutations;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        resetState: jest.fn(),
      },
    };
    mutations = {
      Cart: {
        [ADD_TO_CART]: jest.fn(),
      },
    };
    store = generateMockStore(actions, mutations);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls the vuex mutations on button click", async () => {
    createComponent({ localVue, store });

    const button = wrapper.find("button");
    button.element.disabled = false;
    await button.trigger("click");

    expect(mutations.Cart[ADD_TO_CART]).toHaveBeenCalled();
  });

  it("calls the vuex actions on button click", async () => {
    createComponent({ localVue, store });

    const button = wrapper.find("button");
    button.element.disabled = false;
    await button.trigger("click");

    expect(actions.Builder.resetState).toHaveBeenCalled();
  });
});
