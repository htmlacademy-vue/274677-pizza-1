import { PIZZA_VALUES_BY_NAME } from "./constants";

export const getPizzaData = (pizza) => ({
  dough: (pizza.dough || []).map((dough, index) => ({
    ...dough,
    value: PIZZA_VALUES_BY_NAME.dough[dough.name],
    checked: !index,
  })),
  sizes: (pizza.sizes || []).map((size, index) => ({
    ...size,
    value: PIZZA_VALUES_BY_NAME.sizes[size.name],
    checked: index === 1,
  })),
  sauces: (pizza.sauces || []).map((sauce, index) => ({
    ...sauce,
    value: PIZZA_VALUES_BY_NAME.sauces[sauce.name],
    checked: !index,
  })),
  ingredients: (pizza.ingredients || []).map((ingridient) => ({
    ...ingridient,
    value: PIZZA_VALUES_BY_NAME.ingredients[ingridient.name],
    count: 0,
  })),
  name: "",
});

export const getSelectedPizzaItem = (pizzaItem) =>
  pizzaItem && pizzaItem.find((item) => item.checked);

export const createUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
