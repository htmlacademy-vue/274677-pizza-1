import { NOTIFICATION_TYPES } from "@/common/constants";

export default class Notifier {
  #store;
  constructor(store) {
    this.#store = store;
  }

  info(text) {
    this.#store.dispatch("Notifications/createNotification", {
      text,
      type: NOTIFICATION_TYPES.INFO,
    });
  }

  success(text) {
    this.#store.dispatch("Notifications/createNotification", {
      text,
      type: NOTIFICATION_TYPES.SUCCESS,
    });
  }

  error(text) {
    this.#store.dispatch("Notifications/createNotification", {
      text,
      type: NOTIFICATION_TYPES.ERROR,
    });
  }

  warning(text) {
    this.#store.dispatch("Notifications/createNotification", {
      text,
      type: NOTIFICATION_TYPES.WARNING,
    });
  }
}
