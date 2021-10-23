<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(sauce, index) in sauces"
            :key="index"
            class="radio ingredients__input"
          >
            <AppRadioButton
              name="sauce"
              :value="sauce.value"
              :checked="sauce.checked"
              @change="radioChange"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="ingredients__item"
            >
              <AppDrag
                :transfer-data="ingredient"
                :is-draggable="ingredient.count < MAX_SAME_INGREDIENT_COUNT"
              >
                <span
                  class="filling"
                  :class="`filling--${ingredient.value}`"
                >
                  {{ ingredient.name }}
                </span>
              </AppDrag>
              <AppItemCounter
                disabled
                root-class="ingredients__counter"
                :count="ingredient.count"
                :additional-emit-data="ingredient"
                :buttons="getButtonsProps(ingredient.count)"
                @countChange="countChange"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  CHANGE_PIZZA_INGREDIENT,
  CHANGE_PIZZA_TYPE,
} from "@/store/mutation-types";

import AppRadioButton from "@/common/components/AppRadioButton";
import AppItemCounter from "@/common/components/AppItemCounter";
import AppDrag from "@/common/components/AppDrag";
import { MAX_SAME_INGREDIENT_COUNT } from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    AppRadioButton,
    AppItemCounter,
    AppDrag,
  },

  data() {
    return {
      MAX_SAME_INGREDIENT_COUNT,
    };
  },

  computed: mapState("Builder", ["sauces", "ingredients"]),

  methods: {
    ...mapMutations("Builder", {
      changeIngredient: CHANGE_PIZZA_INGREDIENT,
      changeType: CHANGE_PIZZA_TYPE,
    }),

    radioChange(value) {
      this.changeType({ type: "sauces", value });
    },

    countChange(ingredient, countType) {
      this.changeIngredient({ ingredient, countType });
    },

    getButtonsProps(count) {
      return {
        increase: {
          disabled: count >= MAX_SAME_INGREDIENT_COUNT,
        },
        decrease: {
          disabled: count <= 0,
        },
      };
    },
  },
};
</script>
