import { hasIn, set } from "lodash";
import {
  // PIZZA_VALUES_BY_NAME,
  RESOURCES,
  DOUGH_PRODUCT_TEXT,
} from "./constants";
import {
  CrudApiService,
  AuthApiService,
  BuilderApiService,
  MiscApiService,
} from "@/services/api";

export const getSelectedPizzaItem = (pizzaItem) =>
  pizzaItem && pizzaItem.find((item) => item.checked);

export const createUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const createResources = (notifier) => {
  return {
    [RESOURCES.ADDRESSES]: new CrudApiService(notifier, RESOURCES.ADDRESSES),
    [RESOURCES.MISC]: new MiscApiService(notifier, RESOURCES.MISC),
    [RESOURCES.ORDERS]: new CrudApiService(notifier, RESOURCES.ORDERS),
    [RESOURCES.AUTH]: new AuthApiService(notifier),
    [RESOURCES.BUILDER]: new BuilderApiService(notifier, [
      RESOURCES.INGREDIENTS,
      RESOURCES.DOUGH,
      RESOURCES.SAUCES,
      RESOURCES.SIZES,
    ]),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const getProductText = ({ size, dough, sauce, ingredients }) => {
  return {
    size: size.name,
    dough: DOUGH_PRODUCT_TEXT[dough.value],
    sauce: sauce.name.toLowerCase(),
    ingredients: ingredients.reduce((acc, curr) => {
      return acc + `${acc ? ", " : ""}` + curr.name.toLowerCase();
    }, ""),
  };
};

export const getPriceText = (quantity, price) =>
  quantity > 1 ? `${quantity}x${price}` : `${price}`;

export const setState = (state, { path, value }) => {
  if (hasIn(state, path)) {
    set(state, path, value);
  }
};
