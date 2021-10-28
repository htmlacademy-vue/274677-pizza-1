import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import CartPopup from "@/modules/cart/components/CartPopup";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import user from "@/static/user";

const localVue = createLocalVue();
localVue.use(Vuex);

const authenticateUser = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "user",
    value: user,
  });
};

const addPopup = (store, isOpenValue = true) => {
  store.commit(SET_ENTITY, {
    module: "Popups",
    entity: "popups",
    value: {
      cartPopup: {
        isOpen: isOpenValue,
      },
    },
  });
};

describe("CartPopup", () => {
  let wrapper;
  let store;

  const transitionStub = () => ({
    render: function () {
      return this.$options._renderChildren;
    },
  });

  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $popup: {
      register: jest.fn(),
      close: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = mount(CartPopup, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    mocks.$router.push = jest.fn();
    mocks.$popup.register = jest.fn();
    mocks.$popup.close = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls 'register' plugin method on component created", () => {
    addPopup(store);
    createComponent({
      localVue,
      store,
      mocks,
      stubs: {
        transition: transitionStub(),
      },
    });

    expect(mocks.$popup.register).toHaveBeenCalled();
  });

  it("calls 'close' plugin method on popup button close", async () => {
    addPopup(store);
    createComponent({
      localVue,
      store,
      mocks,
      stubs: {
        transition: transitionStub(),
      },
    });
    const btn = wrapper.find(".popup__button");

    await btn.trigger("click");
    expect(mocks.$popup.close).toHaveBeenCalled();
  });

  it("redirect to main page on after leave hook when user isn't authorized", () => {
    addPopup(store);
    createComponent({
      localVue,
      store,
      mocks,
      stubs: {
        transition: transitionStub(),
      },
    });
    const popup = wrapper.findComponent({ name: "AppPopup" });
    popup.vm.$emit("afterLeave");

    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("redirect to order page on after leave hook when user is authorized", () => {
    addPopup(store);
    authenticateUser(store);

    createComponent({
      localVue,
      store,
      mocks,
      stubs: {
        transition: transitionStub(),
      },
    });
    const popup = wrapper.findComponent({ name: "AppPopup" });
    popup.vm.$emit("afterLeave");

    expect(mocks.$router.push).toHaveBeenCalledWith("/orders");
  });
});
