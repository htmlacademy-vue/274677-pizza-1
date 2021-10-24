import { shallowMount } from "@vue/test-utils";
import AppDrag from "@/common/components/AppDrag";

describe("AppDrag", () => {
  const disabledClass = "draggable--disabled";
  const slots = { default: "slot content" };
  const defaultTransferData = {
    data: "test data",
  };
  const defaultIsDraggable = true;

  const propsData = {
    transferData: {
      data: "default data",
    },
    isDraggable: false,
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, options);
  };

  beforeEach(() => {
    propsData.isDraggable = false;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("render with slot content", () => {
    createComponent({
      slots,
      propsData,
    });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("default component draggable is true", () => {
    createComponent({ propsData: { transferData: defaultTransferData } });

    expect(wrapper.attributes("draggable")).toBe(String(defaultIsDraggable));
  });

  it("components draggable attribute is isDraggable prop", () => {
    createComponent({ propsData });

    expect(wrapper.attributes("draggable")).toBe(String(propsData.isDraggable));
  });

  it("has disabled class", () => {
    createComponent({ propsData });

    expect(wrapper.attributes("class")).toContain(disabledClass);
  });

  it("doesn't have disabled class", () => {
    propsData.isDraggable = true;
    createComponent({ propsData });

    expect(wrapper.attributes("class")).not.toContain(disabledClass);
  });
});
