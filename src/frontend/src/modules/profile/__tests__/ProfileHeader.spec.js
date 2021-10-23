import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
import ProfileHeader from "@/modules/profile/components/ProfileHeader";
import user from "@/static/user";

const localVue = createLocalVue();
localVue.use(Vuex);

const authenticateUser = (store) => {
  store.commit(SET_ENTITY, {
    module: "Auth",
    entity: "user",
    value: user,
  });
};

describe("ProfileHeader", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = mount(ProfileHeader, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders component", () => {
    authenticateUser(store);
    createComponent({
      localVue,
      store,
    });

    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.html()).toContain(store.state.Auth.user.name);
    expect(wrapper.html()).toContain(store.state.Auth.user.phone);
  });

  it("source srcset attribute is avatarPaths getter", () => {
    authenticateUser(store);
    createComponent({
      localVue,
      store,
    });

    const sourceElement = wrapper.find("source");

    expect(sourceElement.attributes("srcset")).toContain(
      store.getters["Auth/avatarPaths"].webp["2x"]
    );
    expect(sourceElement.attributes("srcset")).toContain(
      store.getters["Auth/avatarPaths"].webp["4x"]
    );
  });

  it("image attributes setted from store", () => {
    authenticateUser(store);
    createComponent({
      localVue,
      store,
    });

    const img = wrapper.find(".user img");

    expect(img.attributes("src")).toBe(
      store.getters["Auth/avatarPaths"].jpg["2x"]
    );
    expect(img.attributes("srcset")).toBe(
      store.getters["Auth/avatarPaths"].jpg["4x"]
    );
    expect(img.attributes("alt")).toBe(store.state.Auth.user.name);
  });
});
