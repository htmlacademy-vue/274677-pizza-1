<template>
  <main class="content">
    <router-view />
    <form
      action="#"
      method="post"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :dough="pizza.dough"
          @radioChange="radioChange"
        />

        <BuilderSizeSelector
          :sizes="pizza.sizes"
          @radioChange="radioChange"
        />

        <BuilderIngredientsSelector
          :sauces="pizza.sauces"
          :ingredients="pizza.ingredients"
          @radioChange="radioChange"
          @ingredientChange="ingredientChange"
        />

        <div class="content__pizza">
          <BuilderPizzaView
            :selected-items="selectedItems"
            @nameChange="nameChange"
            @drop="ingredientChange"
          />

          <BuilderPriceCounter
            :price="pizzaPrice"
            :is-button-disabled="
              !pizza.name || !selectedItems.ingredients.length
            "
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

import { MAX_SAME_INGREDIENT_COUNT } from "@/common/constants";
import { getPizzaData, getSelectedPizzaItem } from "@/common/helpers";

import pizza from "@/static/pizza.json";

export default {
  name: "Index",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      pizza: getPizzaData(pizza),
    };
  },

  computed: {
    selectedItems() {
      return {
        dough: getSelectedPizzaItem(this.pizza, "dough"),
        size: getSelectedPizzaItem(this.pizza, "sizes"),
        sauce: getSelectedPizzaItem(this.pizza, "sauces"),
        ingredients: this.pizza.ingredients.filter((item) => item.count),
      };
    },

    pizzaPrice() {
      const doughPrice = this.selectedItems.dough.price;
      const saucePrice = this.selectedItems.sauce.price;
      const inredientsPrice = this.selectedItems.ingredients.reduce(
        (acc, curr) => {
          const { count, price } = curr;
          return acc + count * price;
        },
        0
      );
      const multiplier = this.selectedItems.size.multiplier;

      return (doughPrice + saucePrice + inredientsPrice) * multiplier;
    },
  },

  methods: {
    radioChange(type, value) {
      this.pizza[type] = this.pizza[type].map((item) => ({
        ...item,
        checked: item.value === value,
      }));
    },

    ingredientChange(ingredient, countType = "increase") {
      if (!ingredient) {
        return;
      }

      const typeValues = {
        checkValue: countType === "increase" ? MAX_SAME_INGREDIENT_COUNT : 0,
        newCount:
          countType === "increase"
            ? ingredient.count + 1
            : ingredient.count - 1,
      };

      if (ingredient.count === typeValues.checkValue) {
        return;
      }

      const updatedIngredient = {
        ...ingredient,
        count: typeValues.newCount,
      };

      this.pizza.ingredients = this.pizza.ingredients.map((item) => {
        return item.value === updatedIngredient.value
          ? updatedIngredient
          : item;
      });
    },

    nameChange(name) {
      this.pizza.name = name;
    },
  },
};
</script>
