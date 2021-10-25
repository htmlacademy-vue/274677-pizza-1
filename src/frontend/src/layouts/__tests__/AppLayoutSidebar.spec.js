import { shallowMount } from "@vue/test-utils";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

describe("AppLayoutSidebar", () => {
  let wrapper;

  const slots = { default: "slot content" };
  const stubs = ["router-link"];
  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders slot content", () => {
    createComponent({
      slots,
      stubs,
    });

    expect(wrapper.html()).toContain(slots.default);
  });
});
