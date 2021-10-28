import { shallowMount } from "@vue/test-utils";
import AppTitle from "@/common/components/AppTitle";

describe("AppTitle", () => {
  const slots = { default: "content" };
  const propsData = { tag: "h3" };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppTitle, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("default title is h1", () => {
    createComponent();
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  it("title tag is prop tag", () => {
    createComponent({ slots, propsData });
    expect(wrapper.find(propsData.tag).exists()).toBeTruthy();
  });
});
