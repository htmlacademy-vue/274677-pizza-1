import { cloneDeep } from "lodash";
import { mutations } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";

export const generateMockStore = (actions, mockedMutations) => {
  const modulesCopy = cloneDeep(modules);

  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  if (mockedMutations) {
    Object.entries(mockedMutations).forEach(([module, mutations]) => {
      modulesCopy[module] = { ...modulesCopy[module], mutations };
    });
  }

  return new Vuex.Store({
    state: {},
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
