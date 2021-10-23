import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import AppNotifications from "@/common/components/AppNotifications";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const addNotifications = (store) => {
  store.commit(SET_ENTITY, {
    module: "Notifications",
    entity: "notifications",
    value: [{ text: "test text", type: "warning" }],
  });
};

describe("AppNotifications", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppNotifications, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("doesn't render out when no notifications", () => {
    createComponent({ localVue, store });
    expect(wrapper.html()).toBeFalsy();
  });

  it("renders out when we have notifications", () => {
    addNotifications(store);
    createComponent({ localVue, store });
    expect(wrapper.html()).toBeTruthy();
  });

  it("renders out notification", () => {
    addNotifications(store);
    createComponent({ localVue, store });
    expect(wrapper.html()).toContain("notification--warning");
    expect(wrapper.html()).toContain("text");
  });
});
