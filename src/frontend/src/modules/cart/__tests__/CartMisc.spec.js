import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import CartMisc from "@/modules/cart/components/CartMisc";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import misc from "@/static/misc.json";
import { CHANGE_MISC_COUNT } from "@/store/mutation-types";

const localVue = createLocalVue();
localVue.use(Vuex);

const setMisc = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "misc",
    value: misc.map((item, index) => ({
      ...item,
      count: index >= 1 ? 1 : 0,
    })),
  });
};

describe("CartMisc", () => {
  let wrapper;
  let store;
  let mutations;

  const createComponent = (options) => {
    wrapper = mount(CartMisc, options);
  };

  beforeEach(() => {
    mutations = {
      Cart: {
        [CHANGE_MISC_COUNT]: jest.fn(),
      },
    };
    store = generateMockStore(false, mutations);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders misc items", () => {
    setMisc(store);
    createComponent({ store, localVue });

    const firstMiscItemFromStore = misc[0];
    const miscItems = wrapper.findAll(".additional-list__item");
    const firstMiscItem = miscItems.at(0);

    expect(Array.from(miscItems).length).toEqual(misc.length);
    expect(
      firstMiscItem.find(".additional-list__description span").html()
    ).toContain(firstMiscItemFromStore.name);
    expect(firstMiscItem.html()).toContain(firstMiscItemFromStore.price);
  });

  it("misc image attributes setted from store", () => {
    setMisc(store);
    createComponent({ store, localVue });

    const firstMiscItemFromStore = misc[0];
    const firstMiscItem = wrapper.find(".additional-list__item");
    const firstMiscItemImage = firstMiscItem.find("img");

    expect(firstMiscItemImage.attributes("src")).toBe(
      firstMiscItemFromStore.image
    );
    expect(firstMiscItemImage.attributes("alt")).toBe(
      firstMiscItemFromStore.name
    );
  });

  it("misc counter props setted from store", () => {
    setMisc(store);
    createComponent({ store, localVue });

    const firstMiscItemFromStore = store.state.Cart.misc[0];
    const firstMiscCounter = wrapper.findComponent({ name: "AppItemCounter" });

    expect(firstMiscCounter.props("count")).toBe(firstMiscItemFromStore.count);
    expect(firstMiscCounter.props("additionalEmitData")).toBe(
      firstMiscItemFromStore
    );
    expect(firstMiscCounter.props("buttons")).toMatchObject({
      increase: {
        class: "counter__button--orange",
      },
      decrease: {
        disabled: true,
      },
    });
  });

  it("calls the vuex mutation on misc count change", () => {
    setMisc(store);
    createComponent({ localVue, store });

    const miscCounter = wrapper.findComponent({ name: "AppItemCounter" });
    miscCounter.vm.$emit("countChange", misc[0], "increase");

    expect(mutations.Cart[CHANGE_MISC_COUNT]).toHaveBeenCalled();
  });
});
