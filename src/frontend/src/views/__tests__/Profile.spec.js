import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import Profile from "@/views/Profile.vue";
import "@/plugins/vuexPlugins";
import { ADDRESS_FORM_MODE } from "@/common/constants";
import { CHANGE_FORM_MODE } from "@/store/mutation-types";

const setMode = (store) => {
  store.commit(SET_ENTITY, {
    module: "Addresses",
    entity: "mode",
    value: ADDRESS_FORM_MODE.NEW,
  });
};

const setAddresses = (store, comment = "рабочий адрес") => {
  store.commit(SET_ENTITY, {
    module: "Addresses",
    entity: "addresses",
    value: [
      {
        id: 1,
        name: "Работа",
        street: "Удальцова",
        building: "36",
        flat: "22",
        comment,
        userId: "5e06ba32-e20e-4802-9a1a-9da7dd314b62",
      },
    ],
  });
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Profile", () => {
  let wrapper;
  let store;
  let actions;
  let mutations;

  const createComponent = (options) => {
    wrapper = shallowMount(Profile, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        fetchAddresses: jest.fn(() => Promise.resolve()),
      },
    };
    mutations = {
      Addresses: {
        [CHANGE_FORM_MODE]: jest.fn(),
      },
    };
    store = generateMockStore(actions, mutations);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders profile form", () => {
    setMode(store);
    createComponent({
      localVue,
      store,
    });

    const profileForm = wrapper.findComponent({ name: "ProfileForm" });

    expect(profileForm.isVisible()).toBeTruthy();
  });

  it("calls fetch adresses on component created", () => {
    createComponent({
      localVue,
      store,
    });

    expect(actions.Addresses.fetchAddresses).toHaveBeenCalled();
  });

  it("doesn't calls fetch adresses on component created", () => {
    setAddresses(store);

    createComponent({
      localVue,
      store,
    });

    expect(actions.Addresses.fetchAddresses).not.toHaveBeenCalled();
  });

  it("calls vuex mutation on new address button click", async () => {
    createComponent({
      localVue,
      store,
    });

    const button = wrapper.find("[data-test='new-address-button']");
    await button.trigger("click");

    expect(mutations.Addresses[CHANGE_FORM_MODE]).toHaveBeenCalled();
  });
});