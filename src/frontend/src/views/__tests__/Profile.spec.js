import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import Profile from "@/views/Profile.vue";
import "@/plugins/vuexPlugins";
import { ADDRESS_FORM_MODE } from "@/common/constants";
import { CHANGE_FORM_MODE } from "@/store/mutation-types";
import AppButton from "@/common/components/AppButton";

const setMode = (store) => {
  store.commit(SET_ENTITY, {
    module: "Profile",
    entity: "mode",
    value: ADDRESS_FORM_MODE.NEW,
  });
};

const setAddresses = (store, comment = "рабочий адрес") => {
  store.commit(SET_ENTITY, {
    module: "Profile",
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

  const stubs = {
    AppButton,
  };

  const createComponent = (options) => {
    wrapper = shallowMount(Profile, options);
  };

  beforeEach(() => {
    actions = {
      Profile: {
        fetchAddresses: jest.fn(() => Promise.resolve()),
      },
    };
    mutations = {
      Profile: {
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

    expect(actions.Profile.fetchAddresses).toHaveBeenCalled();
  });

  it("doesn't calls fetch adresses on component created", () => {
    setAddresses(store);

    createComponent({
      localVue,
      store,
    });

    expect(actions.Profile.fetchAddresses).not.toHaveBeenCalled();
  });

  it("calls vuex mutation on new address button click", async () => {
    createComponent({
      localVue,
      store,
      stubs,
    });

    const button = wrapper.find("[data-test='new-address-button']");
    await button.trigger("click");

    expect(mutations.Profile[CHANGE_FORM_MODE]).toHaveBeenCalled();
  });
});
