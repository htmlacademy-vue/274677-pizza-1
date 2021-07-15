<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>
          <label
            v-for="(sauce, index) in sauces"
            :key="index"
            class="radio ingridients__input"
          >
            <AppRadioButton
              name="sauce"
              :value="sauce.value"
              :checked="sauce.checked"
              @change="$emit('radioChange', 'sauces', $event.target.value)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="ingridients__item"
            >
              <AppDrag
                :transferData="ingredient"
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

  props: {
    sauces: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      MAX_SAME_INGREDIENT_COUNT,
    };
  },

  methods: {
    countChange(data, type) {
      this.$emit("ingredientChange", data, type);
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
