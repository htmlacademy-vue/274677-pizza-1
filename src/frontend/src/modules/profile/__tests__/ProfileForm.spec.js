import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import { ADDRESS_FORM_MODE } from "@/common/constants";
import ProfileForm from "@/modules/profile/components/ProfileForm";
import user from "@/static/user";
import $validator from "@/common/mixins/validator";

const localVue = createLocalVue();
localVue.use(Vuex);

const authenticateUser = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "user",
    value: user,
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

const setEditedAddress = (store) => {
  store.commit(SET_ENTITY, {
    module: "Addresses",
    entity: "editedAddress",
    value: {
      id: 1,
      name: "Работа",
      street: "Удальцова",
      building: "36",
      flat: "22",
      comment: "рабочий адрес",
      userId: "5e06ba32-e20e-4802-9a1a-9da7dd314b62",
    },
  });
};

const setMode = (store, value = null) => {
  store.commit(SET_ENTITY, {
    module: "Addresses",
    entity: "mode",
    value,
  });
};

describe("ProfileForm", () => {
  let wrapper;
  let store;

  const mocks = {
    $validator,
  };

  const createComponent = (options) => {
    wrapper = mount(ProfileForm, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders delete address button", () => {
    setMode(store, ADDRESS_FORM_MODE.EDIT);
    createComponent({
      localVue,
      store,
    });

    const button = wrapper.find("[data-test='delete-address-button']");
    expect(button.isVisible()).toBeTruthy();
  });

  it("doesn't render delete address button with edit mode = new", () => {
    setMode(store, ADDRESS_FORM_MODE.NEW);
    createComponent({
      localVue,
      store,
    });

    const button = wrapper.find("[data-test='delete-address-button']");
    expect(button.isVisible()).toBeFalsy();
  });

  it("doesn't render delete address button without edit mode", () => {
    setMode(store);
    createComponent({
      localVue,
      store,
    });

    const button = wrapper.find("[data-test='delete-address-button']");
    expect(button.isVisible()).toBeFalsy();
  });

  it("calls vuex action on delete button click", async () => {
    setAddresses(store);
    setMode(store, ADDRESS_FORM_MODE.EDIT);
    setEditedAddress(store);
    authenticateUser(store);

    createComponent({
      localVue,
      store,
    });

    const spyOnAction = jest.spyOn(wrapper.vm, "deleteAddress");
    const button = wrapper.find("[data-test='delete-address-button']");
    await button.trigger("click");

    expect(spyOnAction).toHaveBeenCalled();
  });

  it("calls vuex action on save button click with edit mode = edit", async () => {
    setAddresses(store);
    setMode(store, ADDRESS_FORM_MODE.EDIT);
    setEditedAddress(store);
    authenticateUser(store);

    createComponent({
      localVue,
      store,
      mocks,
    });

    await wrapper.setData({
      values: {
        name: "Работа 2",
        street: "Удальцова 2",
        building: "362",
        flat: "221",
      },
    });

    const spyOnEditAddress = jest.spyOn(wrapper.vm, "editAddress");
    const spyOnValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    const button = wrapper.find("[data-test='save-address-button']");
    await button.trigger("click");

    expect(spyOnEditAddress).toHaveBeenCalled();
    expect(spyOnValidateFields).toHaveBeenCalled();
  });

  it("calls vuex action on save button click with edit mode = new", async () => {
    setAddresses(store);
    setMode(store, ADDRESS_FORM_MODE.NEW);
    setEditedAddress(store);
    authenticateUser(store);

    createComponent({
      localVue,
      store,
      mocks,
    });

    await wrapper.setData({
      values: {
        name: "Работа 2",
        street: "Удальцова 2",
        building: "362",
        flat: "221",
      },
    });

    const spyOnNewAddress = jest.spyOn(wrapper.vm, "newAddress");
    const spyOnValidateFields = jest.spyOn(wrapper.vm, "$validateFields");
    const button = wrapper.find("[data-test='save-address-button']");
    await button.trigger("click");

    expect(spyOnNewAddress).toHaveBeenCalled();
    expect(spyOnValidateFields).toHaveBeenCalled();
  });
});

/*
  template

  v-show="mode === ADDRESS_FORM_MODE.EDIT"
  @click="onDelete"
  @click.prevent="onSave"

  script

  ...mapState("Addresses", ["addresses", "editedAddress", "mode"]),
  ...mapActions("Addresses", ["editAddress", "deleteAddress", "newAddress"]),
*/
