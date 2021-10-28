<template>
  <div class="content__ingredients">
    <div class="sheet">
      <AppTitle
        tag="h2"
        class="title--small sheet__title"
      >Выберите ингредиенты</AppTitle>

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
import AppTitle from "@/common/components/AppTitle";
import { MAX_SAME_INGREDIENT_COUNT } from "@/common/constants";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    AppRadioButton,
    AppItemCounter,
    AppDrag,
    AppTitle,
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

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";
@import "~@/assets/scss/mixins/m_clear-list.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.radio {
  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}
</style>
