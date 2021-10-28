import { shallowMount } from "@vue/test-utils";
import AppInput from "@/common/components/AppInput";

describe("AppInput", () => {
  const errorClass = "text-field__input--error";
  const propsData = {
    value: "test value",
    name: "test name",
    type: "text",
    placeholder: "test placeholder",
    errorText: "test error text",
    required: true,
    disabled: false,
    title: "test title",
    hideTitle: false,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppInput, options);
  };

  afterEach(() => {
    propsData.errorText = "test error text";
    propsData.hideTitle = false;
    wrapper.destroy();
  });

  it("sets initial model value", () => {
    createComponent({ propsData });

    let input = wrapper.find("input");

    expect(input.element.value).toBe(propsData.value);
  });

  it("emit input event", () => {
    createComponent({ propsData });

    let input = wrapper.find("input");
    input.trigger("input");

    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("emit change event", () => {
    createComponent({ propsData });

    let input = wrapper.find("input");
    input.trigger("change");

    expect(wrapper.emitted().change).toBeTruthy();
  });

  it("emit input event with current input value", () => {
    createComponent({ propsData });

    const testValue = "test value";
    let input = wrapper.find("input");
    input.element.value = testValue;
    input.trigger("input");

    expect(wrapper.emitted().input[0][0]).toBe(testValue);
  });

  it("emit change event with current input value", () => {
    createComponent({ propsData });

    const testValue = "test value";
    let input = wrapper.find("input");
    input.element.value = testValue;
    input.trigger("change");

    expect(wrapper.emitted().change[0][0]).toBe(testValue);
  });

  it("input type is prop type", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("type")).toBe(propsData.type);
  });

  it("input name is prop name", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("name")).toBe(propsData.name);
  });

  it("input placeholder is prop placeholder", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("placeholder")).toBe(propsData.placeholder);
  });

  it("input required is prop required", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("required")).toBe("required");
  });

  it("input disabled is prop disabled", () => {
    createComponent({ propsData: { ...propsData, disabled: true } });
    let input = wrapper.find("input");
    expect(input.attributes("disabled")).toBe("disabled");
  });

  it("input title is hidden when hideTitle prop is passed", () => {
    propsData.hideTitle = true;
    createComponent({ propsData: { ...propsData, disabled: true } });
    const title = wrapper.find("[data-test='input-title']");
    expect(title.attributes("class")).toContain("visually-hidden");
  });

  it("input title is prop title", () => {
    createComponent({ propsData: { ...propsData, disabled: true } });
    expect(wrapper.html()).toContain(propsData.title);
  });

  it("has error class", () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("class")).toContain(errorClass);
  });

  it("doesn't have error class", () => {
    propsData.errorText = "";
    createComponent({ propsData });
    let input = wrapper.find("input");
    expect(input.attributes("class")).not.toContain(errorClass);
  });

  it("has error message", () => {
    createComponent({ propsData });
    expect(wrapper.find(".text-field__text").exists()).toBeTruthy();
  });

  it("doesn't have error message", () => {
    propsData.errorText = "";
    createComponent({ propsData });
    expect(wrapper.find(".text-field__text").exists()).toBeFalsy();
  });
});
