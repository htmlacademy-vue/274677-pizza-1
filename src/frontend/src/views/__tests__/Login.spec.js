import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import $validator from "@/common/mixins/validator";

import Login from "@/views/Login.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login", () => {
  let wrapper;
  let store;

  const mocks = {
    $popup: {
      register: jest.fn(),
      open: jest.fn(),
      close: jest.fn(),
    },
    $router: {
      push: jest.fn(),
    },
    $validator,
    $api: {
      auth: {
        login: jest.fn(),
      },
    },
  };

  const stubs = ["router-link"];

  const createComponent = (options) => {
    wrapper = shallowMount(Login, options);
  };

  beforeEach(() => {
    store = generateMockStore();

    mocks.$popup.close = jest.fn();
    mocks.$popup.open = jest.fn();
    mocks.$popup.register = jest.fn();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls popup register on component created", () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
    });

    expect(mocks.$popup.register).toHaveBeenCalled();
  });

  it("calls popup open on component mounted", () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
    });

    expect(mocks.$popup.open).toHaveBeenCalled();
  });

  it("calls popup close on component destroyed", () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
    });

    wrapper.destroy();

    expect(mocks.$popup.close).toHaveBeenCalled();
  });

  it("calls validate fields on submit button click", async () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
    });

    const spyOnValidateFields = jest.spyOn(wrapper.vm, "$validateFields");

    const submitButton = wrapper.find("button");
    await submitButton.trigger("click");

    expect(spyOnValidateFields).toHaveBeenCalled();
  });

  it("calls login action and redirect to main page on submit click", async () => {
    createComponent({
      localVue,
      store,
      mocks,
      stubs,
    });

    const spyOnActions = jest
      .spyOn(wrapper.vm, "login")
      .mockImplementation(() => Promise.resolve());

    await wrapper.setData({
      email: "user@example.com",
      password: "user@example.com",
    });

    const submitButton = wrapper.find("button");
    await submitButton.trigger("click");

    expect(spyOnActions).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
