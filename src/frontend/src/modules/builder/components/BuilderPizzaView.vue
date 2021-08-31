<template>
  <div>
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        required
        :value="name"
        @input="changeName($event.target.value)"
      />
    </label>

    <AppDrop @drop="drop">
      <div class="content__constructor">
        <div
          class="pizza"
          :class="`pizza--foundation--${
            selectedItems.dough.value === 'light' ? 'small' : 'big'
          }-${selectedItems.sauce.value}`"
        >
          <div class="pizza__wrapper">
            <div
              v-for="item in ingredientsFilling"
              :key="item.id"
              class="pizza__filling"
              :class="item.class"
            >
            </div>
          </div>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import {
  CHANGE_PIZZA_NAME,
  CHANGE_PIZZA_INGREDIENT,
} from "@/store/mutation-types";

import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  computed: {
    ...mapState("Builder", ["name"]),
    ...mapGetters("Builder", ["selectedItems", "ingredientsFilling"]),
  },

  methods: {
    ...mapMutations("Builder", {
      changeName: CHANGE_PIZZA_NAME,
      changeIngredient: CHANGE_PIZZA_INGREDIENT,
    }),

    drop(ingredient) {
      this.changeIngredient({ ingredient, countType: "increase" });
    },
  },
};
</script>
