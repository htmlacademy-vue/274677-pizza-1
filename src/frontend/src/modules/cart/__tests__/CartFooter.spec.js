import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import CartFooter from "@/modules/cart/components/CartFooter";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import misc from "@/static/misc.json";
import { RECIVE_ORDER_TYPES } from "@/common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

const setStore = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "misc",
    value: misc.map((item) => ({ ...item, count: 2 })),
  });

  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "form",
    value: {
      inputs: {
        reciveOrderType: RECIVE_ORDER_TYPES.TAKE_AWAY,
        phone: "89999999999",
        street: "test",
        building: "test",
        flat: "test",
        comment: "",
      },
      validations: {
        phone: {
          error: "",
          rules: ["phone", "required"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
      },
      isAddressSaved: false,
    },
  });
};

describe("CartFooter", () => {
  let wrapper;
  let store;
  let actions;

  const mocks = {
    $popup: {
      open: jest.fn(),
    },
  };

  const stubs = ["router-link"];
  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        placeOrder: jest.fn(),
        validateForm: jest.fn(() => Promise.resolve(true)),
      },
    };

    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders cartValue", () => {
    setStore(store);
    createComponent({ store, localVue, stubs });

    const price = wrapper.find(".footer__price");
    expect(price.html()).toContain(store.getters["Cart/cartValue"]);
  });

  it("calls placeOrder on submit button click", async () => {
    setStore(store);
    createComponent({ store, localVue, stubs, mocks });

    const submitButton = wrapper.find("button");
    await submitButton.trigger("click");

    expect(actions.Cart.placeOrder).toHaveBeenCalled();
  });

  it("doesn't call placeOrder on submit button click", async () => {
    actions = {
      Cart: {
        placeOrder: jest.fn(),
        validateForm: jest.fn(() => Promise.resolve(false)),
      },
    };
    store = generateMockStore(actions);

    setStore(store);
    createComponent({ store, localVue, stubs, mocks });

    const submitButton = wrapper.find("button");
    await submitButton.trigger("click");

    expect(actions.Cart.placeOrder).not.toHaveBeenCalled();
  });
});
