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

  const stubs = ["router-link"];
  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    store = generateMockStore();
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

  it("calls the vuex actions on submit button click", async () => {
    setStore(store);
    createComponent({ store, localVue, stubs });

    const spyOnValidateForm = jest.spyOn(wrapper.vm, "validateForm");
    const spyOnPlaceOrder = jest.spyOn(wrapper.vm, "placeOrder");
    const submitButton = wrapper.find("button");
    await submitButton.trigger("click");

    expect(spyOnValidateForm).toHaveBeenCalled();
    expect(spyOnPlaceOrder).toHaveBeenCalled();
  });
});
