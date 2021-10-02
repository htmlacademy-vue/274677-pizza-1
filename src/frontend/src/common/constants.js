export const PIZZA_VALUES_BY_NAME = {
  dough: {
    Тонкое: "light",
    Толстое: "large",
  },
  ingredients: {
    Грибы: "mushrooms",
    Чеддер: "cheddar",
    Салями: "salami",
    Ветчина: "ham",
    Ананас: "ananas",
    Бекон: "bacon",
    Лук: "onion",
    Чили: "chile",
    Халапеньо: "jalapeno",
    Маслины: "olives",
    Томаты: "tomatoes",
    Лосось: "salmon",
    Моцарелла: "mozzarella",
    Пармезан: "parmesan",
    "Блю чиз": "blue_cheese",
  },
  sauces: {
    Томатный: "tomato",
    Сливочный: "creamy",
  },
  sizes: {
    "23 см": "small",
    "32 см": "normal",
    "45 см": "large",
  },
};

export const DOUGH_PRODUCT_TEXT = {
  light: "на тонком тесте",
  large: "на толстом тесте",
};

export const COUNT_TO_WORD = {
  2: "second",
  3: "third",
};

export const MAX_SAME_INGREDIENT_COUNT = 3;
export const DATA_TRANSFER_PAYLOAD = "payload";
export const MOVE = "move";
export const BASE_FILLING_CLASS = "pizza__filling--";

export const SEC = 1000;
export const MESSAGE_LIVE_TIME = 3 * SEC;

export const NOTIFICATION_TYPES = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

export const RESOURCES = {
  ADDRESSES: "addresses",
  DOUGH: "dough",
  INGREDIENTS: "ingredients",
  MISC: "misc",
  ORDERS: "orders",
  SAUCES: "sauces",
  SIZES: "sizes",
  AUTH: "auth",
  BUILDER: "builder",
};

/* eslint-disable */
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
/* eslint-enable */

export const RECIVE_ORDER_TYPES = {
  TAKE_AWAY: "-1",
  NEW_ADDRESS: "-2",
};

export const ADDRESS_FORM_MODE = {
  NEW: "new",
  EDIT: "edit",
  EMPTY: null,
};
