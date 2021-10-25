import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const addPopup = (store) => {
  store.commit(SET_ENTITY, {
    module: "Popups",
    entity: "popups",
    value: {
      0: {
        isOpen: true,
      },
    },
  });
};

describe("AppLayout", () => {
  const slots = { default: "slots content" };
  const mocks = {
    $route: {
      meta: {
        layout: "",
      },
    },
    $router: {
      currentRoute: "",
    },
  };
  let store;
  let wrapper;

  const stubs = ["router-link"];
  const createComponent = (options) => {
    wrapper = mount(AppLayout, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders with slot content", () => {
    createComponent({
      slots,
      localVue,
      store,
      mocks,
      stubs,
    });

    expect(wrapper.html()).toContain(slots.default);
  });

  it("show overlay if is any popup open", () => {
    addPopup(store);
    createComponent({
      slots,
      localVue,
      store,
      mocks,
      stubs,
    });

    expect(wrapper.findComponent({ name: "AppOverlay" }).isVisible()).toBe(
      true
    );
  });
});
