import {
  OPEN_POPUP,
  CLOSE_POPUP,
  REGISTER_POPUP,
} from "@/store/mutation-types";

export default class Popup {
  #store;
  constructor(store) {
    this.#store = store;
  }

  open(name) {
    this.#store.commit(`Popups/${OPEN_POPUP}`, name);
  }

  close(name) {
    this.#store.commit(`Popups/${CLOSE_POPUP}`, name);
  }

  register(name) {
    this.#store.commit(`Popups/${REGISTER_POPUP}`, {
      name,
    });
  }
}
