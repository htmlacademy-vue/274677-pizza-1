import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import { CHANGE_FORM_MODE } from "@/store/mutation-types";

import ProfileAddresses from "@/modules/profile/components/ProfileAddresses";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("ProfileAddresses", () => {
  let wrapper;
  let store;
  let mutations;

  const createComponent = (options) => {
    wrapper = mount(ProfileAddresses, options);
  };

  beforeEach(() => {
    mutations = {
      Addresses: {
        CHANGE_FORM_MODE: jest.fn(),
      },
    };
    store = generateMockStore(false, mutations);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders addresses", () => {
    setAddresses(store);
    createComponent({
      localVue,
      store,
    });

    const addresses = wrapper.findAll(".sheet.address-form");
    expect(Array.from(addresses).length).toEqual(
      store.state.Addresses.addresses.length
    );
  });

  it("doesn't render comment", () => {
    setAddresses(store, "");
    createComponent({
      localVue,
      store,
    });

    const comment = wrapper.find("small");
    expect(comment.exists()).toBeFalsy();
  });

  it("renders comment", () => {
    setAddresses(store);
    createComponent({
      localVue,
      store,
    });

    const comment = wrapper.find("small");
    expect(comment.exists()).toBeTruthy();
  });

  it("calls vuex mutation on edit button click ", async () => {
    setAddresses(store);
    createComponent({
      localVue,
      store,
    });

    const button = wrapper.find("[data-test='edit-address-button']");
    await button.trigger("click");

    expect(mutations.Addresses[CHANGE_FORM_MODE]).toHaveBeenCalled();
  });
});
