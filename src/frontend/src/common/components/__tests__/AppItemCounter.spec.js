import { shallowMount } from "@vue/test-utils";
import AppItemCounter from "@/common/components/AppItemCounter";

describe("AppItemCounter", () => {
  const propsData = {
    count: 0,
    additionalEmitData: "test data",
    buttons: {
      decrease: {
        class: "decrease test class",
      },
      increase: {
        class: "increase test class",
      },
    },
    rootClass: "test root class",
    placeholder: "test placehodler",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("input value is prop count", () => {
    createComponent({ propsData });

    let input = wrapper.find("input");
    expect(input.element.value).toBe(String(propsData.count));
  });

  it("emit countChange event on decrease button", async () => {
    createComponent({ propsData });

    const decreaseButton = wrapper.find("[data-test='decrease-button'");
    await decreaseButton.trigger("click");

    expect(wrapper.emitted().countChange[0][1]).toBe("decrease");
  });

  it("emit countChange event on decrease button", async () => {
    createComponent({ propsData });

    const decreaseButton = wrapper.find("[data-test='decrease-button'");
    await decreaseButton.trigger("click");

    expect(wrapper.emitted().countChange[0][1]).toBe("decrease");
  });

  it("emit countChange event on decrease button with additionalEmitData prop", async () => {
    createComponent({ propsData });

    const decreaseButton = wrapper.find("[data-test='decrease-button'");
    await decreaseButton.trigger("click");

    expect(wrapper.emitted().countChange[0][0]).toBe(
      propsData.additionalEmitData
    );
  });

  it("emit countChange event on increase button", async () => {
    createComponent({ propsData });

    const increaseButton = wrapper.find("[data-test='increase-button'");
    await increaseButton.trigger("click");

    expect(wrapper.emitted().countChange[0][1]).toBe("increase");
  });

  it("emit countChange event on increase button with additionalEmitData prop", async () => {
    createComponent({ propsData });

    const increaseButton = wrapper.find("[data-test='increase-button'");
    await increaseButton.trigger("click");

    expect(wrapper.emitted().countChange[0][0]).toBe(
      propsData.additionalEmitData
    );
  });

  it("sets attributes to decrease button from buttons.decrease prop", () => {
    createComponent({ propsData });

    const decreaseButton = wrapper.find("[data-test='decrease-button'");

    expect(decreaseButton.attributes("class")).toContain(
      propsData.buttons.decrease.class
    );
  });

  it("sets attributes to increase button from buttons.increase prop", () => {
    createComponent({ propsData });

    const increaseButton = wrapper.find("[data-test='increase-button'");

    expect(increaseButton.attributes("class")).toContain(
      propsData.buttons.increase.class
    );
  });

  it("sets attributes to input from $attrs", () => {
    createComponent({ propsData });

    const input = wrapper.find("input");

    expect(input.attributes("placeholder")).toContain(propsData.placeholder);
  });

  it("root element class is rootClass prop", () => {
    createComponent({ propsData });

    expect(wrapper.attributes("class")).toContain(propsData.rootClass);
  });
});
