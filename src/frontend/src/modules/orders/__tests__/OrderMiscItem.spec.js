import { shallowMount } from "@vue/test-utils";

import OrderMiscItem from "@/modules/orders/components/OrderMiscItem";

describe("OrderMiscItem", () => {
  let wrapper;

  const propsData = {
    miscItem: {
      image: "misc item image",
      name: "mics item name",
      price: {
        text: "price text",
      },
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(OrderMiscItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders component", () => {
    createComponent({
      propsData,
    });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toContain(propsData.miscItem.name);
    expect(wrapper.html()).toContain(propsData.miscItem.price.text);
  });

  it("img attributes setted from miscItem prop", () => {
    createComponent({
      propsData,
    });

    expect(wrapper.find("img").attributes("src")).toBe(
      propsData.miscItem.image
    );
    expect(wrapper.find("img").attributes("alt")).toBe(propsData.miscItem.name);
  });
});
