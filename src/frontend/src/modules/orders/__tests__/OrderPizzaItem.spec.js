import { mount } from "@vue/test-utils";

import OrderPizzaItem from "@/modules/orders/components/OrderPizzaItem";

describe("OrderPizzaItem", () => {
  let wrapper;

  const propsData = {
    pizzaItem: {
      name: "pizza item name",
      productText: {
        dough: "dough propduct text",
        size: "size propduct text",
        sauce: "sauce propduct text",
        ingredients: "ingredients propduct text",
      },
      price: {
        text: "price text",
      },
    },
  };

  const createComponent = (options) => {
    wrapper = mount(OrderPizzaItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders component", () => {
    createComponent({
      propsData,
    });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toContain(propsData.pizzaItem.price.text);
  });

  it("AppPropduct prop setted from miscItem prop", () => {
    createComponent({
      propsData,
    });

    const { pizzaItem } = propsData;
    const { productText, name } = pizzaItem;
    const productComponent = wrapper.findComponent({ name: "AppProduct" });
    expect(productComponent.props("product")).toMatchObject({
      name: name,
      size: productText.size,
      dough: productText.dough,
      sauce: productText.sauce,
      ingredients: productText.ingredients,
    });
  });
});
