import { shallowMount } from "@vue/test-utils";
import AppRadioButton from "@/common/components/AppRadioButton";

describe("AppRadioButton", () => {
  const propsData = {
    id: "test id",
    value: "test value",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets attributes from $attrs", () => {
    createComponent({ propsData });

    expect(wrapper.attributes("id")).toContain(propsData.id);
    expect(wrapper.attributes("value")).toContain(propsData.value);
  });

  it("emits change event on change", () => {
    createComponent({ propsData });

    wrapper.trigger("change");
    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("emits change event with value from props", () => {
    createComponent({ propsData });

    wrapper.trigger("change");
    expect(wrapper.emitted().change[0][0]).toBe(propsData.value);
  });
});
