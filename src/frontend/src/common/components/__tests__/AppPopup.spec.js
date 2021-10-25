import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import AppPopup from "@/common/components/AppPopup";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const addPopup = (store, isOpenValue = false) => {
  store.commit(SET_ENTITY, {
    module: "Popups",
    entity: "popups",
    value: {
      0: {
        isOpen: isOpenValue,
      },
    },
  });
};

describe("AppPopup", () => {
  const slots = { default: "slots content" };
  const propsData = {
    id: "0",
  };

  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppPopup, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("doesn't render out when isOpen is set to false", () => {
    addPopup(store);
    createComponent({ localVue, store, propsData });

    expect(wrapper.find("[data-test='popup']").exists()).toBeFalsy();
  });

  it("renders out when isOpen is set to true", () => {
    addPopup(store, true);
    createComponent({ localVue, store, propsData });

    expect(wrapper.find("[data-test='popup']").exists()).toBeTruthy();
  });

  it("render with slot content", () => {
    addPopup(store, true);
    createComponent({
      slots,
      propsData,
      localVue,
      store,
    });

    expect(wrapper.find("[data-test='popup']").html()).toContain(slots.default);
  });

  it("emit close event", () => {
    addPopup(store, true);

    createComponent({
      propsData,
      localVue,
      store,
    });

    wrapper.find("a").trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
  });
});
