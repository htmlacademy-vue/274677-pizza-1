import {
  createUUIDv4,
  getCheckedItem,
  getProductText,
  getPriceText,
} from "../helpers";
import { DOUGH_PRODUCT_TEXT } from "@/common/constants";

describe("test helpers functions", () => {
  it("getCheckedItem returns checked item", () => {
    const items = [{ checked: false }, { checked: true }];
    const item = getCheckedItem(items);
    expect(item).toBe(items[1]);
  });

  it("getCheckedItem returns null if arg is empty array", () => {
    const items = [];
    const item = getCheckedItem(items);
    expect(item).toBeNull;
  });

  it("getCheckedItem returns null if no args passed", () => {
    const item = getCheckedItem();
    expect(item).toBeNull;
  });

  it("getCheckedItem returns null if arg is not array", () => {
    const items = "string";
    const item = getCheckedItem(items);
    expect(item).toBeNull;
  });

  it("test createUUIDv4", () => {
    const uuid = createUUIDv4();
    expect(uuid.length).toBe(36);
  });

  it("test getProductText", () => {
    const size = { name: "test size" };
    const dough = { value: "light" };
    const sauce = { name: "test sauce" };
    const ingredients = [
      { name: "test ingredient" },
      { name: "test ingredient 2" },
    ];
    const productText = getProductText({ size, dough, sauce, ingredients });

    const expectedResult = {
      size: size.name,
      dough: DOUGH_PRODUCT_TEXT[dough.value],
      sauce: sauce.name.toLowerCase(),
      ingredients: "test ingredient, test ingredient 2",
    };

    expect(productText).toStrictEqual(expectedResult);
  });

  it("test getPriceText", () => {
    let quantity = 1;
    let price = 1000;
    let priceText = getPriceText(quantity, price);

    expect(priceText).toBe("1000");

    quantity = 3;
    price = 4200;
    priceText = getPriceText(quantity, price);
    expect(priceText).toBe("3x4200");
  });
});
