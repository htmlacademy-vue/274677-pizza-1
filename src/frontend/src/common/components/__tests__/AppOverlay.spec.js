import { shallowMount } from "@vue/test-utils";
import AppOverlay from "@/common/components/AppOverlay";

describe("AppOverlay", () => {
  const propsData = {
    count: 0,
    id: "test id",
  };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppOverlay, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("sets attributes from $attrs", () => {
    createComponent({ propsData });

    expect(wrapper.attributes("id")).toContain(propsData.id);
  });
});
