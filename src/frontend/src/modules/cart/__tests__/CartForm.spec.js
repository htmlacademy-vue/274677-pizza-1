import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import CartForm from "@/modules/cart/components/CartForm";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import { RECIVE_ORDER_TYPES } from "@/common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);

const setForm = (
  store,
  reciveOrderType = RECIVE_ORDER_TYPES.TAKE_AWAY,
  isAddressSaved = false
) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "form",
    value: {
      inputs: {
        reciveOrderType,
        phone: "89999999999",
        street: "test street",
        building: "test building",
        flat: "test flat",
        comment: "test comment",
      },
      validations: {
        phone: {
          error: "test phone error message",
          rules: ["phone", "required"],
        },
        street: {
          error: "test street error message",
          rules: ["required"],
        },
        building: {
          error: "test building error message",
          rules: ["required"],
        },
      },
      isAddressSaved,
    },
  });
};

describe("CartForm", () => {
  let wrapper;
  let store;
  let actions;

  const stubs = ["router-link"];
  const createComponent = (options) => {
    wrapper = mount(CartForm, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        changeForm: jest.fn(),
        setValidationError: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders recive order types", () => {
    setForm(store);
    createComponent({ store, localVue, stubs });

    const options = wrapper.findAll(".select option");
    expect(Array.from(options).length).toEqual(
      store.getters["Cart/reciveOrderTypes"].length
    );
    expect(options.at(0).element.selected).toBe(true);
    expect(options.at(0).element.value).toBe(
      store.getters["Cart/reciveOrderTypes"][0].id
    );
  });

  it("phone input value is Cart.form.inputs.phone", () => {
    setForm(store);
    createComponent({ store, localVue, stubs });

    const phoneInput = wrapper.find("[name='phone']");
    expect(phoneInput.element.value).toBe(store.state.Cart.form.inputs.phone);
  });

  it("show phone error message", () => {
    setForm(store);
    createComponent({ store, localVue, stubs });

    expect(wrapper.html()).toContain(
      store.state.Cart.form.validations.phone.error
    );
  });

  it("render address inputs", () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    const addressInputsWrapper = wrapper.find(".cart-form__address");
    expect(addressInputsWrapper.exists()).toBeTruthy();
  });

  it("doesnt render address inputs", () => {
    setForm(store);
    createComponent({ store, localVue, stubs });

    const addressInputsWrapper = wrapper.find(".cart-form__address");
    expect(addressInputsWrapper.exists()).toBeFalsy();
  });

  it("street input value is Cart.form.inputs.street", () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    const streetInput = wrapper.find("[name='street']");
    expect(streetInput.element.value).toBe(store.state.Cart.form.inputs.street);
  });

  it("show street error message", () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    expect(wrapper.html()).toContain(
      store.state.Cart.form.validations.street.error
    );
  });

  it("building input value is Cart.form.inputs.building", () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    const buildingInput = wrapper.find("[name='building']");
    expect(buildingInput.element.value).toBe(
      store.state.Cart.form.inputs.building
    );
  });

  it("show building error message", () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    expect(wrapper.html()).toContain(
      store.state.Cart.form.validations.building.error
    );
  });

  it("building input disabled attribute is Cart.form.isAddressSaved", () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS, true);
    createComponent({ store, localVue, stubs });

    const buildingInput = wrapper.find("[name='building']");
    expect(buildingInput.attributes("disabled")).toBe("disabled");
  });

  it("flat input value is Cart.form.inputs.flat", () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    const buildingInput = wrapper.find("[name='flat']");
    expect(buildingInput.element.value).toBe(store.state.Cart.form.inputs.flat);
  });

  it("flat input disabled attribute is Cart.form.isAddressSaved", () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS, true);
    createComponent({ store, localVue, stubs });

    const buildingInput = wrapper.find("[name='flat']");
    expect(buildingInput.attributes("disabled")).toBe("disabled");
  });

  it("calls the vuex actions on change recive order type", async () => {
    setForm(store);
    createComponent({ store, localVue, stubs });

    const select = wrapper.find("select");
    await select.trigger("change");

    expect(actions.Cart.changeForm).toHaveBeenCalled();
  });

  it("calls the vuex actions on change phone", async () => {
    setForm(store);
    createComponent({ store, localVue, stubs });

    const phoneInput = wrapper.find("[name='phone']");
    await phoneInput.trigger("input");

    expect(actions.Cart.changeForm).toHaveBeenCalled();
    expect(actions.Cart.setValidationError).toHaveBeenCalled();
  });

  it("calls the vuex actions on change street", async () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    const streetInput = wrapper.find("[name='street']");
    await streetInput.trigger("input");

    expect(actions.Cart.changeForm).toHaveBeenCalled();
    expect(actions.Cart.setValidationError).toHaveBeenCalled();
  });

  it("calls the vuex actions on change building", async () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    const buildingInput = wrapper.find("[name='building']");
    await buildingInput.trigger("input");

    expect(actions.Cart.changeForm).toHaveBeenCalled();
    expect(actions.Cart.setValidationError).toHaveBeenCalled();
  });

  it("calls the vuex actions on change flat", async () => {
    setForm(store, RECIVE_ORDER_TYPES.NEW_ADDRESS);
    createComponent({ store, localVue, stubs });

    const flatInput = wrapper.find("[name='flat']");
    await flatInput.trigger("input");

    expect(actions.Cart.changeForm).toHaveBeenCalled();
  });
});

/*
  template

  v-for="reciveType in reciveOrderTypes"
  @change="changeForm({value: $event.target.value, name: $event.target.name})"
  v-model.lazy="phone"
  :error-text="form.validations.phone.error"
  v-if="form.inputs.reciveOrderType !== takeAway"
  v-model.lazy="street"
  :disabled="form.isAddressSaved"
  :error-text="form.validations.street.error"
  v-model.lazy="building"
  :disabled="form.isAddressSaved"
  :error-text="form.validations.building.error"
  v-model.lazy="flat"
  :disabled="form.isAddressSaved"

  script

  ...mapState("Cart", ["form"]),
  ...mapGetters("Cart", ["reciveOrderTypes"]),
  mapActions("Cart", ["changeForm", "setValidationError"]),
*/
