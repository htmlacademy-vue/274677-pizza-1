import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutation-types";
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

describe("AppLayoutHeader", () => {
  let store;
  let wrapper;

  const mocks = {
    $router: {
      push: jest.fn(),
    },
    $notifier: {
      success: jest.fn(),
    },
  };

  const actions = {
    Auth: {
      logout: jest.fn(),
    },
  };

  const stubs = ["router-link"];
  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders user picture", () => {
    authenticateUser(store);

    createComponent({
      localVue,
      store,
      stubs,
    });

    expect(wrapper.find("[data-test='user-picture']").exists()).toBe(true);
  });

  it("source srcset attribute is avatarPaths getter", () => {
    authenticateUser(store);
    createComponent({
      localVue,
      store,
      stubs,
    });

    const sourceElement = wrapper.find("[data-test='user-picture'] source");

    expect(sourceElement.attributes("srcset")).toContain(
      store.getters["Auth/avatarPaths"].webp["1x"]
    );
    expect(sourceElement.attributes("srcset")).toContain(
      store.getters["Auth/avatarPaths"].webp["2x"]
    );
  });

  it("image attributes setted from store", () => {
    authenticateUser(store);
    createComponent({
      localVue,
      store,
      stubs,
    });

    const img = wrapper.find("[data-test='user-picture'] img");

    expect(img.attributes("src")).toBe(
      store.getters["Auth/avatarPaths"].jpg["1x"]
    );
    expect(img.attributes("srcset")).toBe(
      store.getters["Auth/avatarPaths"].jpg["2x"]
    );
    expect(img.attributes("alt")).toBe(store.state.Auth.user.name);
  });

  it("set login link to '/login' if no user", () => {
    createComponent({
      localVue,
      store,
      stubs,
    });

    const routerLink = wrapper.find("[data-test='login-link']");

    expect(routerLink.attributes("to")).toBe("/login");
  });

  it("set login link to '/' if user is authenticated", () => {
    authenticateUser(store);

    createComponent({
      localVue,
      store,
      stubs,
    });

    const routerLink = wrapper.find("[data-test='login-link']");

    expect(routerLink.attributes("to")).toBe("/");
  });

  it("set login link class to 'header__login' if no user", () => {
    createComponent({
      localVue,
      store,
      stubs,
    });

    const routerLink = wrapper.find("[data-test='login-link']");

    expect(routerLink.attributes("class")).toBe("header__login");
  });

  it("set login link class to 'header__logout' if user is authenticated", () => {
    authenticateUser(store);

    createComponent({
      localVue,
      store,
      stubs,
    });

    const routerLink = wrapper.find("[data-test='login-link']");

    expect(routerLink.attributes("class")).toBe("header__logout");
  });

  it("calls logout on logout button click", async () => {
    authenticateUser(store);
    createComponent({ localVue, mocks, store, stubs });

    const logoutBtn = wrapper.find('[data-test="login-link"]');
    await logoutBtn.trigger("click");

    expect(actions.Auth.logout).toHaveBeenCalled();
    expect(mocks.$notifier.success).toHaveBeenCalled();
    expect(mocks.$router.push).toHaveBeenCalledWith("/login");
  });
});

/*
  Список элементов для тестирования
    v-if="user"
    :to="`${user ? '/' : '/login'}`"
    :class="`header__${user ? 'logout' : 'login'}`"
    @click.native="user && $logout()"
    mapActions("Auth", ["logout"])

  Данные из стора
    ...mapState("Auth", ["user"]),
    ...mapGetters("Auth", ["avatarPaths"]),
    ...mapGetters("Cart", ["cartValue"]),
*/
